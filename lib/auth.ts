"use client"

import { createContext, useContext } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "student"
  course?: string
  enrollmentDate?: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: "admin" | "student", course?: string) => Promise<void>
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Mock API functions - replace with actual backend calls
export const authAPI = {
  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock admin user
    if (email === "admin@example.com" && password === "admin123") {
      return {
        id: "1",
        email: "admin@example.com",
        name: "Admin User",
        role: "admin",
      }
    }

    // Mock student user
    if (email === "student@example.com" && password === "student123") {
      return {
        id: "2",
        email: "student@example.com",
        name: "John Doe",
        role: "student",
        course: "MERN Bootcamp",
        enrollmentDate: "2024-01-15",
      }
    }

    throw new Error("Invalid credentials")
  },

  async signup(
    email: string,
    password: string,
    name: string,
    role: "admin" | "student",
    course?: string,
  ): Promise<User> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      course: role === "student" ? course : undefined,
      enrollmentDate: role === "student" ? new Date().toISOString().split("T")[0] : undefined,
    }
  },
}
