"use client";
import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  CreditCard,
  MapPin,
  Flag,
  Tag,
  Trophy,
  DollarSign,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import {
  STATS,
  USER_GROWTH_DATA,
  HUNTS_ENGAGEMENT_DATA,
  DROPS_ENGAGEMENT_DATA,
  REVENUE_BREAKDOWN_DATA,
  LIVE_DROPS_DATA,
  PENDING_VERIFICATIONS_DATA,
  RECENT_WINNERS_DATA,
  RECENT_REGISTRATIONS_DATA,
} from "@/lib/data";
import { useToast, Modal } from "../ui";

// User Avatar component with fallback
function UserAvatar({
  name,
  photo,
  initials,
  size = "md",
}: {
  name: string;
  photo?: string;
  initials: string;
  size?: "sm" | "md" | "lg";
}) {
  const [imgError, setImgError] = useState(false);
  const szCls =
    size === "sm"
      ? "w-8 h-8 text-[11px]"
      : size === "lg"
        ? "w-11 h-11 text-sm"
        : "w-8 h-8 text-xs";

  if (photo && !imgError) {
    return (
      <img
        src={photo}
        alt={name}
        onError={() => setImgError(true)}
        className={`${szCls} rounded-full object-cover ring-1 ring-stone-200/80 flex-shrink-0`}
      />
    );
  }

  const colors = [
    "bg-emerald-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-amber-600",
    "bg-rose-500",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];

  return (
    <div
      className={`${szCls} ${color} rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 ring-1 ring-white/60`}
    >
      {initials}
    </div>
  );
}

