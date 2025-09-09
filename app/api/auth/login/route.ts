import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { signToken } from "@/lib/jwt"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = await db.findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // For demo purposes, use simple password check
    // In production, use proper password hashing
    const isValidPassword =
      (email === "admin@example.com" && password === "admin123") ||
      (email === "student@example.com" && password === "student123")

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Get student data if user is a student
    let studentData = null
    if (user.role === "student") {
      studentData = await db.getStudentByUserId(user.id)
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        course: studentData?.course,
        enrollmentDate: studentData?.enrollmentDate,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
