"use client";
import React, { useState, useMemo } from "react";
import {
  Smartphone,
  Sparkles,
  Download,
  Search,
  Check,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Edit2,
  Gift,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Users,
  CreditCard,
  Zap,
  Bell,
  Trophy,
  Percent,
  ChevronLeft,
  ChevronRight,
  Filter,
  DollarSign,
  Layers,
  ArrowUpRight,
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
} from "recharts";
import {
  MOBILE_PAYWALL_CONFIG,
  SUBSCRIBERS_LIST,
  MRR_GROWTH_HISTORY,
  Subscriber,
} from "@/lib/data";
import { useToast, Modal, StatusBadge, EmptyState, FloatingBulkBar } from "../ui";

// User Avatar Component
function SubAvatar({
  name,
  photo,
  initials,
}: {
  name: string;
  photo?: string;
  initials: string;
}) {
  const [imgError, setImgError] = useState(false);

  if (photo && !imgError) {
    return (
      <img
        src={photo}
        alt={name}
        onError={() => setImgError(true)}
        className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200/80 flex-shrink-0"
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
      className={`w-8 h-8 ${color} rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 ring-1 ring-white/60 shadow-xs`}
    >
      {initials}
    </div>
  );
}

// Icon mapper for perks
function getPerkIcon(text: string) {
  const t = text.toLowerCase();
  if (t.includes("ad-free") || t.includes("ad")) return Zap;
  if (t.includes("hint") || t.includes("clue")) return Sparkles;
  if (t.includes("vip hunts") || t.includes("drops")) return Trophy;
  if (t.includes("notification") || t.includes("alert")) return Bell;
  if (t.includes("badge") || t.includes("profile")) return ShieldCheck;
  if (t.includes("bonus") || t.includes("payout") || t.includes("discount")) return Percent;
  return CheckCircle2;
}

export function Subscriptions({
  initialTab = "subscribers",
}: {
  initialTab?: "subscribers" | "payments";
}) {
  const { toast } = useToast();
  const [mounted, setMounted] = React.useState(false);

  // Chart view: MRR vs Subscribers
  const [chartView, setChartView] = useState<"mrr" | "subscribers">("mrr");

  // Filters & Search
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Mobile Paywall Configuration State (Live data syncing with mobile app)
  const [paywallConfig, setPaywallConfig] = useState(MOBILE_PAYWALL_CONFIG);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [editMonthlyPrice, setEditMonthlyPrice] = useState("9.99");
  const [editYearlyPrice, setEditYearlyPrice] = useState("99.99");
  const [editTrialDays, setEditTrialDays] = useState("7");

  // Selected preview plan in simulator
  const [simulatedPlan, setSimulatedPlan] = useState<"monthly" | "yearly">("yearly");

  // Subscribers State
  const [subscribers, setSubscribers] = useState<Subscriber[]>(SUBSCRIBERS_LIST);
  const [selectedSub, setSelectedSub] = useState<Subscriber | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Filter subscribers
  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(search.toLowerCase()) ||
        sub.handle.toLowerCase().includes(search.toLowerCase()) ||
        sub.email.toLowerCase().includes(search.toLowerCase());

      const matchesPlan =
        planFilter === "all" ||
        (planFilter === "yearly" && (sub.plan.includes("Annual") || sub.plan.includes("Yearly"))) ||
        (planFilter === "monthly" && sub.plan.includes("Monthly")) ||
        (planFilter === "trial" && sub.plan.includes("Trial"));

      const matchesStatus =
        statusFilter === "all" || sub.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [subscribers, search, planFilter, statusFilter]);

  // Paginated subscribers
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage) || 1;
  const paginatedSubscribers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSubscribers.slice(start, start + itemsPerPage);
  }, [filteredSubscribers, currentPage, itemsPerPage]);

  // Save Paywall Config
  const handleSavePaywall = (e: React.FormEvent) => {
    e.preventDefault();
    setPaywallConfig((prev) => ({
      ...prev,
      trialDays: Number(editTrialDays),
      plans: {
        ...prev.plans,
        monthly: {
          ...prev.plans.monthly,
          price: Number(editMonthlyPrice),
          priceDisplay: `$${editMonthlyPrice}`,
        },
        yearly: {
          ...prev.plans.yearly,
          price: Number(editYearlyPrice),
          priceDisplay: `$${editYearlyPrice}`,
        },
      },
    }));
    toast("Mobile app paywall pricing updated live! Users will see new rates immediately.", "success");
    setShowConfigModal(false);
  };

  const handleTogglePerk = (id: string) => {
    setPaywallConfig((prev) => {
      const updated = prev.features.map((f) =>
        f.id === id ? { ...f, active: !f.active } : f
      );
      const perkItem = updated.find((f) => f.id === id);
      toast(
        `Perk "${perkItem?.text}" ${perkItem?.active ? "activated" : "disabled"} for mobile app`,
        perkItem?.active ? "success" : "info"
      );
      return { ...prev, features: updated };
    });
  };

  const handleCancelSub = (id: string, name: string) => {
    setSubscribers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Cancelled" as const } : s))
    );
    toast(`Subscription for ${name} cancelled at end of billing cycle.`, "info");
    setSelectedSub(null);
  };

  const handleRefundSub = (id: string, name: string) => {
    toast(`Refund processed for ${name}`, "success");
    setSelectedSub(null);
  };

  const activePerksCount = paywallConfig.features.filter((f) => f.active).length;

  return (
    <div className="space-y-6 animate-fade pb-12">
      {/* ── 1. HEADER & ACTIONS ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[22px] font-black text-stone-900 tracking-tight">
              Subscription Management
            </h1>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live In-App Sync Active
            </span>
          </div>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Subscriptions
          </div>
          <p className="text-xs text-stone-500 font-medium mt-1">
            Configure mobile app paywall plans, toggle live subscriber perks, and manage active VIP hunters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-2 bg-[#132A1C] hover:bg-[#1B3B27] text-[#22C55E] border border-[#22C55E]/40 text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all hover:scale-[1.01]"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>Edit In-App Paywall</span>
          </button>

          <button
            onClick={() => toast("Exporting all active subscribers to CSV format...", "info")}
            className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-[#E6E4DC] text-stone-700 text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all hover:border-stone-300"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Export Subscribers</span>
          </button>
        </div>
      </div>

      {/* ── 2. LIVE SYNC STATUS STRIP ───────────────────────────────────── */}
      <div className="bg-gradient-to-r from-stone-900 via-[#101722] to-[#0B0E14] text-white rounded-2xl p-4 border border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-stone-300 font-medium">Production Mobile App API:</span>
            <code className="bg-white/10 text-emerald-300 px-2 py-0.5 rounded font-mono text-[11px]">
              /api/v1/subscription/paywall
            </code>
          </div>

          <div className="hidden sm:block h-3.5 w-px bg-white/20" />

          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="text-stone-400">Active In-App Tiers:</span>
            <span className="font-bold text-white">
              {paywallConfig.plans.monthly.priceDisplay}/mo & {paywallConfig.plans.yearly.priceDisplay}/yr
            </span>
          </div>

          <div className="hidden sm:block h-3.5 w-px bg-white/20" />

          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="text-stone-400">Trial Period:</span>
            <span className="font-bold text-emerald-400">{paywallConfig.trialDays} Days Free</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400 text-[11px]">Active Perks:</span>
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-md">
            {activePerksCount} of {paywallConfig.features.length} Live in App
          </span>
        </div>
      </div>

      {/* ── 3. MOBILE APP LIVE PAYWALL & PERKS CONTROL ───────────────────── */}
      <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-stone-900">
                Mobile App Live Paywall & VIP Perks
              </h2>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Instant controls for the pricing tiers and perk checklist displayed to users inside the Money Hunt mobile app
            </p>
          </div>

          <button
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 px-3 py-1.5 rounded-xl transition-all self-start sm:self-auto shadow-2xs"
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>Edit Paywall Rates</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Mobile App Paywall Simulator / Tiers (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#FAF9F5] to-white rounded-xl p-4 border border-stone-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  In-App Tier Selector (Live Preview)
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Click to preview</span>
              </div>

              {/* In-App Monthly Option */}
              <div
                onClick={() => setSimulatedPlan("monthly")}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer mb-2.5 flex items-center justify-between ${simulatedPlan === "monthly"
                    ? "border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/10 shadow-xs"
                    : "border-stone-200/80 bg-white hover:border-stone-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${simulatedPlan === "monthly"
                        ? "border-emerald-600 bg-white"
                        : "border-stone-300 bg-transparent"
                      }`}
                  >
                    {simulatedPlan === "monthly" && (
                      <div className="w-2 h-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Monthly Plan</div>
                    <div className="text-[11px] text-stone-400">Billed monthly · Cancel anytime</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-stone-900">
                    {paywallConfig.plans.monthly.priceDisplay}
                  </div>
                  <div className="text-[10px] text-stone-400 font-medium">per month</div>
                </div>
              </div>

              {/* In-App Yearly Option (Best Value) */}
              <div
                onClick={() => setSimulatedPlan("yearly")}
                className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${simulatedPlan === "yearly"
                    ? "border-[#22C55E] bg-emerald-50/50 shadow-sm ring-2 ring-[#22C55E]/15"
                    : "border-stone-200/80 bg-white hover:border-stone-300"
                  }`}
              >
                <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  Best Value · Save 17%
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${simulatedPlan === "yearly"
                        ? "border-[#22C55E] bg-white"
                        : "border-stone-300 bg-transparent"
                      }`}
                  >
                    {simulatedPlan === "yearly" && (
                      <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">Annual VIP Plan</div>
                    <div className="text-[11px] text-stone-400">
                      Billed annually ($8.33/mo equivalent)
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[#15803D]">
                    {paywallConfig.plans.yearly.priceDisplay}
                  </div>
                  <div className="text-[10px] text-stone-400 font-medium">per year</div>
                </div>
              </div>
            </div>

            {/* Trial Note & Paywall CTA */}
            <div className="mt-3 pt-3 border-t border-stone-200/70">
              <div className="flex items-center justify-between text-[11px] bg-stone-100/80 px-3 py-2 rounded-lg text-stone-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{paywallConfig.trialDays}-Day Free Trial Active</span>
                </span>
                <span className="text-emerald-700 font-bold text-[10px] uppercase">
                  Zero Upfront Charge
                </span>
              </div>
            </div>
          </div>

          {/* Right: In-App Perks Checklist & Toggle (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FAF9F5] rounded-xl p-4 border border-stone-200/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Mobile Paywall Perks Checklist
                  </span>
                  <p className="text-[11px] text-stone-400 mt-0.5">
                    Click any perk below to instantly toggle visibility in the mobile app paywall
                  </p>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-md flex-shrink-0">
                  {activePerksCount} of {paywallConfig.features.length} Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {paywallConfig.features.map((perk) => {
                  const PerkIcon = getPerkIcon(perk.text);
                  return (
                    <div
                      key={perk.id}
                      onClick={() => handleTogglePerk(perk.id)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all cursor-pointer group shadow-2xs ${perk.active
                          ? "bg-white border-stone-200/90 hover:border-emerald-300 hover:shadow-xs"
                          : "bg-stone-100/60 border-stone-200/40 opacity-60 hover:opacity-80"
                        }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${perk.active
                            ? "bg-[#22C55E] text-white shadow-2xs"
                            : "bg-stone-200 text-stone-400"
                          }`}
                      >
                        <PerkIcon className="w-3.5 h-3.5 stroke-[2.2]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span
                          className={`text-xs font-semibold leading-snug line-clamp-1 ${perk.active ? "text-stone-800 group-hover:text-stone-900" : "text-stone-400 line-through"
                            }`}
                        >
                          {perk.text}
                        </span>
                        <div className="text-[10px] text-stone-400">
                          {perk.active ? "Enabled for app users" : "Disabled"}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div
                          className={`w-7 h-4 rounded-full transition-colors relative p-0.5 ${perk.active ? "bg-[#22C55E]" : "bg-stone-300"
                            }`}
                        >
                          <div
                            className={`w-3 h-3 rounded-full bg-white transition-transform ${perk.active ? "translate-x-3" : "translate-x-0"
                              }`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Changes take effect on mobile app launch immediately</span>
              </span>
              <span className="font-mono text-emerald-700 font-semibold text-[10px]">
                Endpoint: 200 OK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. CHARTS SECTION (Kept as requested: "bortoman a j chart ase seta rakho") ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* MRR & Subscriber Growth Trajectory (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-stone-900">
                  Recurring Revenue & Subscriber Trajectory
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Compounded growth over 10 active months · +12.1% MoM
              </p>
            </div>

            <div className="flex items-center bg-[#F2F0E9] p-0.5 rounded-lg border border-stone-200/60">
              <button
                onClick={() => setChartView("mrr")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${chartView === "mrr"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                  }`}
              >
                Revenue ($MRR)
              </button>
              <button
                onClick={() => setChartView("subscribers")}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${chartView === "subscribers"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                  }`}
              >
                Active Subs
              </button>
            </div>
          </div>

          <div className="h-56 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={MRR_GROWTH_HISTORY}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="subEmeraldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F0EA" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#A8A29E" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "#A8A29E" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      chartView === "mrr" ? `$${(v / 1000).toFixed(0)}k` : `${(v / 1000).toFixed(1)}k`
                    }
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
                    formatter={(val: number) => [
                      chartView === "mrr" ? `$${val.toLocaleString()}` : val.toLocaleString(),
                      chartView === "mrr" ? "Monthly Revenue" : "Active Subs",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey={chartView === "mrr" ? "mrr" : "subscribers"}
                    stroke="#22C55E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#subEmeraldGrad)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Revenue Contribution Donut (1 Col) */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-stone-900">Revenue Contribution</h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                63% Yearly
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-2">Breakdown of $61,720 MRR by active tier</p>

            <div className="h-40 w-full relative flex items-center justify-center">
              {mounted && (
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Yearly ($99.99/yr)", value: 38923, fill: "#22C55E" },
                        { name: "Monthly ($9.99/mo)", value: 22797, fill: "#3B82F6" },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={46}
                      outerRadius={68}
                      paddingAngle={3}
                      dataKey="value"
                      isAnimationActive={false}
                    >
                      <Cell fill="#22C55E" stroke="transparent" />
                      <Cell fill="#3B82F6" stroke="transparent" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0D1117",
                        border: "none",
                        borderRadius: "8px",
                        color: "#FFFFFF",
                        fontSize: "12px",
                      }}
                      formatter={(v: number) => [`$${v.toLocaleString()}`, "MRR"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  Total Subs
                </span>
                <span className="text-base font-black text-stone-900">6,172</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                Yearly Tier ($99.99/yr)
              </span>
              <span className="font-bold text-stone-900">63% ($38.9k)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-stone-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                Monthly Tier ($9.99/mo)
              </span>
              <span className="font-bold text-stone-900">37% ($22.8k)</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. SUBSCRIBERS DIRECTORY (Clean, dedicated table) ──────────── */}
      <div className="bg-white rounded-2xl border border-[#EAE8E1] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-stone-900">
                Paid Subscribers Directory
              </h2>
              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                {filteredSubscribers.length} total
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Active VIP hunters, billing cycles, next renewals, and account management
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="flex items-center gap-2 bg-stone-50 border border-stone-200/80 rounded-xl px-3 py-1.5 w-64 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all">
              <Search className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search hunter, email, handle..."
                className="text-xs bg-transparent border-none outline-none w-full text-stone-800 placeholder:text-stone-400"
              />
            </div>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs font-semibold bg-stone-50 border border-stone-200/80 rounded-xl px-3 py-1.5 text-stone-700 outline-none cursor-pointer hover:border-stone-300"
            >
              <option value="all">All Plans</option>
              <option value="yearly">Yearly ($99.99)</option>
              <option value="monthly">Monthly ($9.99)</option>
              <option value="trial">7-Day Trial</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs font-semibold bg-stone-50 border border-stone-200/80 rounded-xl px-3 py-1.5 text-stone-700 outline-none cursor-pointer hover:border-stone-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="past due">Past Due</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/70 border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === paginatedSubscribers.length && paginatedSubscribers.length > 0}
                    onChange={() => {
                      if (selectedIds.length === paginatedSubscribers.length) {
                        setSelectedIds([]);
                      } else {
                        setSelectedIds(paginatedSubscribers.map((s) => s.id));
                      }
                    }}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                  />
                </th>
                <th className="py-3 px-4">Subscriber</th>
                <th className="py-3 px-4">In-App Plan</th>
                <th className="py-3 px-4">Billing Rate</th>
                <th className="py-3 px-4">Next Renewal</th>
                <th className="py-3 px-4">Total LTV</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              {paginatedSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6">
                    <EmptyState
                      icon="👥"
                      title="No subscribers found"
                      subtitle="Try adjusting your search query or status filter."
                      actionLabel="Clear Filters"
                      onAction={() => {
                        setSearch("");
                        setPlanFilter("all");
                        setStatusFilter("all");
                      }}
                    />
                  </td>
                </tr>
              ) : (
                paginatedSubscribers.map((sub) => {
                  const isChecked = selectedIds.includes(sub.id);
                  return (
                    <tr
                      key={sub.id}
                      className={`group hover:bg-[#F9FAFB] transition-colors cursor-pointer ${
                        isChecked ? "bg-emerald-50/30" : ""
                      }`}
                      onClick={() => setSelectedSub(sub)}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-3 w-10" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedIds((prev) =>
                              prev.includes(sub.id)
                                ? prev.filter((i) => i !== sub.id)
                                : [...prev, sub.id]
                            );
                          }}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                        />
                      </td>

                      {/* Subscriber Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <SubAvatar
                            name={sub.name}
                            photo={sub.photo}
                            initials={sub.avatar}
                          />
                          <div>
                            <div className="font-bold text-stone-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                              <span>{sub.name}</span>
                              <span className="text-[11px] font-normal text-stone-400">
                                {sub.handle}
                              </span>
                            </div>
                            <div className="text-[11px] text-stone-400">{sub.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] ${
                            sub.plan.includes("Annual") || sub.plan.includes("Yearly")
                              ? "bg-amber-50 text-amber-700 border border-amber-200/70"
                              : sub.plan.includes("Monthly")
                              ? "bg-blue-50 text-blue-700 border border-blue-200/70"
                              : "bg-stone-100 text-stone-600 border border-stone-200"
                          }`}
                        >
                          {sub.plan.includes("Annual") ? "Yearly ($99.99)" : sub.plan}
                        </span>
                      </td>

                      {/* Billing Rate */}
                      <td className="py-3 px-4 font-bold text-stone-900">
                        {sub.billingAmount.replace("$89.99", "$99.99")}
                      </td>

                      {/* Next Renewal */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-stone-700">{sub.nextBilling}</div>
                        <div className="text-[10px] text-stone-400">{sub.paymentMethod}</div>
                      </td>

                      {/* LTV */}
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {sub.ltv}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <StatusBadge status={sub.status} />
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 inline-block">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSub(sub);
                            }}
                            className="bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs font-bold px-3 py-1 rounded-lg transition-colors shadow-2xs cursor-pointer"
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── RULE 4: FLOATING BULK BAR ── */}
        <FloatingBulkBar
          selectedCount={selectedIds.length}
          itemLabel="subscriber"
          onClear={() => setSelectedIds([])}
          actions={[
            {
              label: "Export Selected",
              variant: "outline",
              onClick: () => {
                toast(`Exported ${selectedIds.length} subscriber records to CSV`, "success");
                setSelectedIds([]);
              },
            },
            {
              label: "Send Renewal Reminder",
              variant: "green",
              onClick: () => {
                toast(`Sent renewal emails to ${selectedIds.length} subscribers`, "success");
                setSelectedIds([]);
              },
            },
          ]}
        />

        {/* Pagination Bar */}
        {filteredSubscribers.length > 0 && (
          <div className="p-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <div>
              Showing <span className="font-semibold text-stone-800">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-semibold text-stone-800">
                {Math.min(currentPage * itemsPerPage, filteredSubscribers.length)}
              </span>{" "}
              of <span className="font-semibold text-stone-800">{filteredSubscribers.length}</span> subscribers
            </div>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${currentPage === idx + 1
                      ? "bg-stone-900 text-white shadow-2xs"
                      : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
                    }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── 6. MODAL: EDIT MOBILE APP PAYWALL & RATES ─────────────────── */}
      <Modal
        open={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Edit Mobile App Paywall & Live Pricing"
      >
        <form onSubmit={handleSavePaywall} className="space-y-4 text-xs">
          <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-emerald-800 text-[11px] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Changes made here are synced to the mobile app paywall modal in real time.</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Monthly Tier Price ($/mo)
              </label>
              <input
                required
                type="number"
                step="0.01"
                value={editMonthlyPrice}
                onChange={(e) => setEditMonthlyPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-bold text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Annual VIP Price ($/yr)
              </label>
              <input
                required
                type="number"
                step="0.01"
                value={editYearlyPrice}
                onChange={(e) => setEditYearlyPrice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-bold text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Free Trial Duration (Days)
            </label>
            <input
              required
              type="number"
              value={editTrialDays}
              onChange={(e) => setEditTrialDays(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-bold text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-2">
              Live In-App Perks (Check to activate on mobile paywall)
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {paywallConfig.features.map((f) => (
                <label
                  key={f.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200/60 cursor-pointer hover:bg-stone-100/70"
                >
                  <span className="text-xs font-medium text-stone-800">{f.text}</span>
                  <input
                    type="checkbox"
                    checked={f.active}
                    onChange={() => handleTogglePerk(f.id)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setShowConfigModal(false)}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold transition-all shadow-xs"
            >
              Save & Publish to App
            </button>
          </div>
        </form>
      </Modal>

      {/* ── 7. MODAL: MANAGE SUBSCRIBER ─────────────────────────────── */}
      <Modal
        open={!!selectedSub}
        onClose={() => setSelectedSub(null)}
        title="Manage Subscriber Account"
      >
        {selectedSub && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3.5 p-4 bg-stone-50 rounded-2xl border border-stone-200/60">
              <SubAvatar
                name={selectedSub.name}
                photo={selectedSub.photo}
                initials={selectedSub.avatar}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-stone-900">{selectedSub.name}</div>
                <div className="text-xs text-stone-500">
                  {selectedSub.handle} · {selectedSub.email}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-md text-[11px]">
                    {selectedSub.plan}
                  </span>
                  <span className="text-xs font-semibold text-stone-600">
                    LTV: {selectedSub.ltv}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/50">
                <span className="text-stone-400 block mb-0.5">Billing Rate</span>
                <span className="font-bold text-stone-900 text-sm">
                  {selectedSub.billingAmount.replace("$89.99", "$99.99")}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/50">
                <span className="text-stone-400 block mb-0.5">Payment Method</span>
                <span className="font-bold text-stone-900 truncate block">
                  {selectedSub.paymentMethod}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="font-bold text-stone-700">Quick Actions</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toast(`Added 1 Month Free VIP bonus to ${selectedSub.name}`, "success")}
                  className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Gift className="w-3.5 h-3.5 text-emerald-600" />
                  Grant 1 Mo VIP
                </button>
                <button
                  onClick={() => handleRefundSub(selectedSub.id, selectedSub.name)}
                  className="p-2.5 rounded-xl border border-stone-200 bg-white text-stone-700 font-bold hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                  Issue Refund
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-100">
              <button
                onClick={() => handleCancelSub(selectedSub.id, selectedSub.name)}
                className="font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" />
                Cancel Plan
              </button>
              <button
                onClick={() => setSelectedSub(null)}
                className="font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-4 py-1.5 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
