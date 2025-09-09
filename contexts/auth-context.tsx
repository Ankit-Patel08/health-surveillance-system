"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type UserRole = "admin" | "asha" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  villageId?: string // Only for ASHA workers
  villageName?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    email: "admin@health.gov.in",
    role: "admin",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.asha@village1.in",
    role: "asha",
    villageId: "village-1",
    villageName: "Rampur",
  },
  {
    id: "3",
    name: "Sunita Devi",
    email: "sunita.asha@village2.in",
    role: "asha",
    villageId: "village-2",
    villageName: "Krishnanagar",
  },
  {
    id: "4",
    name: "Visitor User",
    email: "visitor@example.com",
    role: "viewer",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("health-surveillance-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find((u) => u.email === email)

    if (foundUser && password === "password123") {
      setUser(foundUser)
      localStorage.setItem("health-surveillance-user", JSON.stringify(foundUser))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("health-surveillance-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
