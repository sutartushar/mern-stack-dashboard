"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { StudentLayout } from "@/components/student-layout"
import { StudentProfile } from "@/components/student-profile"

export default function StudentDashboard() {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Track your progress and manage your profile</p>
          </div>
          <StudentProfile />
        </div>
      </StudentLayout>
    </ProtectedRoute>
  )
}
