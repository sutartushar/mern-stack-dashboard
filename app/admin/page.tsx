"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { AdminLayout } from "@/components/admin-layout"
import { StudentManagement } from "@/components/student-management"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage students and oversee the platform</p>
          </div>
          <StudentManagement />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
