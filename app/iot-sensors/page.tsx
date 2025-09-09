"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Wifi, WifiOff, Activity, AlertTriangle, CheckCircle, Clock, RefreshCw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock IoT sensor data
const mockSensors = [
  {
    id: "sensor-001",
    name: "Rampur Main Well",
    village: "Rampur",
    type: "Water Quality Monitor",
    status: "online",
    lastUpdate: "2024-01-15T14:30:00Z",
    batteryLevel: 85,
    coordinates: { lat: 28.6139, lng: 77.209 },
    readings: {
      ph: 7.2,
      turbidity: 1.5,
      temperature: 24.5,
      tds: 180,
      chlorine: 0.5,
      coliform: 0,
    },
  },
  {
    id: "sensor-002",
    name: "Krishnanagar Borewell",
    village: "Krishnanagar",
    type: "Multi-parameter Sensor",
    status: "online",
    lastUpdate: "2024-01-15T14:25:00Z",
    batteryLevel: 92,
    coordinates: { lat: 28.7041, lng: 77.1025 },
    readings: {
      ph: 6.8,
      turbidity: 3.2,
      temperature: 26.1,
      tds: 220,
      chlorine: 0.2,
      coliform: 2,
    },
  },
  {
    id: "sensor-003",
    name: "Govindpur River Point",
    village: "Govindpur",
    type: "Environmental Monitor",
    status: "warning",
    lastUpdate: "2024-01-15T13:45:00Z",
    batteryLevel: 23,
    coordinates: { lat: 28.5355, lng: 77.391 },
    readings: {
      ph: 6.2,
      turbidity: 5.8,
      temperature: 28.3,
      tds: 350,
      chlorine: 0.1,
      coliform: 8,
    },
  },
  {
    id: "sensor-004",
    name: "Govindpur Hand Pump",
    village: "Govindpur",
    type: "Basic Water Sensor",
    status: "offline",
    lastUpdate: "2024-01-14T09:15:00Z",
    batteryLevel: 0,
    coordinates: { lat: 28.5365, lng: 77.395 },
    readings: {
      ph: 0,
      turbidity: 0,
      temperature: 0,
      tds: 0,
      chlorine: 0,
      coliform: 0,
    },
  },
]

// Mock historical data for charts
const generateHistoricalData = () => {
  const data = []
  for (let i = 23; i >= 0; i--) {
    const date = new Date()
    date.setHours(date.getHours() - i)
    data.push({
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      ph: 6.5 + Math.random() * 1.5,
      turbidity: 1 + Math.random() * 4,
      temperature: 22 + Math.random() * 8,
      coliform: Math.floor(Math.random() * 10),
    })
  }
  return data
}

