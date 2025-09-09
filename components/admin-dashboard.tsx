"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { mockVillages } from "@/components/dashboard"
import {
  Users,
  MapPin,
  Settings,
  BarChart3,
  AlertTriangle,
  Shield,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  Activity,
  Bell,
  Database,
} from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for admin panel
const systemStats = {
  totalVillages: 15,
  totalPopulation: 45000,
  activeAlerts: 3,
  ashaWorkers: 12,
  totalDiseases: 28,
  systemUptime: "99.8%",
}

const mockUsers = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    email: "admin@health.gov.in",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15",
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya.asha@village1.in",
    role: "asha",
    village: "Rampur",
    status: "active",
    lastLogin: "2024-01-15",
  },
  {
    id: "3",
    name: "Sunita Devi",
    email: "sunita.asha@village2.in",
    role: "asha",
    village: "Krishnanagar",
    status: "active",
    lastLogin: "2024-01-14",
  },
  {
    id: "4",
    name: "Meera Patel",
    email: "meera.asha@village3.in",
    role: "asha",
    village: "Govindpur",
    status: "inactive",
    lastLogin: "2024-01-10",
  },
]

const systemAlerts = [
  {
    id: "1",
    type: "critical",
    title: "High Disease Outbreak Risk",
    description: "Govindpur village showing critical water quality deterioration",
    timestamp: "2024-01-15T10:30:00Z",
    village: "Govindpur",
    status: "active",
  },
  {
    id: "2",
    type: "warning",
    title: "ASHA Worker Inactive",
    description: "Meera Patel hasn't logged in for 5 days",
    timestamp: "2024-01-14T15:20:00Z",
    village: "Govindpur",
    status: "active",
  },
  {
    id: "3",
    type: "info",
    title: "System Maintenance Scheduled",
    description: "Routine maintenance planned for January 20th",
    timestamp: "2024-01-13T09:00:00Z",
    village: "All",
    status: "resolved",
  },
]

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-200 bg-red-50 text-red-800"
      case "warning":
        return "border-yellow-200 bg-yellow-50 text-yellow-800"
      case "info":
        return "border-blue-200 bg-blue-50 text-blue-800"
      default:
        return "border-gray-200 bg-gray-50 text-gray-800"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
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
              <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-red-600" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">System Administration</h1>
                  <p className="text-sm text-gray-500">Health Surveillance Management</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <Badge className="bg-red-100 text-red-800">ADMIN</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Villages</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalVillages}</div>
              <p className="text-xs text-muted-foreground">Under monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Population</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalPopulation.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">People protected</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{systemStats.activeAlerts}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{systemStats.systemUptime}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="villages">Villages</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Recent System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {systemAlerts.slice(0, 3).map((alert) => (
                    <Alert key={alert.id} className={getAlertColor(alert.type)}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {alert.village}
                            </Badge>
                          </div>
                          <p className="text-xs">{alert.description}</p>
                          <p className="text-xs opacity-75">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>

              {/* System Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    System Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Database Performance</span>
                      <span className="text-sm font-bold text-green-600">Excellent</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">API Response Time</span>
                      <span className="text-sm font-bold text-green-600">120ms avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Active Users</span>
                      <span className="text-sm font-bold">8/12 ASHA workers</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Data Sync Status</span>
                      <span className="text-sm font-bold text-green-600">Up to date</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>System Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          {user.village && <p className="text-xs text-blue-600">Assigned to: {user.village}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusBadge(user.status)}>{user.status}</Badge>
                        <Badge variant="outline">{user.role.toUpperCase()}</Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="villages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Village Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Village
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Villages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVillages.map((village) => (
                    <div key={village.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{village.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Population: {village.population.toLocaleString()}
                          </p>
                          <p className="text-xs text-blue-600">ASHA: {village.ashaWorker}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          className={
                            village.riskLevel === "High"
                              ? "bg-red-100 text-red-800"
                              : village.riskLevel === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }
                        >
                          {village.riskLevel} Risk
                        </Badge>
                        <Badge variant="outline">{village.waterQuality}</Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">System Alerts</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Alert Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert) => (
                  <Alert key={alert.id} className={getAlertColor(alert.type)}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{alert.title}</h4>
                            <Badge variant="outline">{alert.village}</Badge>
                            <Badge className={getStatusBadge(alert.status)}>{alert.status}</Badge>
                          </div>
                          <p className="text-sm">{alert.description}</p>
                          <p className="text-xs opacity-75">{new Date(alert.timestamp).toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          {alert.status === "active" && (
                            <Button size="sm" variant="outline">
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">System Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">System Name</Label>
                    <Input id="systemName" defaultValue="Health Surveillance System" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alertThreshold">Alert Threshold</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Sensitivity</SelectItem>
                        <SelectItem value="medium">Medium Sensitivity</SelectItem>
                        <SelectItem value="high">High Sensitivity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention (months)</Label>
                    <Input id="dataRetention" type="number" defaultValue="24" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
