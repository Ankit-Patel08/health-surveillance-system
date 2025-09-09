"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Droplets, Users, AlertTriangle, CheckCircle, XCircle, Eye, Calendar, MapPin } from "lucide-react"

interface Village {
  id: string
  name: string
  population: number
  waterQuality: string
  riskLevel: string
  lastUpdated: string
  ashaWorker: string
}

interface VillageCardProps {
  village: Village
  onViewDetails: () => void
  userRole: string
  canAccess: boolean
}

export function VillageCard({ village, onViewDetails, userRole, canAccess }: VillageCardProps) {
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

  const getWaterQualityIcon = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "fair":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "poor":
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Droplets className="h-5 w-5 text-gray-600" />
    }
  }

  const getWaterQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case "good":
        return "text-green-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              {village.name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              {village.population.toLocaleString()} people
            </div>
          </div>
          <Badge className={getRiskColor(village.riskLevel)}>{village.riskLevel} Risk</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Water Quality Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            {getWaterQualityIcon(village.waterQuality)}
            <span className="font-medium">Water Quality</span>
          </div>
          <span className={`font-semibold ${getWaterQualityColor(village.waterQuality)}`}>{village.waterQuality}</span>
        </div>

        {/* ASHA Worker Info */}
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{village.ashaWorker}</p>
            <p className="text-gray-500">ASHA Worker</p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Updated: {new Date(village.lastUpdated).toLocaleDateString()}</span>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          {canAccess ? (
            <Button onClick={onViewDetails} className="w-full" variant="default">
              <Eye className="h-4 w-4 mr-2" />
              View Details & Manage
            </Button>
          ) : (
            <Button
              onClick={onViewDetails}
              className="w-full bg-transparent"
              variant="outline"
              disabled={userRole === "viewer"}
            >
              <Eye className="h-4 w-4 mr-2" />
              {userRole === "viewer" ? "View Only" : "Access Restricted"}
            </Button>
          )}
        </div>

        {/* Access Level Indicator */}
        {userRole === "asha" && !canAccess && (
          <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
            You can only access your assigned village
          </div>
        )}
      </CardContent>
    </Card>
  )
}
