import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Car,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

import { prisma } from "@/prisma/prisma.config";

const currencyFormatter = new Intl.NumberFormat("es-DO", {
  style: "currency",
  currency: "DOP",
  maximumFractionDigits: 2,
});

const dateFormatter = new Intl.DateTimeFormat("es-DO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const quickActions = [
  {
    href: "/dashboard/alquileres",
    title: "Gestionar alquileres",
    description: "Revisa rentas activas, devoluciones y seguimiento operativo.",
    accent: "from-sky-500/15 via-sky-500/5 to-transparent",
  },
  {
    href: "/dashboard/vehiculos",
    title: "Supervisar flota",
    description: "Valida disponibilidad, estado general y datos clave de cada unidad.",
    accent: "from-emerald-500/15 via-emerald-500/5 to-transparent",
  },
  {
    href: "/dashboard/clientes",
    title: "Atender clientes",
    description: "Consulta registros, documentación y estado comercial del cliente.",
    accent: "from-amber-500/15 via-amber-500/5 to-transparent",
  },
  {
    href: "/dashboard/reportes",
    title: "Generar reportes",
    description: "Convierte la actividad operativa en datos accionables para decisiones.",
    accent: "from-fuchsia-500/15 via-fuchsia-500/5 to-transparent",
  },
];

