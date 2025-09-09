import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { verifyToken, getTokenFromRequest } from "@/lib/jwt"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
    const studentId = params.id

    // Update student
    const updatedStudent = await db.updateStudent(studentId, {
      name,
      email,
      course,
      status,
    })

    if (!updatedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ student: updatedStudent })
  } catch (error) {
    console.error("Update student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const studentId = params.id

    // Delete student
    const deleted = await db.deleteStudent(studentId)

    if (!deleted) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Student deleted successfully" })
  } catch (error) {
    console.error("Delete student error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
