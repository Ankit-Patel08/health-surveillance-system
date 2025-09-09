"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { MapPin, TrendingUp, Users, AlertTriangle, Activity, Calendar, Download, Filter } from "lucide-react"

const diseaseData = [
  { month: "Jan", cholera: 12, typhoid: 8, diarrhea: 45, hepatitis: 3 },
  { month: "Feb", cholera: 8, typhoid: 12, diarrhea: 38, hepatitis: 5 },
  { month: "Mar", cholera: 15, typhoid: 6, diarrhea: 52, hepatitis: 2 },
  { month: "Apr", cholera: 22, typhoid: 14, diarrhea: 67, hepatitis: 8 },
  { month: "May", cholera: 18, typhoid: 10, diarrhea: 43, hepatitis: 4 },
  { month: "Jun", cholera: 25, typhoid: 18, diarrhea: 78, hepatitis: 12 },
]

const villageHotspots = [
  { name: "Riverside Village", risk: "High", cases: 45, population: 1200, riskScore: 85 },
  { name: "Mountain View", risk: "Medium", cases: 23, population: 800, riskScore: 65 },
  { name: "Green Valley", risk: "Low", cases: 8, population: 950, riskScore: 25 },
  { name: "Sunset Hills", risk: "High", cases: 38, population: 1100, riskScore: 78 },
  { name: "River Bend", risk: "Medium", cases: 19, population: 750, riskScore: 55 },
]

const interventionData = [
  { intervention: "Water Purification", villages: 12, budget: 450000, status: "Active" },
  { intervention: "Sanitation Drive", villages: 8, budget: 280000, status: "Completed" },
  { intervention: "Health Camps", villages: 15, budget: 320000, status: "Active" },
  { intervention: "Awareness Programs", villages: 20, budget: 150000, status: "Planned" },
]

const resourceAllocation = [
  { name: "Medical Supplies", value: 35, color: "#3b82f6" },
  { name: "Water Treatment", value: 28, color: "#10b981" },
  { name: "Personnel", value: 22, color: "#f59e0b" },
  { name: "Infrastructure", value: 15, color: "#ef4444" },
]

export default function HealthDepartmentPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedRegion, setSelectedRegion] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Department Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor disease hotspots, track interventions, and allocate resources</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North Region</SelectItem>
                <SelectItem value="south">South Region</SelectItem>
                <SelectItem value="east">East Region</SelectItem>
                <SelectItem value="west">West Region</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Active Outbreaks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-red-600">8</span>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">+2 from last week</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">342</span>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">27</span>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">Active programs</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Budget Utilized</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-yellow-600">68%</span>
                <TrendingUp className="w-8 h-8 text-yellow-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">₹12.5L allocated</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="hotspots" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hotspots">Disease Hotspots</TabsTrigger>
            <TabsTrigger value="trends">Disease Trends</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          </TabsList>

          {/* Disease Hotspots Tab */}
          <TabsContent value="hotspots">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Village Risk Assessment
                  </CardTitle>
                  <CardDescription>Current disease risk levels by village</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {villageHotspots.map((village, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{village.name}</h4>
                          <p className="text-sm text-gray-600">
                            {village.cases} cases | Pop: {village.population}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-sm font-medium">Risk Score</p>
                            <p className="text-lg font-bold">{village.riskScore}</p>
                          </div>
                          <Badge
                            variant={
                              village.risk === "High"
                                ? "destructive"
                                : village.risk === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {village.risk}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                  <CardDescription>Villages by risk category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "High Risk", value: 2, color: "#ef4444" },
                          { name: "Medium Risk", value: 2, color: "#f59e0b" },
                          { name: "Low Risk", value: 1, color: "#10b981" },
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {[
                          { name: "High Risk", value: 2, color: "#ef4444" },
                          { name: "Medium Risk", value: 2, color: "#f59e0b" },
                          { name: "Low Risk", value: 1, color: "#10b981" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Disease Trends Tab */}
          <TabsContent value="trends">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Disease Cases Over Time</CardTitle>
                  <CardDescription>Monthly disease case trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={diseaseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="diarrhea" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                      <Area type="monotone" dataKey="cholera" stackId="1" stroke="#ef4444" fill="#ef4444" />
                      <Area type="monotone" dataKey="typhoid" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                      <Area type="monotone" dataKey="hepatitis" stackId="1" stroke="#10b981" fill="#10b981" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Disease Comparison</CardTitle>
                  <CardDescription>Cases by disease type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={diseaseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="diarrhea" fill="#3b82f6" />
                      <Bar dataKey="cholera" fill="#ef4444" />
                      <Bar dataKey="typhoid" fill="#f59e0b" />
                      <Bar dataKey="hepatitis" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interventions Tab */}
          <TabsContent value="interventions">
            <Card>
              <CardHeader>
                <CardTitle>Active Interventions</CardTitle>
                <CardDescription>Current health intervention programs and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interventionData.map((intervention, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{intervention.intervention}</h4>
                        <p className="text-sm text-gray-600">{intervention.villages} villages covered</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Budget</p>
                          <p className="font-semibold">₹{(intervention.budget / 100000).toFixed(1)}L</p>
                        </div>
                        <Badge
                          variant={
                            intervention.status === "Active"
                              ? "default"
                              : intervention.status === "Completed"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {intervention.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resource Allocation Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation</CardTitle>
                  <CardDescription>Resource distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={resourceAllocation}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {resourceAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                  <CardDescription>Current vs allocated resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resourceAllocation.map((resource, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{resource.name}</span>
                          <span className="text-sm text-gray-600">{resource.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${resource.value}%`,
                              backgroundColor: resource.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