// Mini Sparkline component (40px wide, 5-point line graph, color matches card theme)
function Sparkline({
  data,
  color,
  width = 40,
  height = 18,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;
  const h = height - padding * 2;
  const w = width - padding * 2;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * w;
    const y = height - padding - ((val - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg width={width} height={height} className="overflow-visible flex-shrink-0">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(" ")}
      />
    </svg>
  );
}

export function Dashboard({ onNav }: { onNav: (id: string) => void }) {
  const { toast } = useToast();
  const [mounted, setMounted] = React.useState(false);
  const [timeRange, setTimeRange] = useState<"30d" | "quarter" | "year">("30d");
  const [chartMetric, setChartMetric] = useState<"users" | "hunts" | "drops">("users");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Review modal state for pending winners
  const [selectedReview, setSelectedReview] = useState<{
    id: string;
    name: string;
    hunt: string;
    amount: string;
    avatar: string;
    photo?: string;
  } | null>(null);

  const [liveDrops] = useState(LIVE_DROPS_DATA);
  const [pendingList, setPendingList] = useState(PENDING_VERIFICATIONS_DATA);

  // Growth chart dataset selection
  const growthData =
    chartMetric === "users"
      ? USER_GROWTH_DATA
      : chartMetric === "hunts"
        ? HUNTS_ENGAGEMENT_DATA
        : DROPS_ENGAGEMENT_DATA;

  // Handle Review Actions
  const handleApprove = (id: string, name: string, amount: string) => {
    setPendingList((prev) => prev.filter((item) => item.id !== id));
    toast(`Verified & approved ${name}'s ${amount} reward!`, "success");
    setSelectedReview(null);
  };

  const handleReject = (id: string, name: string) => {
    setPendingList((prev) => prev.filter((item) => item.id !== id));
    toast(`Reward verification rejected for ${name}`, "error");
    setSelectedReview(null);
  };

  // Top 8 Stat Cards Configuration with 40px 5-point sparklines
  const statCards = [
    {
      id: "users",
      icon: Users,
      iconBg: "bg-[#EBF7EE] text-[#16A34A]",
      label: "Total Users",
      value: "58,412",
      change: "+8.2%",
      isUp: true,
      sparkline: [12, 16, 14, 20, 24],
      sparklineColor: "#16A34A",
      onClick: () => onNav("users"),
    },
    {
      id: "active-users",
      icon: TrendingUp,
      iconBg: "bg-[#EFF6FF] text-[#2563EB]",
      label: "Active Users (30d)",
      value: "31,904",
      change: "+4.6%",
      isUp: true,
      sparkline: [14, 15, 13, 17, 19],
      sparklineColor: "#2563EB",
      onClick: () => onNav("analytics"),
    },
    {
      id: "premium-members",
      icon: CreditCard,
      iconBg: "bg-[#FFFBEB] text-[#D97706]",
      label: "Premium Members",
      value: "6,172",
      change: "+12.1%",
      isUp: true,
      sparkline: [10, 13, 14, 18, 22],
      sparklineColor: "#D97706",
      onClick: () => onNav("subscriptions"),
    },
    {
      id: "active-hunts",
      icon: MapPin,
      iconBg: "bg-[#EBF7EE] text-[#16A34A]",
      label: "Active Hunts",
      value: "18",
      change: "+2",
      isUp: true,
      sparkline: [8, 11, 10, 14, 16],
      sparklineColor: "#16A34A",
      onClick: () => onNav("hunts"),
    },
    {
      id: "live-drops",
      icon: Flag,
      iconBg: "bg-[#F5F5F4] text-[#78716C]",
      label: "Live Drops",
      value: "3",
      change: "-1",
      isUp: false,
      sparkline: [18, 15, 16, 12, 10],
      sparklineColor: "#EF4444",
      onClick: () => onNav("hunts"),
    },
    {
      id: "total-deals",
      icon: Tag,
      iconBg: "bg-[#EEF2FF] text-[#4F46E5]",
      label: "Total Deals",
      value: "214",
      change: "+9",
      isUp: true,
      sparkline: [11, 13, 12, 16, 18],
      sparklineColor: "#4F46E5",
      onClick: () => onNav("deals"),
    },
    {
      id: "rewards-paid",
      icon: Trophy,
      iconBg: "bg-[#EBF7EE] text-[#16A34A]",
      label: "Rewards Paid",
      value: "$142,880",
      change: "+15.4%",
      isUp: true,
      sparkline: [9, 13, 12, 17, 21],
      sparklineColor: "#16A34A",
      onClick: () => onNav("winners"),
    },
    {
      id: "total-revenue",
      icon: DollarSign,
      iconBg: "bg-[#FFFBEB] text-[#D97706]",
      label: "Total Revenue",
      value: "$389,204",
      change: "+8.9%",
      isUp: true,
      sparkline: [10, 14, 13, 18, 20],
      sparklineColor: "#D97706",
      onClick: () => onNav("payments"),
    },
  ];

  return (
    <div className="space-y-5 animate-fade pb-10">
      {/* ── DASHBOARD HEADER ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-black text-stone-900 tracking-tight">
            Dashboard
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Dashboard
          </div>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Live overview of the Money Hunt platform
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Timeframe Filter Tabs */}
          <div className="flex items-center bg-[#EFECE4] p-1 rounded-xl border border-stone-200/80">
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === "30d"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
                }`}
            >
              Last 30 days
            </button>
            <button
              onClick={() => setTimeRange("quarter")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === "quarter"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
                }`}
            >
              This Quarter
            </button>
            <button
              onClick={() => setTimeRange("year")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === "year"
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-900"
                }`}
            >
              This Year
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={() => toast("Exporting platform summary to CSV...", "info")}
            className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-[#E6E4DC] text-stone-700 text-xs font-bold px-3 py-2 rounded-xl shadow-sm transition-all hover:border-stone-300"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* ── 8 STAT CARDS (2 rows of 4 with 40px sparklines) ─────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              onClick={c.onClick}
              className="bg-white rounded-2xl border border-[#EAE8E1] p-4 hover:border-stone-300 hover:shadow-sm transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={`w-8 h-8 rounded-lg ${c.iconBg} flex items-center justify-center transition-transform group-hover:scale-105 duration-200`}
                >
                  <Icon className="w-4 h-4" strokeWidth={2.2} />
                </div>
                {/* Right side: 40px 5-point sparkline + change badge */}
                <div className="flex items-center gap-2">
                  <Sparkline
                    data={c.sparkline}
                    color={c.sparklineColor}
                    width={40}
                    height={18}
                  />
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${c.isUp
                        ? "bg-[#DCFCE7] text-[#15803D]"
                        : "bg-[#FEE2E2] text-[#B91C1C]"
                      }`}
                  >
                    {c.isUp ? "↑" : "↓"} {c.change}
                  </span>
                </div>
              </div>
              <div className="text-[12px] text-stone-500 font-medium mb-1">
                {c.label}
              </div>
              <div className="text-[22px] font-black text-stone-900 tracking-tight leading-tight">
                {c.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ADDITION 3: QUICK ACTIONS ROW ───────────────────────── */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 custom-scrollbar">
        <button
          onClick={() => onNav("hunts")}
          className="bg-white border border-[#E5E7EB] hover:border-[#22C55E] hover:text-[#22C55E] text-stone-700 font-bold text-xs px-4 py-2 rounded-full transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <span>🎯</span>
          <span className="tracking-tight group-hover:text-[#22C55E] transition-colors">Drop New Hunt</span>
        </button>

        <button
          onClick={() => onNav("notifications")}
          className="bg-white border border-[#E5E7EB] hover:border-[#22C55E] hover:text-[#22C55E] text-stone-700 font-bold text-xs px-4 py-2 rounded-full transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <span>📢</span>
          <span className="tracking-tight group-hover:text-[#22C55E] transition-colors">Send Notification</span>
        </button>

        <button
          onClick={() => onNav("winners")}
          className="bg-white border border-[#E5E7EB] hover:border-[#22C55E] hover:text-[#22C55E] text-stone-700 font-bold text-xs px-4 py-2 rounded-full transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <span>🏆</span>
          <span className="tracking-tight group-hover:text-[#22C55E] transition-colors">Verify Winner</span>
        </button>

        <button
          onClick={() => onNav("sweepstakes")}
          className="bg-white border border-[#E5E7EB] hover:border-[#22C55E] hover:text-[#22C55E] text-stone-700 font-bold text-xs px-4 py-2 rounded-full transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <span>🎰</span>
          <span className="tracking-tight group-hover:text-[#22C55E] transition-colors">Draw Sweepstakes</span>
        </button>

        <button
          onClick={() => toast("Generating & exporting executive analytics report (CSV)...", "info")}
          className="bg-white border border-[#E5E7EB] hover:border-[#22C55E] hover:text-[#22C55E] text-stone-700 font-bold text-xs px-4 py-2 rounded-full transition-all duration-150 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center gap-2 flex-shrink-0 cursor-pointer group"
        >
          <span>📊</span>
          <span className="tracking-tight group-hover:text-[#22C55E] transition-colors">Export Report</span>
        </button>
      </div>

      {/* ── MIDDLE CHARTS ROW 1 ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* User Growth & Engagement Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                User Growth & Engagement
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                New signups vs. daily active users
              </p>
            </div>

            {/* Toggle: Users / Hunts / Drops */}
            <div className="flex items-center bg-[#F2F0E9] p-0.5 rounded-lg border border-stone-200/60">
              {(["users", "hunts", "drops"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setChartMetric(mode)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold capitalize transition-all ${chartMetric === mode
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-500 hover:text-stone-800"
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="h-56 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F0EA" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "#A8A29E" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#A8A29E" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0D1117",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      color: "#FFFFFF",
                      fontSize: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.4)",
                    }}
                    formatter={(value: number, name: string) => [
                      value.toLocaleString(),
                      name === "dau" ? "Daily Active Hunters" : "New Signups",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="dau"
                    stroke="#0EA5E9"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#blueGrad)"
                    isAnimationActive={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="signups"
                    stroke="#22C55E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#emeraldGrad)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="flex items-center justify-center gap-6 mt-2 pt-2 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <span className="text-xs font-semibold text-stone-600">New Signups</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
              <span className="text-xs font-semibold text-stone-600">Daily Active Hunters</span>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown Card */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-stone-900">Revenue Breakdown</h3>
              <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                ↑ +8.9%
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-2">Last 30 days</p>

            <div className="h-44 w-full relative flex items-center justify-center">
              {mounted && (
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie
                      data={REVENUE_BREAKDOWN_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="amount"
                      isAnimationActive={false}
                    >
                      {REVENUE_BREAKDOWN_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0D1117",
                        border: "none",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                      formatter={(val: number) => [`$${val.toLocaleString()}`, "Revenue"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Total
                </span>
                <span className="text-base font-black text-stone-900">$389.2k</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-stone-100">
            {REVENUE_BREAKDOWN_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="font-medium text-stone-600">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900">
                    ${(item.amount / 1000).toFixed(1)}k
                  </span>
                  <span className="text-[11px] text-stone-400 w-8 text-right font-medium">
                    {item.pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MIDDLE CHARTS ROW 2 (3 Cards) ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* Deal Redemptions Card */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-bold text-stone-900">Deal Redemptions</h3>
            <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
              +14.2%
            </span>
          </div>
          <div className="text-xl font-black text-stone-900 mb-0.5">14,892</div>
          <p className="text-[11px] text-stone-400 mb-3">Partner discounts claimed this month</p>
          <div className="space-y-2">
            {[
              { label: "Food & Drinks", count: "6,420", pct: 45, color: "#22C55E" },
              { label: "Coffee Shops", count: "4,110", pct: 28, color: "#F59E0B" },
              { label: "Fitness & Gyms", count: "2,630", pct: 18, color: "#3B82F6" },
              { label: "Retail & Merch", count: "1,732", pct: 9, color: "#8B5CF6" },
            ].map((d) => (
              <div key={d.label}>
                <div className="flex justify-between text-[11px] font-medium text-stone-500 mb-0.5">
                  <span>{d.label}</span>
                  <span className="font-bold text-stone-800">{d.count}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${d.pct}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Membership Revenue Card */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-bold text-stone-900">Membership Revenue</h3>
            <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
              +12.1%
            </span>
          </div>
          <div className="text-xl font-black text-stone-900 mb-0.5">$61,720</div>
          <p className="text-[11px] text-stone-400 mb-3">Monthly Recurring Revenue (MRR)</p>
          <div className="space-y-2.5">
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-900">Annual Tier ($89/yr)</div>
                <div className="text-[11px] text-amber-700">3,890 active subscribers</div>
              </div>
              <div className="text-sm font-black text-amber-900">63%</div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-900">Monthly Tier ($9.99/mo)</div>
                <div className="text-[11px] text-emerald-700">2,282 active subscribers</div>
              </div>
              <div className="text-sm font-black text-emerald-900">37%</div>
            </div>
          </div>
        </div>

        {/* Rewards Distribution Card */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-sm font-bold text-stone-900">Rewards Distribution</h3>
            <span className="text-[11px] font-bold text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
              +15.4%
            </span>
          </div>
          <div className="text-xl font-black text-stone-900 mb-0.5">$142,880</div>
          <p className="text-[11px] text-stone-400 mb-3">Total rewards payout to 1,420 hunters</p>
          <div className="space-y-2">
            {[
              { label: "Cash Drops", value: "$97,158", pct: "68%", color: "bg-emerald-500" },
              { label: "Partner Deals & Perks", value: "$31,434", pct: "22%", color: "bg-blue-500" },
              { label: "Weekly Sweepstakes", value: "$14,288", pct: "10%", color: "bg-amber-500" },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                  <span className="font-medium text-stone-600">{r.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900">{r.value}</span>
                  <span className="text-[11px] text-stone-400">({r.pct})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LIVE OPERATIONS SECTION ──────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-stone-900">
            Live Operations
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22C55E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
            1,247 hunters active now
          </span>
        </div>

        {/* ── ADDITION 2: UPGRADED DARK LIVE HUNT CARD (Green Glow + Sub-stat) ── */}
        <div
          className="bg-[#0B0E14] text-white rounded-2xl p-5 border border-stone-800 relative overflow-hidden mb-4 transition-all"
          style={{ boxShadow: "0 0 40px rgba(34,197,94,0.15)" }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    LIVE DROP ACTIVE
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    Drop ID: #183
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22C55E] ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    1,247 hunters active now
                  </span>
                </div>
                <h3 className="text-lg font-black text-white tracking-tight">
                  Downtown Manhattan
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    Manhattan
                  </span>
                  <span>•</span>
                  <span>Radius: 0.25 mi</span>
                  <span>•</span>
                  <span>Coordinates: 40.7074°N</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast("Broadcasted +30 Min Clue notification to active hunters!", "info")}
                  className="bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-bold px-3 py-1.5 rounded-xl transition-all"
                >
                  +30 Min Clue
                </button>
                <button
                  onClick={() => onNav("hunts")}
                  className="bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs transition-all"
                >
                  View on Radar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3.5">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Cash Prize</div>
                <div className="text-xl font-black text-emerald-400 mt-0.5">$500</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Hunters Searching</div>
                <div className="text-xl font-black text-white mt-0.5">1,247</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Beacon Range</div>
                <div className="text-xl font-black text-white mt-0.5">0.25 mi</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Time Elapsed</div>
                <div className="text-xl font-black text-amber-400 mt-0.5">38m 20s</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {/* LEFT COLUMN: Currently Live Drops & Pending Reward Verification */}
          <div className="space-y-3.5">
            {/* Currently Live Drops Card */}
            <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-stone-900">
                  Currently Live Drops
                </h3>
                <span className="inline-flex items-center gap-1.5 bg-[#DCFCE7] text-[#15803D] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
                  2 Live
                </span>
              </div>

              <div className="space-y-2">
                {liveDrops.map((drop) => {
                  const isLive = drop.status === "Live";
                  return (
                    <div
                      key={drop.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50/80 transition-colors border border-transparent hover:border-stone-200/60"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isLive
                              ? "bg-[#EBF7EE] text-[#16A34A]"
                              : "bg-[#F5F5F4] text-[#78716C]"
                            }`}
                        >
                          <Flag className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[13px] font-bold text-stone-900">
                            {drop.location}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {drop.huntName} · {drop.prize} · {drop.claims}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${isLive
                            ? "bg-[#DCFCE7] text-[#15803D]"
                            : "bg-[#FEE2E2] text-[#B91C1C]"
                          }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {drop.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pending Reward Verification Card */}
            <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-stone-900">
                  Pending Reward Verification
                </h3>
                <span className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#D97706] text-xs font-bold px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                  {pendingList.length} Pending
                </span>
              </div>

              {pendingList.length === 0 ? (
                <div className="text-center py-5 text-stone-400 text-xs font-medium">
                  ✓ All rewards have been verified and settled!
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingList.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50/80 transition-colors border border-transparent hover:border-stone-200/60"
                    >
                      <div className="flex items-center gap-2.5">
                        <UserAvatar
                          name={item.name}
                          photo={item.photo}
                          initials={item.avatar}
                        />
                        <div>
                          <div className="text-[13px] font-bold text-stone-900">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {item.hunt} · won{" "}
                            <span className="font-semibold text-stone-700">
                              {item.amount}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedReview(item)}
                        className="bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 border border-[#E6E4DC] hover:border-stone-300 text-xs font-bold px-3 py-1 rounded-xl shadow-sm transition-all"
                      >
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Recent Winners & Recent User Registrations */}
          <div className="space-y-3.5">
            {/* Recent Winners Card */}
            <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-stone-900">
                  Recent Winners
                </h3>
              </div>

              <div className="space-y-2">
                {RECENT_WINNERS_DATA.map((winner) => (
                  <div
                    key={winner.id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50/80 transition-colors border border-transparent hover:border-stone-200/60"
                  >
                    <div className="flex items-center gap-2.5">
                      <UserAvatar
                        name={winner.name}
                        photo={winner.photo}
                        initials={winner.avatar}
                      />
                      <div>
                        <div className="text-[13px] font-bold text-stone-900">
                          {winner.name}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          {winner.hunt} · {winner.date}
                        </div>
                      </div>
                    </div>

                    <span className="text-[#16A34A] font-extrabold text-base tracking-tight">
                      {winner.prize}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent User Registrations Card */}
            <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-stone-900">
                  Recent User Registrations
                </h3>
              </div>

              <div className="space-y-2">
                {RECENT_REGISTRATIONS_DATA.map((user) => {
                  const isPremium = user.plan === "Premium";
                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50/80 transition-colors border border-transparent hover:border-stone-200/60"
                    >
                      <div className="flex items-center gap-2.5">
                        <UserAvatar
                          name={user.name}
                          photo={user.photo}
                          initials={user.avatar}
                        />
                        <div>
                          <div className="text-[13px] font-bold text-stone-900">
                            {user.name}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-0.5">
                            {user.location} · joined {user.date}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${isPremium
                            ? "bg-[#FEF3C7] text-[#D97706]"
                            : "bg-[#F3F4F6] text-[#6B7280]"
                          }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {user.plan}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL: REVIEW PENDING REWARD ─────────────────────────── */}
      <Modal
        open={!!selectedReview}
        onClose={() => setSelectedReview(null)}
        title="Verify Hunt Winner Claim"
      >
        {selectedReview && (
          <div className="space-y-4">
            <div className="flex items-center gap-3.5 p-4 bg-stone-50 rounded-2xl border border-stone-200/60">
              <UserAvatar
                name={selectedReview.name}
                photo={selectedReview.photo}
                initials={selectedReview.avatar}
                size="lg"
              />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-stone-900">
                  {selectedReview.name}
                </h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Drop: {selectedReview.hunt}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-semibold text-stone-600">
                    Prize Amount:
                  </span>
                  <span className="text-base font-extrabold text-emerald-600">
                    {selectedReview.amount}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-200/50 rounded-xl p-3 text-xs text-emerald-800 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                GPS Verification Successful
              </div>
              <p className="text-[11px] leading-relaxed">
                Hunter scanned QR token at exact drop coordinates (accuracy within 4
                meters). Timestamp checked against server clock.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3">
              <button
                onClick={() => handleReject(selectedReview.id, selectedReview.name)}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject Claim
              </button>
              <button
                onClick={() =>
                  handleApprove(
                    selectedReview.id,
                    selectedReview.name,
                    selectedReview.amount
                  )
                }
                className="flex items-center gap-1 text-xs font-bold text-white bg-[#22C55E] hover:bg-[#16A34A] px-5 py-2 rounded-xl shadow-sm transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verify & Approve Payout
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
