"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, MessageSquare, Send, Clock, CheckCircle, AlertTriangle, Users, Smartphone } from "lucide-react"

interface Village {
  id: string
  name: string
  population: number
}

interface NotificationPanelProps {
  village: Village
}

interface NotificationHistory {
  id: string
  type: "sms" | "notification"
  message: string
  audience: string
  timestamp: string
  status: "sent" | "pending" | "failed"
  recipients: number
}

const messageTemplates = [
  {
    id: "water_alert",
    title: "Water Quality Alert",
    message:
      "URGENT: Water quality in {village} has deteriorated. Please boil water before drinking and use only treated water for cooking. Contact your ASHA worker for more information.",
    category: "Health Alert",
  },
  {
    id: "disease_outbreak",
    title: "Disease Outbreak Warning",
    message:
      "Health Alert: Cases of {disease} reported in {village}. Please maintain hygiene, wash hands frequently, and seek immediate medical attention if symptoms appear.",
    category: "Health Alert",
  },
  {
    id: "water_test",
    title: "Water Testing Schedule",
    message:
      "Water quality testing will be conducted in {village} on {date}. Please ensure water sources are accessible. Contact {asha_worker} for questions.",
    category: "Information",
  },
  {
    id: "health_camp",
    title: "Health Camp Announcement",
    message:
      "Free health checkup camp in {village} on {date} at {location}. Bring your health cards. Services include general checkup, vaccination, and health education.",
    category: "Information",
  },
  {
    id: "prevention_tips",
    title: "Prevention Guidelines",
    message:
      "Stay healthy! Drink boiled/treated water, wash hands with soap, keep surroundings clean, and report any illness to your ASHA worker immediately.",
    category: "Education",
  },
]

const mockNotificationHistory: NotificationHistory[] = [
  {
    id: "1",
    type: "sms",
    message: "Water quality testing completed. Results show improvement. Continue following safety guidelines.",
    audience: "All Villagers",
    timestamp: "2024-01-15T10:30:00Z",
    status: "sent",
    recipients: 1250,
  },
  {
    id: "2",
    type: "notification",
    message: "Health camp scheduled for January 20th at village center. Free checkups available.",
    audience: "All Villagers",
    timestamp: "2024-01-14T14:15:00Z",
    status: "sent",
    recipients: 1250,
  },
  {
    id: "3",
    type: "sms",
    message: "URGENT: Boil water before drinking. Water quality alert in effect.",
    audience: "All Villagers",
    timestamp: "2024-01-13T08:45:00Z",
    status: "sent",
    recipients: 1250,
  },
]

export function NotificationPanel({ village }: NotificationPanelProps) {
  const [activeTab, setActiveTab] = useState("send")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [audience, setAudience] = useState("all")
  const [notificationType, setNotificationType] = useState("both")
  const [isLoading, setIsLoading] = useState(false)
  const [sendResult, setSendResult] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleTemplateSelect = (templateId: string) => {
    const template = messageTemplates.find((t) => t.id === templateId)
    if (template) {
      let message = template.message
      message = message.replace("{village}", village.name)
      message = message.replace("{date}", new Date().toLocaleDateString())
      message = message.replace("{asha_worker}", "your ASHA worker")
      message = message.replace("{location}", "village center")
      setCustomMessage(message)
    }
  }

  const handleSendNotification = async () => {
    if (!customMessage.trim()) {
      setSendResult({
        type: "error",
        message: "Please enter a message to send.",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const recipientCount = audience === "all" ? village.population : Math.floor(village.population * 0.3)

      setSendResult({
        type: "success",
        message: `Notification sent successfully to ${recipientCount} recipients via ${notificationType === "both" ? "SMS and app notification" : notificationType === "sms" ? "SMS" : "app notification"}.`,
      })

      // Reset form
      setCustomMessage("")
      setSelectedTemplate("")
    } catch (error) {
      setSendResult({
        type: "error",
        message: "Failed to send notification. Please try again.",
      })
    } finally {
      setIsLoading(false)
      setTimeout(() => setSendResult(null), 5000)
    }
  }

  const getAudienceCount = () => {
    switch (audience) {
      case "all":
        return village.population
      case "adults":
        return Math.floor(village.population * 0.6)
      case "families":
        return Math.floor(village.population * 0.25)
      default:
        return village.population
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send">Send Notification</TabsTrigger>
            <TabsTrigger value="history">Message History</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-6">
            {sendResult && (
              <Alert
                className={sendResult.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
              >
                {sendResult.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={sendResult.type === "success" ? "text-green-800" : "text-red-800"}>
                  {sendResult.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Message Templates */}
            <div className="space-y-3">
              <Label>Quick Templates</Label>
              <div className="grid grid-cols-1 gap-2">
                {messageTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template.id)
                      handleTemplateSelect(template.id)
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm">{template.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{template.message.substring(0, 80)}...</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message Content</Label>
              <Textarea
                id="message"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message here or select a template above..."
                rows={4}
                maxLength={160}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>SMS character limit: 160</span>
                <span>{customMessage.length}/160</span>
              </div>
            </div>

            {/* Audience Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Villagers</SelectItem>
                    <SelectItem value="adults">Adults Only</SelectItem>
                    <SelectItem value="families">Family Heads</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Estimated recipients: {getAudienceCount().toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Delivery Method</Label>
                <Select value={notificationType} onValueChange={setNotificationType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="both">SMS + App Notification</SelectItem>
                    <SelectItem value="sms">SMS Only</SelectItem>
                    <SelectItem value="notification">App Notification Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Send Button */}
            <Button onClick={handleSendNotification} disabled={isLoading || !customMessage.trim()} className="w-full">
              {isLoading ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Notification
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Messages</h3>
              <Badge variant="outline">{mockNotificationHistory.length} messages sent</Badge>
            </div>

            <div className="space-y-3">
              {mockNotificationHistory.map((notification) => (
                <div key={notification.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {notification.type === "sms" ? (
                        <Smartphone className="h-4 w-4 text-blue-600" />
                      ) : (
                        <Bell className="h-4 w-4 text-green-600" />
                      )}
                      <span className="font-medium capitalize">{notification.type}</span>
                      <Badge
                        className={
                          notification.status === "sent"
                            ? "bg-green-100 text-green-800"
                            : notification.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {notification.status}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{new Date(notification.timestamp).toLocaleDateString()}</div>
                      <div>{new Date(notification.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700">{notification.message}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {notification.audience}
                      </span>
                      <span>{notification.recipients.toLocaleString()} recipients</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {mockNotificationHistory.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No messages sent yet</p>
                <p className="text-sm">Start by sending your first notification to villagers</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
