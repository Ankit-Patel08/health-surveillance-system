"use client"

import { useState, useMemo, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Droplets,
  AlertTriangle,
  Activity,
  MapPin,
  Calendar,
  Edit,
  TestTube,
  Heart,
  Loader2,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const DataManagementForm = lazy(() =>
  import("@/components/data-management-form").then((m) => ({ default: m.DataManagementForm })),
)
const NotificationPanel = lazy(() =>
  import("@/components/notification-panel").then((m) => ({ default: m.NotificationPanel })),
)
const VillageAnalytics = lazy(() =>
  import("@/components/village-analytics").then((m) => ({ default: m.VillageAnalytics })),
)

interface Village {
  id: string
  name: string
  population: number
  waterQuality: string
  riskLevel: string
  lastUpdated: string
  ashaWorker: string
  coordinates: { lat: number; lng: number }
  waterSources: string[]
  diseases: {
    diarrhea: number
    cholera: number
    typhoid: number
    hepatitis: number
  }
  waterTests: {
    ph: number
    turbidity: number
    coliform: number
    chlorine: number
  }
}

interface VillageDetailProps {
  village: Village
  onBack: () => void
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
  </div>
)

export function VillageDetail({ village, onBack }: VillageDetailProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const canEdit = user?.role === "admin" || (user?.role === "asha" && user.villageId === village.id)

  const { riskColor, waterQualityScore, totalDiseases } = useMemo(() => {
    const getRiskColor = (risk: string) => {
      switch (risk.toLowerCase()) {
        case "low":
          return "bg-green-100 text-green-800 border-green-200"
        case "medium":
          return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "high":
          return "bg-red-100 text-red-800 border-red-200"
        default:
          return "bg-gray-100 text-gray-800 border-gray-200"
      }
    }

    const getWaterQualityScore = (quality: string) => {
      switch (quality.toLowerCase()) {
        case "good":
          return 85
        case "fair":
          return 60
        case "poor":
          return 30
        default:
          return 0
      }
    }

    return {
      riskColor: getRiskColor(village.riskLevel),
      waterQualityScore: getWaterQualityScore(village.waterQuality),
      totalDiseases: Object.values(village.diseases).reduce((sum, count) => sum + count, 0),
    }
  }, [village.riskLevel, village.waterQuality, village.diseases])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{village.name} Village</h1>
                  <p className="text-sm text-gray-500">Population: {village.population.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className={riskColor}>{village.riskLevel} Risk</Badge>
              {canEdit && (
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Data
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Quality</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{village.waterQuality}</div>
              <Progress value={waterQualityScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{totalDiseases}</div>
              <p className="text-xs text-muted-foreground">Water-borne diseases</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Sources</CardTitle>
              <TestTube className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{village.waterSources.length}</div>
              <p className="text-xs text-muted-foreground">{village.waterSources.join(", ")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{new Date(village.lastUpdated).toLocaleDateString()}</div>
              <p className="text-xs text-muted-foreground">By {village.ashaWorker}</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="water">Water Quality</TabsTrigger>
            <TabsTrigger value="health">Health Data</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            {canEdit && <TabsTrigger value="manage">Manage</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Village Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Village Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Population</p>
                      <p className="text-lg font-semibold">{village.population.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Risk Level</p>
                      <Badge className={riskColor}>{village.riskLevel}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Coordinates</p>
                      <p className="text-sm">
                        {village.coordinates.lat.toFixed(4)}, {village.coordinates.lng.toFixed(4)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">ASHA Worker</p>
                      <p className="text-sm font-semibold">{village.ashaWorker}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disease Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Disease Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(village.diseases).map(([disease, count]) => (
                      <div key={disease} className="flex justify-between items-center">
                        <span className="capitalize text-sm font-medium">{disease}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${count > 0 ? "text-red-600" : "text-green-600"}`}>
                            {count} cases
                          </span>
                          {count > 0 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="water" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Water Test Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    Latest Water Test Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">pH Level</span>
                        <span className="text-sm font-bold">{village.waterTests.ph}</span>
                      </div>
                      <Progress value={(village.waterTests.ph / 14) * 100} />
                      <p className="text-xs text-muted-foreground">Normal: 6.5-8.5</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Turbidity (NTU)</span>
                        <span className="text-sm font-bold">{village.waterTests.turbidity}</span>
                      </div>
                      <Progress value={Math.min((village.waterTests.turbidity / 10) * 100, 100)} />
                      <p className="text-xs text-muted-foreground">Safe: &lt;1 NTU</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Coliform (CFU/100ml)</span>
                        <span
                          className={`text-sm font-bold ${village.waterTests.coliform > 0 ? "text-red-600" : "text-green-600"}`}
                        >
                          {village.waterTests.coliform}
                        </span>
                      </div>
                      <Progress value={Math.min((village.waterTests.coliform / 10) * 100, 100)} />
                      <p className="text-xs text-muted-foreground">Safe: 0 CFU/100ml</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Chlorine (mg/L)</span>
                        <span className="text-sm font-bold">{village.waterTests.chlorine}</span>
                      </div>
                      <Progress value={(village.waterTests.chlorine / 2) * 100} />
                      <p className="text-xs text-muted-foreground">Recommended: 0.2-1.0 mg/L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Water Sources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    Water Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {village.waterSources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="font-medium">{source}</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health Monitoring Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(village.diseases).map(([disease, count]) => (
                    <div key={disease} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium capitalize">{disease}</h4>
                        {count > 0 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      </div>
                      <div className="text-2xl font-bold mb-1">{count}</div>
                      <div className="text-sm text-muted-foreground">Active cases</div>
                      <div className="mt-2">
                        <div
                          className={`text-xs px-2 py-1 rounded ${count === 0 ? "bg-green-100 text-green-800" : count < 3 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}
                        >
                          {count === 0 ? "No cases" : count < 3 ? "Low concern" : "High concern"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Suspense fallback={<LoadingSpinner />}>
              <VillageAnalytics village={village} />
            </Suspense>
          </TabsContent>

          {canEdit && (
            <TabsContent value="manage" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Suspense fallback={<LoadingSpinner />}>
                  <DataManagementForm village={village} />
                </Suspense>
                <Suspense fallback={<LoadingSpinner />}>
                  <NotificationPanel village={village} />
                </Suspense>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  )
}
