export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="h-52 animate-pulse rounded-[32px] border border-slate-200 bg-white/80 shadow-lg shadow-slate-200/60" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-[28px] border border-slate-200 bg-white/80 shadow-lg shadow-slate-200/60"
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="h-80 animate-pulse rounded-[28px] border border-slate-200 bg-white/80 shadow-lg shadow-slate-200/60" />
        <div className="space-y-6">
          <div className="h-40 animate-pulse rounded-[28px] border border-slate-200 bg-white/80 shadow-lg shadow-slate-200/60" />
          <div className="h-40 animate-pulse rounded-[28px] border border-slate-200 bg-white/80 shadow-lg shadow-slate-200/60" />
        </div>
      </div>
    </div>
  );
}