export default function IoTSensorsPage() {
  const [sensors, setSensors] = useState(mockSensors)
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null)
  const [historicalData] = useState(generateHistoricalData())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update sensor data with slight variations
    setSensors((prev) =>
      prev.map((sensor) => ({
        ...sensor,
        lastUpdate: new Date().toISOString(),
        readings: {
          ...sensor.readings,
          ph: sensor.readings.ph + (Math.random() - 0.5) * 0.2,
          turbidity: Math.max(0, sensor.readings.turbidity + (Math.random() - 0.5) * 0.5),
          temperature: sensor.readings.temperature + (Math.random() - 0.5) * 2,
        },
      })),
    )

    setIsRefreshing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "offline":
        return <WifiOff className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getParameterStatus = (parameter: string, value: number) => {
    switch (parameter) {
      case "ph":
        if (value >= 6.5 && value <= 8.5) return "normal"
        if (value >= 6.0 && value <= 9.0) return "warning"
        return "critical"
      case "turbidity":
        if (value <= 1) return "normal"
        if (value <= 4) return "warning"
        return "critical"
      case "coliform":
        if (value === 0) return "normal"
        if (value <= 3) return "warning"
        return "critical"
      default:
        return "normal"
    }
  }

  const onlineSensors = sensors.filter((s) => s.status === "online").length
  const warningSensors = sensors.filter((s) => s.status === "warning").length
  const offlineSensors = sensors.filter((s) => s.status === "offline").length

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center gap-4 px-6 py-4">
          <SidebarTrigger />
          <div className="flex items-center gap-3">
            <Wifi className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">IoT Sensor Network</h1>
              <p className="text-sm text-gray-500">Real-time Water Quality Monitoring</p>
            </div>
          </div>
          <div className="ml-auto">
            <Button onClick={refreshData} disabled={isRefreshing} variant="outline">
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Network Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sensors</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sensors.length}</div>
              <p className="text-xs text-muted-foreground">Deployed across villages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{onlineSensors}</div>
              <p className="text-xs text-muted-foreground">Actively monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Warnings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{warningSensors}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
              <WifiOff className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{offlineSensors}</div>
              <p className="text-xs text-muted-foreground">Require maintenance</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sensors" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sensors">Sensor Status</TabsTrigger>
            <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="sensors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sensors.map((sensor) => (
                <Card key={sensor.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Wifi className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{sensor.name}</CardTitle>
                          <p className="text-sm text-gray-500">
                            {sensor.village} • {sensor.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(sensor.status)}>
                          {getStatusIcon(sensor.status)}
                          <span className="ml-1">{sensor.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Last Update:</span>
                      <span>{new Date(sensor.lastUpdate).toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Battery Level:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-full rounded-full ${
                              sensor.batteryLevel > 50
                                ? "bg-green-500"
                                : sensor.batteryLevel > 20
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${sensor.batteryLevel}%` }}
                          />
                        </div>
                        <span>{sensor.batteryLevel}%</span>
                      </div>
                    </div>

                    {sensor.status !== "offline" && (
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>pH Level:</span>
                            <Badge
                              variant={
                                getParameterStatus("ph", sensor.readings.ph) === "normal" ? "outline" : "destructive"
                              }
                            >
                              {sensor.readings.ph.toFixed(1)}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Turbidity:</span>
                            <Badge
                              variant={
                                getParameterStatus("turbidity", sensor.readings.turbidity) === "normal"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {sensor.readings.turbidity.toFixed(1)} NTU
                            </Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Temperature:</span>
                            <Badge variant="outline">{sensor.readings.temperature.toFixed(1)}°C</Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>TDS:</span>
                            <Badge variant="outline">{sensor.readings.tds} ppm</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Chlorine:</span>
                            <Badge variant="outline">{sensor.readings.chlorine} mg/L</Badge>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Coliform:</span>
                            <Badge
                              variant={
                                getParameterStatus("coliform", sensor.readings.coliform) === "normal"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {sensor.readings.coliform} CFU
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>pH Levels - 24 Hour Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[6, 8]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Turbidity Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="turbidity" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Temperature Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="temperature" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Coliform Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="coliform" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-800">Critical Water Quality Alert</h4>
                    <p className="text-red-700">
                      Govindpur River Point sensor detecting high coliform levels (8 CFU). Immediate action required.
                    </p>
                    <p className="text-xs text-red-600">Detected: 2 hours ago</p>
                  </div>
                </AlertDescription>
              </Alert>

              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-yellow-800">Low Battery Warning</h4>
                    <p className="text-yellow-700">
                      Govindpur River Point sensor battery at 23%. Schedule maintenance soon.
                    </p>
                    <p className="text-xs text-yellow-600">Detected: 4 hours ago</p>
                  </div>
                </AlertDescription>
              </Alert>

              <Alert className="border-red-200 bg-red-50">
                <WifiOff className="h-4 w-4 text-red-600" />
                <AlertDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-800">Sensor Offline</h4>
                    <p className="text-red-700">
                      Govindpur Hand Pump sensor has been offline for 24+ hours. Check connectivity and power.
                    </p>
                    <p className="text-xs text-red-600">Last seen: Yesterday at 9:15 AM</p>
                  </div>
                </AlertDescription>
              </Alert>

              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <div className="space-y-2">
                    <h4 className="font-medium text-blue-800">System Update</h4>
                    <p className="text-blue-700">
                      All sensors in Rampur and Krishnanagar are operating normally with good water quality readings.
                    </p>
                    <p className="text-xs text-blue-600">Status: Current</p>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
