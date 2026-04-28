"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
      return;
    }

    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [router, status]);

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_#e0f2fe,_#f8fafc_36%,_#eef2ff_100%)] px-6">
      <div className="w-full max-w-lg rounded-[28px] border border-white/70 bg-white/85 p-8 text-center shadow-xl shadow-slate-200/70 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">RentCar</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Preparando tu sesión</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Estamos validando acceso y disponibilidad del panel principal para redirigirte al módulo correcto.
        </p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-slate-900" />
        </div>
      </div>
    </div>
  );
}
