import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { signToken } from "@/lib/jwt"
import { hashPassword } from "@/lib/password"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, course } = await request.json()

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (role === "student" && !course) {
      return NextResponse.json({ error: "Course is required for students" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const newUser = await db.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    })

    // Create student record if role is student
    let studentData = null
    if (role === "student") {
      studentData = await db.createStudent({
        userId: newUser.id,
        name,
        email,
        course,
        enrollmentDate: new Date().toISOString().split("T")[0],
        status: "active",
      })
    }

    // Generate JWT token
    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    })

    return NextResponse.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        course: studentData?.course,
        enrollmentDate: studentData?.enrollmentDate,
      },
      token,
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
