"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Mail,
  BookOpen,
  Calendar,
  Edit,
  Save,
  X,
  Trophy,
  Clock,
  CheckCircle,
  Target,
  TrendingUp,
} from "lucide-react"

export function StudentProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    course: user?.course || "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const courses = ["MERN Bootcamp", "React Fundamentals", "Node.js Advanced", "Full Stack Development"]

  // Mock course progress data
  const courseProgress = {
    totalModules: 12,
    completedModules: 8,
    currentModule: "Authentication & Authorization",
    nextModule: "Database Integration",
    progressPercentage: 67,
    hoursSpent: 45,
    estimatedCompletion: "2 weeks",
  }

  const achievements = [
    { id: 1, title: "First Login", description: "Completed your first login", earned: true },
    { id: 2, title: "Profile Complete", description: "Filled out your complete profile", earned: true },
    { id: 3, title: "Module Master", description: "Completed 5 modules", earned: true },
    { id: 4, title: "Halfway Hero", description: "Reached 50% course completion", earned: true },
    { id: 5, title: "Assignment Ace", description: "Submitted 10 assignments", earned: false },
    { id: 6, title: "Course Conqueror", description: "Complete the entire course", earned: false },
  ]

  const recentActivity = [
    { id: 1, action: "Completed Module 8: React Hooks", date: "2024-03-15", type: "completion" },
    { id: 2, action: "Submitted Assignment: Todo App", date: "2024-03-14", type: "submission" },
    { id: 3, action: "Started Module 9: Authentication", date: "2024-03-13", type: "start" },
    { id: 4, action: "Earned Achievement: Module Master", date: "2024-03-12", type: "achievement" },
  ]

  const handleSave = () => {
    setError("")
    setSuccess("")

    if (!formData.name || !formData.email || !formData.course) {
      setError("Please fill in all fields")
      return
    }

    // Here you would typically make an API call to update the user profile
    setSuccess("Profile updated successfully!")
    setIsEditing(false)

    // Reset success message after 3 seconds
    setTimeout(() => setSuccess(""), 3000)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      course: user?.course || "",
    })
    setIsEditing(false)
    setError("")
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseProgress.progressPercentage}%</div>
            <Progress value={courseProgress.progressPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Modules Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courseProgress.completedModules}/{courseProgress.totalModules}
            </div>
            <p className="text-xs text-muted-foreground">modules finished</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseProgress.hoursSpent}h</div>
            <p className="text-xs text-muted-foreground">learning time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.filter((a) => a.earned).length}</div>
            <p className="text-xs text-muted-foreground">badges earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="progress">Course Progress</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Manage your account details and preferences</CardDescription>
                </div>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{user?.name}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user?.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Current Course</Label>
                  {isEditing ? (
                    <Select
                      value={formData.course}
                      onValueChange={(value) => setFormData({ ...formData, course: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{user?.course}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Enrollment Date</Label>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-md">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{user?.enrollmentDate ? new Date(user.enrollmentDate).toLocaleDateString() : "N/A"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Track your learning journey and upcoming milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Overall Progress</h3>
                  <Badge variant="secondary">{courseProgress.progressPercentage}% Complete</Badge>
                </div>
                <Progress value={courseProgress.progressPercentage} className="h-3" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Completed Modules</p>
                    <p className="font-semibold">
                      {courseProgress.completedModules} of {courseProgress.totalModules}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Module</p>
                    <p className="font-semibold">{courseProgress.currentModule}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Estimated Completion</p>
                    <p className="font-semibold">{courseProgress.estimatedCompletion}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Next Up</h3>
                <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">{courseProgress.nextModule}</h4>
                    <p className="text-sm text-muted-foreground">Continue your learning journey</p>
                  </div>
                  <Button className="ml-auto">Continue Learning</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Your learning milestones and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border",
                      achievement.earned ? "bg-primary/5 border-primary/20" : "bg-muted/50 border-muted",
                    )}
                  >
                    <div
                      className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                        achievement.earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className={cn("font-medium", !achievement.earned && "text-muted-foreground")}>
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                    {achievement.earned && <Badge variant="secondary">Earned</Badge>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning activities and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          activity.type === "completion" && "bg-green-100 text-green-600",
                          activity.type === "submission" && "bg-blue-100 text-blue-600",
                          activity.type === "start" && "bg-yellow-100 text-yellow-600",
                          activity.type === "achievement" && "bg-purple-100 text-purple-600",
                        )}
                      >
                        {activity.type === "completion" && <CheckCircle className="h-4 w-4" />}
                        {activity.type === "submission" && <TrendingUp className="h-4 w-4" />}
                        {activity.type === "start" && <BookOpen className="h-4 w-4" />}
                        {activity.type === "achievement" && <Trophy className="h-4 w-4" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{new Date(activity.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
