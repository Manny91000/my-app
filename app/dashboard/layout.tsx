import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AppSidebar } from "./sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>

      <Toaster /> 
      <AppSidebar />
      <main className="p-8 w-full bg-gray">
        <SidebarTrigger/>

        <div >
        {children }
        </div>
      </main>
    </SidebarProvider>
  )
}
  