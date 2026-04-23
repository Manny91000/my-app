"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  CircleDollarSign,
  ClipboardList,
  FileBarChart2,
  Fuel,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Tags,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Resumen",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Alquiler",
    url: "/dashboard/alquileres",
    icon: CircleDollarSign,
  },
  {
    title: "Empleados",
    url: "/dashboard/empleados",
    icon: ShieldCheck,
  },
  {
    title: "Vehiculos",
    url: "/dashboard/vehiculos",
    icon: Car,
  },
  {
    title: "Tipo de Vehiculos",
    url: "/dashboard/tipodevehiculos",
    icon: Tags,
  },
  {
    title: "Modelos",
    url: "/dashboard/modelos",
    icon: Settings,
  },
  {
    title: "Combustibles",
    url: "/dashboard/combustibles",
    icon: Fuel,
  },
  {
    title: "Clientes",
    url: "/dashboard/clientes",
    icon: Users,
  },
  {
    title: "Marcas",
    url: "/dashboard/marcas",
    icon: ClipboardList,
  },
  {
    title: "Inspecciones",
    url: "/dashboard/inspecciones",
    icon: ShieldCheck,
  },
  {
    title: "Reportes",
    url: "/dashboard/reportes",
    icon: FileBarChart2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-slate-200 bg-white/90 backdrop-blur">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Centro de operaciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url === "/dashboard" ? pathname === item.url : pathname.startsWith(item.url)}
                  >
                    <Link href={item.url}>
                      <item.icon />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