export default async function DashboardPage() {
  const now = new Date();

  const [
    totalRentals,
    activeRentals,
    totalCustomers,
    totalEmployees,
    totalVehicles,
    availableVehicles,
    recentRentals,
    overdueRentals,
    activeInspections,
  ] = await Promise.all([
    prisma.rent.count(),
    prisma.rent.count({
      where: {
        returnDate: {
          gte: now,
        },
      },
    }),
    prisma.customer.count(),
    prisma.employee.count({
      where: {
        status: true,
      },
    }),
    prisma.vehicle.count({
      where: {
        status: true,
      },
    }),
    prisma.vehicle.count({
      where: {
        status: true,
        available: true,
      },
    }),
    prisma.rent.findMany({
      take: 5,
      orderBy: {
        rentDate: "desc",
      },
      include: {
        customer: {
          select: {
            name: true,
            apellido: true,
          },
        },
        employee: {
          select: {
            name: true,
            apellido: true,
          },
        },
        vehicle: {
          select: {
            placa: true,
            color: true,
          },
        },
      },
    }),
    prisma.rent.count({
      where: {
        returnDate: {
          lt: now,
        },
      },
    }),
    prisma.inspection.count({
      where: {
        status: {
          in: ["Pendiente", "En proceso", "Activo"],
        },
      },
    }),
  ]);

  const occupiedVehicles = Math.max(totalVehicles - availableVehicles, 0);
  const fleetUtilization = totalVehicles === 0 ? 0 : Math.round((occupiedVehicles / totalVehicles) * 100);
  const averageTicket =
    recentRentals.length === 0
      ? 0
      : recentRentals.reduce((total, rent) => total + rent.days * rent.dailyRate, 0) / recentRentals.length;

  const operationalAlerts = [
    {
      label: "Rentas vencidas por revisar",
      value: overdueRentals,
      tone:
        overdueRentals > 0
          ? "border-rose-200 bg-rose-50 text-rose-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      description:
        overdueRentals > 0
          ? "Hay devoluciones fuera de fecha que requieren seguimiento."
          : "No hay devoluciones vencidas en este momento.",
    },
    {
      label: "Inspecciones pendientes",
      value: activeInspections,
      tone:
        activeInspections > 0
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      description:
        activeInspections > 0
          ? "Conviene cerrar estas inspecciones para mantener trazabilidad."
          : "La cola de inspecciones se encuentra al día.",
    },
    {
      label: "Disponibilidad de flota",
      value: `${availableVehicles}/${totalVehicles}`,
      tone: "border-sky-200 bg-sky-50 text-sky-700",
      description: "Vehículos listos para nuevas reservas en tiempo real.",
    },
  ];

  const summaryCards = [
    {
      title: "Rentas activas",
      value: activeRentals,
      helper: `${totalRentals} registradas históricamente`,
      icon: Activity,
      className: "from-sky-600 via-cyan-500 to-teal-400",
    },
    {
      title: "Clientes",
      value: totalCustomers,
      helper: "Base total disponible",
      icon: Users,
      className: "from-emerald-600 via-lime-500 to-amber-300",
    },
    {
      title: "Flota disponible",
      value: availableVehicles,
      helper: `${fleetUtilization}% de utilización actual`,
      icon: Car,
      className: "from-violet-600 via-fuchsia-500 to-pink-400",
    },
    {
      title: "Equipo activo",
      value: totalEmployees,
      helper: "Empleados habilitados",
      icon: ShieldCheck,
      className: "from-orange-500 via-amber-400 to-yellow-300",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-300/30 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.25),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.2),_transparent_28%)]" />
        <div className="relative grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.25em] text-slate-200">
              Centro de control operativo
            </span>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                El dashboard ahora prioriza métricas operativas, alertas reales y accesos rápidos para la flota.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Este panel concentra disponibilidad, rentas recientes, riesgos operativos y rutas clave para que el equipo
                tome decisiones más rápido.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard/alquileres"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Ver alquileres
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/reportes"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Ir a reportes
              </Link>
            </div>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <div>
              <p className="text-sm text-slate-300">Ingresos estimados recientes</p>
              <p className="mt-2 text-3xl font-semibold">{currencyFormatter.format(averageTicket)}</p>
              <p className="mt-2 text-xs text-slate-400">Promedio de ticket calculado sobre las 5 rentas mas recientes.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Flota ocupada</p>
                <p className="mt-2 text-2xl font-semibold">{occupiedVehicles}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Disponibilidad</p>
                <p className="mt-2 text-2xl font-semibold">{availableVehicles}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition hover:-translate-y-1"
            >
              <div className={`h-1.5 bg-gradient-to-r ${card.className}`} />
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{card.title}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{card.value}</p>
                  </div>
                  <span className="rounded-2xl bg-slate-100 p-3 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="text-sm text-slate-500">{card.helper}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Rentas recientes</h2>
              <p className="mt-1 text-sm text-slate-500">Actividad reciente para seguimiento operativo.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              <ClipboardList className="h-4 w-4" />
              Ultimos movimientos
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {recentRentals.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                Aun no hay rentas registradas para mostrar en el panel principal.
              </div>
            ) : (
              recentRentals.map((rent) => (
                <div
                  key={rent.id}
                  className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-4 md:grid-cols-[1.2fr_0.8fr_0.55fr]"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {rent.customer.name} {rent.customer.apellido}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Vehiculo {rent.vehicle.placa} • Color {rent.vehicle.color}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                      Gestionado por {rent.employee.name} {rent.employee.apellido}
                    </p>
                  </div>

                  <div className="text-sm text-slate-600">
                    <p>Inicio: {dateFormatter.format(rent.rentDate)}</p>
                    <p className="mt-1">Retorno: {dateFormatter.format(rent.returnDate)}</p>
                    <p className="mt-1">Estado: {rent.status}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:justify-center">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
                      {rent.days} dia{rent.days === 1 ? "" : "s"}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      {currencyFormatter.format(rent.days * rent.dailyRate)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Alertas operativas</h2>
                <p className="mt-1 text-sm text-slate-500">Puntos que merecen seguimiento inmediato.</p>
              </div>
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>

            <div className="mt-5 space-y-3">
              {operationalAlerts.map((alert) => (
                <div key={alert.label} className={`rounded-3xl border px-4 py-4 ${alert.tone}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold">{alert.label}</p>
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">{alert.value}</span>
                  </div>
                  <p className="mt-2 text-sm">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Pagos y control</h2>
                <p className="mt-1 text-sm text-slate-500">Ideas directas para la siguiente fase del producto.</p>
              </div>
              <Wallet className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <p className="font-semibold">Cobro recomendado</p>
                <p className="mt-1">
                  Separar reserva, deposito de garantia y pago final ayuda a reducir fraude y simplifica auditoria.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="flex items-center gap-2 font-semibold text-slate-900">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Tokenizar tarjetas, no almacenarlas completas
                </p>
                <p className="mt-1">Usa el proveedor de pagos como custodio de datos sensibles y guarda solo referencias.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${action.accent}`} />
            <div className="relative space-y-3">
              <p className="text-lg font-semibold text-slate-900">{action.title}</p>
              <p className="text-sm leading-6 text-slate-600">{action.description}</p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-900">
                Abrir modulo
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
