"use client"

import { useState, useEffect, type ReactNode } from "react"
import { AuthContext, type User, authAPI } from "@/lib/auth"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const userData = await authAPI.login(email, password)
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, role: "admin" | "student", course?: string) => {
    setLoading(true)
    try {
      const userData = await authAPI.signup(email, password, name, role, course)
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading }}>{children}</AuthContext.Provider>
}
