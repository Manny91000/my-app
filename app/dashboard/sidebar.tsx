import { Calendar, Home, Inbox, Search, Settings,} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Alquiler",
    url: "/dashboard/alquileres",
    icon: Home,
  },
  {
    title: "Empleados",
    url: "/dashboard/empleados",
    icon: Inbox,
  },
  {
    title: "Vehiculos",
    url: "/dashboard/vehiculos",
    icon: Calendar,
  },
  {
    title: "Tipo de Vehiculos",
    url: "/dashboard/tipodevehiculos",
    icon: Search,
  },
  {
    title: "Modelos",
    url: "/dashboard/modelos",
    icon: Settings,
  },
  {
    title: "Combustibles",
    url: "/dashboard/combustibles",
    icon: Calendar,
  },
  {
    title: "Clientes",
    url: "/dashboard/clientes",
    icon: Calendar,
  },
  {
    title: "Marcas",
    url: "/dashboard/marcas",
    icon: Calendar,
  },
  {
    title: "Inspecciones",
    url: "/dashboard/inspecciones",
    icon: Calendar,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
