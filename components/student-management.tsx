"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Users, BookOpen } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Student {
  id: string
  name: string
  email: string
  course: string
  enrollmentDate: string
  status: "active" | "inactive"
}

export function StudentManagement() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      course: "MERN Bootcamp",
      enrollmentDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      course: "React Fundamentals",
      enrollmentDate: "2024-02-01",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      course: "Full Stack Development",
      enrollmentDate: "2024-01-20",
      status: "inactive",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: "",
    status: "active" as "active" | "inactive",
  })
  const [error, setError] = useState("")

  const courses = ["MERN Bootcamp", "React Fundamentals", "Node.js Advanced", "Full Stack Development"]

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddStudent = () => {
    setError("")

    if (!formData.name || !formData.email || !formData.course) {
      setError("Please fill in all fields")
      return
    }

    const newStudent: Student = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
      course: formData.course,
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: formData.status,
    }

    setStudents([...students, newStudent])
    setFormData({ name: "", email: "", course: "", status: "active" })
    setIsAddDialogOpen(false)
  }

  const handleEditStudent = () => {
    setError("")

    if (!formData.name || !formData.email || !formData.course) {
      setError("Please fill in all fields")
      return
    }

    if (!editingStudent) return

    const updatedStudents = students.map((student) =>
      student.id === editingStudent.id
        ? { ...student, name: formData.name, email: formData.email, course: formData.course, status: formData.status }
        : student,
    )

    setStudents(updatedStudents)
    setFormData({ name: "", email: "", course: "", status: "active" })
    setEditingStudent(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter((student) => student.id !== studentId))
  }

  const openEditDialog = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
      status: student.status,
    })
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", course: "", status: "active" })
    setError("")
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">
              {students.filter((s) => s.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">Available programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                students.filter((s) => {
                  const enrollmentMonth = new Date(s.enrollmentDate).getMonth()
                  const currentMonth = new Date().getMonth()
                  return enrollmentMonth === currentMonth
                }).length
              }
            </div>
            <p className="text-xs text-muted-foreground">New enrollments</p>
          </CardContent>
        </Card>
      </div>

      {/* Student Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>View and manage all student records</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Create a new student record</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="add-name">Full Name</Label>
                    <Input
                      id="add-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter student name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-email">Email</Label>
                    <Input
                      id="add-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-course">Course</Label>
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="add-status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddStudent} className="w-full">
                    Add Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{new Date(student.enrollmentDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(student)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
            <DialogDescription>Update student information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter student name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-course">Course</Label>
              <Select value={formData.course} onValueChange={(value) => setFormData({ ...formData, course: value })}>
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive") => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleEditStudent} className="w-full">
              Update Student
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
