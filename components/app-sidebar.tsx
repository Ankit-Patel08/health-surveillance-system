"use client"

import { useAuth } from "@/contexts/auth-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Home, Wifi, Users, BarChart3, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  {
    title: "Main Dashboard",
    url: "/",
    icon: Home,
    roles: ["admin", "asha", "viewer"],
  },
  {
    title: "IoT Sensors",
    url: "/iot-sensors",
    icon: Wifi,
    roles: ["admin", "asha", "viewer"],
  },
  {
    title: "Community Interface",
    url: "/community",
    icon: Users,
    roles: ["admin", "asha", "viewer"],
  },
  {
    title: "Health Department",
    url: "/health-department",
    icon: BarChart3,
    roles: ["admin", "asha", "viewer"],
  },
  {
    title: "Admin Panel",
    url: "/admin",
    icon: Settings,
    roles: ["admin"],
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "asha":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredItems = navigationItems.filter((item) => item.roles.includes(user?.role || "viewer"))

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-lg font-semibold text-gray-900">Health Surveillance</h1>
            <p className="text-xs text-gray-500">Disease Monitoring System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 py-2 space-y-2 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Villages</span>
                <Badge variant="outline">15</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Population</span>
                <Badge variant="outline">45K</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Alerts</span>
                <Badge className="bg-red-100 text-red-800">3</Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2 group-data-[collapsible=icon]:justify-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
            <div className="group-data-[collapsible=icon]:hidden">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <Badge className={getRoleBadgeColor(user?.role || "")} size="sm">
                {user?.role?.toUpperCase()}
              </Badge>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0 bg-transparent"
          >
            <LogOut className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-2" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
