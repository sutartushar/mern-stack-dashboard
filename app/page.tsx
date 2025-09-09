"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      router.push(user.role === "admin" ? "/admin" : "/student")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Welcome to EduPlatform</h1>
          <p className="text-xl text-muted-foreground text-pretty">
            A modern learning management system with role-based access control
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Student Access</CardTitle>
              <CardDescription>Access your courses, track progress, and manage your learning journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Demo credentials:</p>
                <p>Email: student@example.com</p>
                <p>Password: student123</p>
              </div>
              <Button asChild className="w-full">
                <Link href="/login">Student Login</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-primary">Admin Access</CardTitle>
              <CardDescription>Manage students, courses, and oversee the entire platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>Demo credentials:</p>
                <p>Email: admin@example.com</p>
                <p>Password: admin123</p>
              </div>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/login">Admin Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
