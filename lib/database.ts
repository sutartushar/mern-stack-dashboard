export interface User {
  id: string
  name: string
  email: string
  password: string
  role: "admin" | "student"
  createdAt: string
  updatedAt: string
}

export interface Student {
  id: string
  userId: string
  name: string
  email: string
  course: string
  enrollmentDate: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

// Mock database - In a real app, this would be MongoDB with Mongoose
class MockDatabase {
  private users: User[] = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      password: "$2b$10$rOvHdKzjbQIqBqTXCmVxWOYpVzQzSlYwQpNiU8PjdU8YvTxvUvYyC", // admin123
      role: "admin",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "John Doe",
      email: "student@example.com",
      password: "$2b$10$rOvHdKzjbQIqBqTXCmVxWOYpVzQzSlYwQpNiU8PjdU8YvTxvUvYyC", // student123
      role: "student",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  private students: Student[] = [
    {
      id: "1",
      userId: "2",
      name: "John Doe",
      email: "student@example.com",
      course: "MERN Bootcamp",
      enrollmentDate: "2024-01-15",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      userId: "3",
      name: "Jane Smith",
      email: "jane@example.com",
      course: "React Fundamentals",
      enrollmentDate: "2024-02-01",
      status: "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      userId: "4",
      name: "Mike Johnson",
      email: "mike@example.com",
      course: "Full Stack Development",
      enrollmentDate: "2024-01-20",
      status: "inactive",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  // User operations
  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async createUser(userData: Omit<User, "id" | "createdAt" | "updatedAt">): Promise<User> {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.users.push(newUser)
    return newUser
  }

  // Student operations
  async getAllStudents(): Promise<Student[]> {
    return this.students
  }

  async getStudentById(id: string): Promise<Student | null> {
    return this.students.find((student) => student.id === id) || null
  }

  async getStudentByUserId(userId: string): Promise<Student | null> {
    return this.students.find((student) => student.userId === userId) || null
  }

  async createStudent(studentData: Omit<Student, "id" | "createdAt" | "updatedAt">): Promise<Student> {
    const newStudent: Student = {
      ...studentData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.students.push(newStudent)
    return newStudent
  }

  async updateStudent(id: string, updates: Partial<Omit<Student, "id" | "createdAt">>): Promise<Student | null> {
    const index = this.students.findIndex((student) => student.id === id)
    if (index === -1) return null

    this.students[index] = {
      ...this.students[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    return this.students[index]
  }

  async deleteStudent(id: string): Promise<boolean> {
    const index = this.students.findIndex((student) => student.id === id)
    if (index === -1) return false

    this.students.splice(index, 1)
    return true
  }
}

export const db = new MockDatabase()
