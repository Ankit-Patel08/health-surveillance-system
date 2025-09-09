"use client"

import { useAuth } from "@/contexts/auth-context"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Droplets, Users, Shield, BarChart3, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Public Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Health Surveillance System</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/community">
                <Button variant="ghost">Community Portal</Button>
              </Link>
              <Link href="/health-department">
                <Button variant="ghost">Health Dashboard</Button>
              </Link>
              <LoginForm />
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Health Surveillance & Early Warning System</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitoring water-borne diseases in rural areas through real-time data collection, predictive analytics,
              and community engagement.
            </p>
          </div>

          {/* Public Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Droplets className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Water Quality Monitoring</CardTitle>
                <CardDescription>Real-time IoT sensors tracking water contamination levels</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/iot-sensors">
                  <Button className="w-full">View Live Data</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Community Portal</CardTitle>
                <CardDescription>Multilingual interface for health reporting and awareness</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/community">
                  <Button className="w-full">Access Portal</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle>Health Analytics</CardTitle>
                <CardDescription>Public dashboards showing disease trends and hotspots</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/health-department">
                  <Button className="w-full">View Dashboard</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* System Overview */}
          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">System Overview</CardTitle>
              <CardDescription>Comprehensive health surveillance for rural communities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    For Health Workers
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Village-specific data management</li>
                    <li>• Real-time health monitoring</li>
                    <li>• Community notification system</li>
                    <li>• Predictive disease analytics</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Public Access
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Water quality monitoring</li>
                    <li>• Community health reporting</li>
                    <li>• Disease trend visualization</li>
                    <li>• Health awareness campaigns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return <Dashboard />
}
