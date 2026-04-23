import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AppSidebar } from "./sidebar";

export default function Layout({
  children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar />

      <SidebarInset className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_48%,#f8fafc_100%)]">
        <main className="w-full overflow-hidden px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">RentCar Dashboard</p>
              <h1 className="text-lg font-semibold text-slate-900">Vista operativa</h1>
            </div>
            <SidebarTrigger className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100" />
          </div>

          <div>{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

