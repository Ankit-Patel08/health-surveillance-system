"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { TestTube, Heart, MapPin, Save, AlertCircle, CheckCircle } from "lucide-react"

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

interface DataManagementFormProps {
  village: Village
}

export function DataManagementForm({ village }: DataManagementFormProps) {
  const [activeTab, setActiveTab] = useState("water")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Water test form state
  const [waterData, setWaterData] = useState({
    ph: village.waterTests.ph.toString(),
    turbidity: village.waterTests.turbidity.toString(),
    coliform: village.waterTests.coliform.toString(),
    chlorine: village.waterTests.chlorine.toString(),
    testDate: new Date().toISOString().split("T")[0],
    notes: "",
  })

  // Health data form state
  const [healthData, setHealthData] = useState({
    diarrhea: village.diseases.diarrhea.toString(),
    cholera: village.diseases.cholera.toString(),
    typhoid: village.diseases.typhoid.toString(),
    hepatitis: village.diseases.hepatitis.toString(),
    reportDate: new Date().toISOString().split("T")[0],
    notes: "",
  })

  // Village info form state
  const [villageInfo, setVillageInfo] = useState({
    population: village.population.toString(),
    waterQuality: village.waterQuality,
    riskLevel: village.riskLevel,
    waterSources: village.waterSources.join(", "),
    notes: "",
  })

  const handleWaterTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitMessage({
        type: "success",
        message: "Water test data updated successfully!",
      })

      // Reset form or update village data here
      console.log("[v0] Water test data submitted:", waterData)
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "Failed to update water test data. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(null), 3000)
    }
  }

  const handleHealthDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitMessage({
        type: "success",
        message: "Health data updated successfully!",
      })

      console.log("[v0] Health data submitted:", healthData)
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "Failed to update health data. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(null), 3000)
    }
  }

  const handleVillageInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSubmitMessage({
        type: "success",
        message: "Village information updated successfully!",
      })

      console.log("[v0] Village info submitted:", villageInfo)
    } catch (error) {
      setSubmitMessage({
        type: "error",
        message: "Failed to update village information. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(null), 3000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Data Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        {submitMessage && (
          <Alert
            className={`mb-4 ${submitMessage.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
          >
            {submitMessage.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription className={submitMessage.type === "success" ? "text-green-800" : "text-red-800"}>
              {submitMessage.message}
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="water">Water Tests</TabsTrigger>
            <TabsTrigger value="health">Health Data</TabsTrigger>
            <TabsTrigger value="village">Village Info</TabsTrigger>
          </TabsList>

          <TabsContent value="water" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TestTube className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Water Quality Test Entry</h3>
            </div>

            <form onSubmit={handleWaterTestSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ph">pH Level</Label>
                  <Input
                    id="ph"
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={waterData.ph}
                    onChange={(e) => setWaterData((prev) => ({ ...prev, ph: e.target.value }))}
                    placeholder="6.5 - 8.5"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Normal range: 6.5 - 8.5</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                  <Input
                    id="turbidity"
                    type="number"
                    step="0.1"
                    min="0"
                    value={waterData.turbidity}
                    onChange={(e) => setWaterData((prev) => ({ ...prev, turbidity: e.target.value }))}
                    placeholder="< 1.0"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Safe level: &lt; 1.0 NTU</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coliform">Coliform (CFU/100ml)</Label>
                  <Input
                    id="coliform"
                    type="number"
                    min="0"
                    value={waterData.coliform}
                    onChange={(e) => setWaterData((prev) => ({ ...prev, coliform: e.target.value }))}
                    placeholder="0"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Safe level: 0 CFU/100ml</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chlorine">Chlorine (mg/L)</Label>
                  <Input
                    id="chlorine"
                    type="number"
                    step="0.1"
                    min="0"
                    value={waterData.chlorine}
                    onChange={(e) => setWaterData((prev) => ({ ...prev, chlorine: e.target.value }))}
                    placeholder="0.2 - 1.0"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Recommended: 0.2 - 1.0 mg/L</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testDate">Test Date</Label>
                <Input
                  id="testDate"
                  type="date"
                  value={waterData.testDate}
                  onChange={(e) => setWaterData((prev) => ({ ...prev, testDate: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterNotes">Additional Notes</Label>
                <Textarea
                  id="waterNotes"
                  value={waterData.notes}
                  onChange={(e) => setWaterData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any observations or additional information..."
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Updating..." : "Update Water Test Data"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-red-600" />
              <h3 className="text-lg font-semibold">Health Data Entry</h3>
            </div>

            <form onSubmit={handleHealthDataSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="diarrhea">Diarrhea Cases</Label>
                  <Input
                    id="diarrhea"
                    type="number"
                    min="0"
                    value={healthData.diarrhea}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, diarrhea: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cholera">Cholera Cases</Label>
                  <Input
                    id="cholera"
                    type="number"
                    min="0"
                    value={healthData.cholera}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, cholera: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="typhoid">Typhoid Cases</Label>
                  <Input
                    id="typhoid"
                    type="number"
                    min="0"
                    value={healthData.typhoid}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, typhoid: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hepatitis">Hepatitis Cases</Label>
                  <Input
                    id="hepatitis"
                    type="number"
                    min="0"
                    value={healthData.hepatitis}
                    onChange={(e) => setHealthData((prev) => ({ ...prev, hepatitis: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reportDate">Report Date</Label>
                <Input
                  id="reportDate"
                  type="date"
                  value={healthData.reportDate}
                  onChange={(e) => setHealthData((prev) => ({ ...prev, reportDate: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthNotes">Additional Notes</Label>
                <Textarea
                  id="healthNotes"
                  value={healthData.notes}
                  onChange={(e) => setHealthData((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Symptoms, treatment details, or other observations..."
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Updating..." : "Update Health Data"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="village" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold">Village Information</h3>
            </div>

            <form onSubmit={handleVillageInfoSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="population">Population</Label>
                  <Input
                    id="population"
                    type="number"
                    min="1"
                    value={villageInfo.population}
                    onChange={(e) => setVillageInfo((prev) => ({ ...prev, population: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterQuality">Water Quality Status</Label>
                  <Select
                    value={villageInfo.waterQuality}
                    onValueChange={(value) => setVillageInfo((prev) => ({ ...prev, waterQuality: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskLevel">Risk Level</Label>
                  <Select
                    value={villageInfo.riskLevel}
                    onValueChange={(value) => setVillageInfo((prev) => ({ ...prev, riskLevel: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterSources">Water Sources</Label>
                  <Input
                    id="waterSources"
                    value={villageInfo.waterSources}
                    onChange={(e) => setVillageInfo((prev) => ({ ...prev, waterSources: e.target.value }))}
                    placeholder="Borewell, Hand Pump, Well..."
                    required
                  />
                  <p className="text-xs text-muted-foreground">Separate multiple sources with commas</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="villageNotes">Additional Notes</Label>
                <Textarea
                  id="villageNotes"
                  value={villageInfo.notes}
                  onChange={(e) => setVillageInfo((prev) => ({ ...prev, notes: e.target.value }))}
                  placeholder="Infrastructure updates, community feedback, or other relevant information..."
                  rows={3}
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Updating..." : "Update Village Information"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
