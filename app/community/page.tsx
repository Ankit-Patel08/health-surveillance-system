"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, AlertTriangle, Megaphone, Globe, Phone, MapPin } from "lucide-react"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
]

const translations = {
  en: {
    title: "Community Health Interface",
    reportIssue: "Report Health Issue",
    viewAlerts: "Health Alerts",
    awareness: "Health Awareness",
    emergency: "Emergency Contacts",
  },
  hi: {
    title: "सामुदायिक स्वास्थ्य इंटरफेस",
    reportIssue: "स्वास्थ्य समस्या की रिपोर्ट करें",
    viewAlerts: "स्वास्थ्य अलर्ट",
    awareness: "स्वास्थ्य जागरूकता",
    emergency: "आपातकालीन संपर्क",
  },
}

export default function CommunityPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [reportForm, setReportForm] = useState({
    type: "",
    description: "",
    location: "",
    contact: "",
  })

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en

  const healthAlerts = [
    {
      id: 1,
      type: "warning",
      title: "Water Quality Alert - Riverside Village",
      message: "High bacterial contamination detected. Boil water before consumption.",
      timestamp: "2 hours ago",
      severity: "high",
    },
    {
      id: 2,
      type: "info",
      title: "Vaccination Drive - Central Health Center",
      message: "Free vaccination camp on December 15th, 9 AM - 5 PM",
      timestamp: "1 day ago",
      severity: "medium",
    },
  ]

  const awarenessContent = [
    {
      title: "Water Safety Tips",
      content: "Always boil water for at least 1 minute before drinking. Store in clean containers.",
      icon: "💧",
    },
    {
      title: "Disease Prevention",
      content: "Wash hands frequently with soap. Maintain proper sanitation around water sources.",
      icon: "🧼",
    },
    {
      title: "Emergency Signs",
      content: "Seek immediate help for severe diarrhea, vomiting, or dehydration symptoms.",
      icon: "🚨",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with Language Selector */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-600 mt-1">Community health reporting and awareness platform</p>
          </div>

          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="report" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="report" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {t.reportIssue}
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {t.viewAlerts}
            </TabsTrigger>
            <TabsTrigger value="awareness" className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              {t.awareness}
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t.emergency}
            </TabsTrigger>
          </TabsList>

          {/* Report Issue Tab */}
          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Report Health Issue
                </CardTitle>
                <CardDescription>
                  Report water quality issues, disease outbreaks, or health concerns in your community
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Issue Type</label>
                    <Select
                      value={reportForm.type}
                      onValueChange={(value) => setReportForm({ ...reportForm, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="water-quality">Water Quality Issue</SelectItem>
                        <SelectItem value="disease-outbreak">Disease Outbreak</SelectItem>
                        <SelectItem value="sanitation">Sanitation Problem</SelectItem>
                        <SelectItem value="other">Other Health Concern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      placeholder="Enter location or village name"
                      value={reportForm.location}
                      onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe the health issue in detail..."
                    value={reportForm.description}
                    onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Contact Number (Optional)</label>
                  <Input
                    placeholder="Your phone number for follow-up"
                    value={reportForm.contact}
                    onChange={(e) => setReportForm({ ...reportForm, contact: e.target.value })}
                  />
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit Report</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Alerts Tab */}
          <TabsContent value="alerts">
            <div className="space-y-4">
              {healthAlerts.map((alert) => (
                <Alert
                  key={alert.id}
                  className={`border-l-4 ${
                    alert.severity === "high"
                      ? "border-l-red-500 bg-red-50"
                      : alert.severity === "medium"
                        ? "border-l-yellow-500 bg-yellow-50"
                        : "border-l-blue-500 bg-blue-50"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <AlertDescription className="mt-1">{alert.message}</AlertDescription>
                      <p className="text-xs text-gray-500 mt-2">{alert.timestamp}</p>
                    </div>
                    <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>{alert.severity}</Badge>
                  </div>
                </Alert>
              ))}
            </div>
          </TabsContent>

          {/* Health Awareness Tab */}
          <TabsContent value="awareness">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awarenessContent.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Emergency Contacts Tab */}
          <TabsContent value="emergency">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-700 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Emergency Hotline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-red-600">108</p>
                    <p className="text-sm text-gray-600">24/7 Medical Emergency</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Local Health Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-semibold">Primary Health Center</p>
                    <p className="text-sm text-gray-600">Main Road, Village Center</p>
                    <p className="text-sm text-gray-600">Phone: +91-9876543210</p>
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
