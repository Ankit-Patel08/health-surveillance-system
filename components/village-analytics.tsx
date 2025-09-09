"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
} from "recharts"
import { TrendingUp, AlertTriangle, Target, Brain, Activity, Droplets, Shield, Calendar, BarChart3 } from "lucide-react"

interface Village {
  id: string
  name: string
  population: number
  waterQuality: string
  riskLevel: string
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

interface VillageAnalyticsProps {
  village: Village
}

// Mock historical data for analytics
const waterQualityTrend = [
  { month: "Jul", ph: 7.1, turbidity: 1.2, coliform: 0, chlorine: 0.6, score: 85 },
  { month: "Aug", ph: 7.0, turbidity: 1.8, coliform: 1, chlorine: 0.4, score: 75 },
  { month: "Sep", ph: 6.9, turbidity: 2.1, coliform: 2, chlorine: 0.3, score: 65 },
  { month: "Oct", ph: 6.8, turbidity: 2.8, coliform: 3, chlorine: 0.2, score: 55 },
  { month: "Nov", ph: 6.7, turbidity: 3.5, coliform: 5, chlorine: 0.1, score: 45 },
  { month: "Dec", ph: 6.8, turbidity: 3.2, coliform: 2, chlorine: 0.2, score: 60 },
  { month: "Jan", ph: 7.2, turbidity: 1.5, coliform: 0, chlorine: 0.5, score: 85 },
]

const diseaseOutbreakData = [
  { month: "Jul", diarrhea: 1, cholera: 0, typhoid: 0, hepatitis: 0, total: 1 },
  { month: "Aug", diarrhea: 2, cholera: 0, typhoid: 1, hepatitis: 0, total: 3 },
  { month: "Sep", diarrhea: 3, cholera: 1, typhoid: 1, hepatitis: 0, total: 5 },
  { month: "Oct", diarrhea: 5, cholera: 1, typhoid: 2, hepatitis: 1, total: 9 },
  { month: "Nov", diarrhea: 8, cholera: 2, typhoid: 3, hepatitis: 1, total: 14 },
  { month: "Dec", diarrhea: 6, cholera: 1, typhoid: 2, hepatitis: 0, total: 9 },
  { month: "Jan", diarrhea: 2, cholera: 0, typhoid: 1, hepatitis: 0, total: 3 },
]

const riskFactors = [
  { name: "Water Quality", value: 35, color: "#ef4444" },
  { name: "Population Density", value: 25, color: "#f97316" },
  { name: "Sanitation", value: 20, color: "#eab308" },
  { name: "Seasonal Factors", value: 15, color: "#22c55e" },
  { name: "Healthcare Access", value: 5, color: "#3b82f6" },
]

const predictiveInsights = [
  {
    type: "warning",
    title: "High Risk Period Approaching",
    description: "Based on seasonal patterns, disease outbreak risk increases by 40% in the next 2 weeks.",
    confidence: 85,
    action: "Increase water quality monitoring and prepare preventive measures.",
  },
  {
    type: "info",
    title: "Water Quality Improvement",
    description: "Recent interventions show 30% improvement in water quality metrics.",
    confidence: 92,
    action: "Continue current water treatment protocols.",
  },
  {
    type: "alert",
    title: "Coliform Level Alert",
    description: "Predictive model indicates potential coliform contamination in 5-7 days.",
    confidence: 78,
    action: "Schedule immediate water source inspection and testing.",
  },
]

export function VillageAnalytics({ village }: VillageAnalyticsProps) {
  const calculateRiskScore = () => {
    let score = 100

    // Water quality factors
    if (village.waterTests.ph < 6.5 || village.waterTests.ph > 8.5) score -= 15
    if (village.waterTests.turbidity > 1) score -= 20
    if (village.waterTests.coliform > 0) score -= 25
    if (village.waterTests.chlorine < 0.2) score -= 10

    // Disease factors
    const totalDiseases = Object.values(village.diseases).reduce((sum, count) => sum + count, 0)
    score -= totalDiseases * 5

    return Math.max(score, 0)
  }

  const riskScore = calculateRiskScore()
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Low", color: "text-green-600", bg: "bg-green-100" }
    if (score >= 60) return { level: "Medium", color: "text-yellow-600", bg: "bg-yellow-100" }
    return { level: "High", color: "text-red-600", bg: "bg-red-100" }
  }

  const risk = getRiskLevel(riskScore)

  return (
    <div className="space-y-6">
      {/* Risk Assessment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskScore}/100</div>
            <div
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${risk.bg} ${risk.color} mt-2`}
            >
              {risk.level} Risk
            </div>
            <Progress value={riskScore} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground mt-2">Model confidence based on historical data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Review</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 days</div>
            <p className="text-xs text-muted-foreground mt-2">Recommended analysis update</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {predictiveInsights.map((insight, index) => (
            <Alert
              key={index}
              className={
                insight.type === "warning"
                  ? "border-yellow-200 bg-yellow-50"
                  : insight.type === "alert"
                    ? "border-red-200 bg-red-50"
                    : "border-blue-200 bg-blue-50"
              }
            >
              <AlertTriangle
                className={`h-4 w-4 ${
                  insight.type === "warning"
                    ? "text-yellow-600"
                    : insight.type === "alert"
                      ? "text-red-600"
                      : "text-blue-600"
                }`}
              />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge variant="outline">{insight.confidence}% confidence</Badge>
                  </div>
                  <p className="text-sm">{insight.description}</p>
                  <p className="text-sm font-medium">Recommended Action: {insight.action}</p>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="correlation">Correlation</TabsTrigger>
          <TabsTrigger value="prediction">Prediction</TabsTrigger>
          <TabsTrigger value="factors">Risk Factors</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Water Quality Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  Water Quality Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={waterQualityTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Disease Cases Trend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Disease Cases Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={diseaseOutbreakData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="total" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Water Quality vs Disease Correlation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={waterQualityTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar yAxisId="left" dataKey="score" fill="#3b82f6" name="Water Quality Score" />
                  <Bar yAxisId="right" dataKey="coliform" fill="#ef4444" name="Coliform Level" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prediction" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 30-Day Prediction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  30-Day Outbreak Prediction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Diarrhea Risk</span>
                    <div className="flex items-center gap-2">
                      <Progress value={75} className="w-20" />
                      <span className="text-sm font-bold text-red-600">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Cholera Risk</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20" />
                      <span className="text-sm font-bold text-yellow-600">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Typhoid Risk</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-bold text-orange-600">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Hepatitis Risk</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20" />
                      <span className="text-sm font-bold text-green-600">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Seasonal Patterns */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Seasonal Risk Pattern
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">High Risk Season</div>
                    <p className="text-sm text-muted-foreground">Monsoon period (June - September)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Period Risk</span>
                      <span className="font-medium text-yellow-600">Medium</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Peak Risk in</span>
                      <span className="font-medium">4 months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Historical Accuracy</span>
                      <span className="font-medium text-green-600">89%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="factors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Risk Factor Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskFactors}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {riskFactors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Contributing Factors</h4>
                  {riskFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: factor.color }} />
                        <span className="text-sm">{factor.name}</span>
                      </div>
                      <span className="text-sm font-medium">{factor.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
