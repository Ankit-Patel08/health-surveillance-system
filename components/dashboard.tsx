"use client"

import { useState, useMemo, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import { VillageCard } from "@/components/village-card"
import { VillageDetail } from "@/components/village-detail"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LogOut, Shield, Users, MapPin, Settings } from "lucide-react"
import Link from "next/link"

export const mockVillages = [
  {
    id: "village-1",
    name: "Rampur",
    population: 2500,
    waterQuality: "Good",
    riskLevel: "Low",
    lastUpdated: "2024-01-15",
    ashaWorker: "Priya Sharma",
    coordinates: { lat: 28.6139, lng: 77.209 },
    waterSources: ["Borewell", "Hand Pump"],
    diseases: { diarrhea: 2, cholera: 0, typhoid: 1, hepatitis: 0 },
    waterTests: { ph: 7.2, turbidity: 1.5, coliform: 0, chlorine: 0.5 },
  },
  {
    id: "village-2",
    name: "Krishnanagar",
    population: 1800,
    waterQuality: "Fair",
    riskLevel: "Medium",
    lastUpdated: "2024-01-14",
    ashaWorker: "Sunita Devi",
    coordinates: { lat: 28.7041, lng: 77.1025 },
    waterSources: ["Well", "Pond"],
    diseases: { diarrhea: 5, cholera: 1, typhoid: 2, hepatitis: 0 },
    waterTests: { ph: 6.8, turbidity: 3.2, coliform: 2, chlorine: 0.2 },
  },
  {
    id: "village-3",
    name: "Govindpur",
    population: 3200,
    waterQuality: "Poor",
    riskLevel: "High",
    lastUpdated: "2024-01-13",
    ashaWorker: "Meera Patel",
    coordinates: { lat: 28.5355, lng: 77.391 },
    waterSources: ["River", "Hand Pump"],
    diseases: { diarrhea: 8, cholera: 2, typhoid: 3, hepatitis: 1 },
    waterTests: { ph: 6.2, turbidity: 5.8, coliform: 8, chlorine: 0.1 },
  },
]

export function Dashboard() {
  const { user, logout } = useAuth()
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null)

  const accessibleVillages = useMemo(() => {
    if (user?.role === "admin") {
      return mockVillages
    } else if (user?.role === "asha" && user.villageId) {
      return mockVillages.filter((v) => v.id === user.villageId)
    } else {
      return mockVillages
    }
  }, [user?.role, user?.villageId])

  const stats = useMemo(
    () => ({
      totalPopulation: accessibleVillages.reduce((sum, v) => sum + v.population, 0),
      highRiskCount: accessibleVillages.filter((v) => v.riskLevel === "High").length,
    }),
    [accessibleVillages],
  )

  const handleVillageSelect = useCallback((villageId: string) => {
    setSelectedVillage(villageId)
  }, [])

  const handleBackToDashboard = useCallback(() => {
    setSelectedVillage(null)
  }, [])

  if (selectedVillage) {
    const village = mockVillages.find((v) => v.id === selectedVillage)
    if (village) {
      return <VillageDetail village={village} onBack={handleBackToDashboard} />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "asha":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Health Surveillance Dashboard</h1>
                <p className="text-sm text-gray-500">Water-borne Disease Monitoring</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user?.role === "admin" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              )}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <Badge className={getRoleBadgeColor(user?.role || "")}>{user?.role?.toUpperCase()}</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Villages</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accessibleVillages.length}</div>
              <p className="text-xs text-muted-foreground">Under monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Population</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPopulation.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">People protected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk Villages</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.highRiskCount}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Villages Grid */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Villages Overview</h2>
            {user?.role === "asha" && (
              <Badge variant="outline" className="text-blue-600">
                Your assigned village: {user.villageName}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessibleVillages.map((village) => (
              <VillageCard
                key={village.id}
                village={village}
                onViewDetails={() => handleVillageSelect(village.id)}
                userRole={user?.role || "viewer"}
                canAccess={user?.role === "admin" || (user?.role === "asha" && user.villageId === village.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
