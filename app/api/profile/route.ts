import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { verifyToken, getTokenFromRequest } from "@/lib/jwt"

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // Get user profile
    const user = await db.findUserById(payload.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

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
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { name, email, course } = await request.json()

    // Update user profile (simplified for demo)
    // In a real app, you would update the database

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: payload.userId,
        name,
        email,
        role: payload.role,
        course,
      },
    })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
