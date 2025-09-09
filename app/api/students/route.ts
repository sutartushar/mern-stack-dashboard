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

    // Check if user is admin
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    // Get all students
    const students = await db.getAllStudents()
    return NextResponse.json({ students })
  } catch (error) {
    console.error("Get students error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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

    // Check if user is admin
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const { name, email, course, status } = await request.json()

    if (!name || !email || !course) {
      return NextResponse.json({ error: "Name, email, and course are required" }, { status: 400 })
    }

    // Create student
    const newStudent = await db.createStudent({
      userId: Math.random().toString(36).substr(2, 9), // Generate user ID
      name,
      email,
      course,
      enrollmentDate: new Date().toISOString().split("T")[0],
      status: status || "active",
    })

    return NextResponse.json({ student: newStudent })
  } catch (error) {
    console.error("Create student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
