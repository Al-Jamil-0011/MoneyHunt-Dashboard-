"use client";
import React, { useState, useEffect } from "react";
import {
  Ticket,
  Users,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  Search,
  Download,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Mail,
  Gem,
  Star,
  Check,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  FileText,
  Filter,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { useToast, Modal, StatusBadge, EmptyState, FloatingBulkBar, ActionButton } from "../ui";

// Helper for User Avatar initials
function HunterAvatar({ name, initials, color }: { name: string; initials: string; color?: string }) {
  const bgColors = [
    "bg-emerald-600",
    "bg-blue-600",
    "bg-purple-600",
    "bg-amber-600",
    "bg-rose-500",
  ];
  const bg = color || bgColors[name.charCodeAt(0) % bgColors.length];

  return (
    <div
      className={`w-7 h-7 ${bg} rounded-full flex items-center justify-center font-bold text-white text-[11px] flex-shrink-0 ring-1 ring-white/60 shadow-2xs`}
    >
      {initials}
    </div>
  );
}

export function Sweepstakes() {
  const { toast } = useToast();

  // ── Modals State ───────────────────────────────────────────────
  const [showNewModal, setShowNewModal] = useState(false);
  const [showEntryLogModal, setShowEntryLogModal] = useState(false);
  const [showDrawWinnerModal, setShowDrawWinnerModal] = useState(false);
  const [showAutoDrawModal, setShowAutoDrawModal] = useState(false);
  const [showMailInModal, setShowMailInModal] = useState(false);
  const [selectedHistoryIds, setSelectedHistoryIds] = useState<string[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<any | null>(null);

  // ── Winner Selection State (Random ticket simulator) ────────────
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnWinner, setDrawnWinner] = useState<{
    name: string;
    ticket: string;
    tier: string;
    borough: string;
    prize: string;
  } | null>(null);

  // ── Draw Settings State ─────────────────────────────────────────
  const [autoDrawSun, setAutoDrawSun] = useState(true);
  const [autoEnrollPremium, setAutoEnrollPremium] = useState(true);
  const [allowHuntPoints, setAllowHuntPoints] = useState(true);
  const [mailInAccepted, setMailInAccepted] = useState(true);
  const [winnerNotification, setWinnerNotification] = useState(true);
  const [prizeAmount, setPrizeAmount] = useState("1,000");
  const [drawSchedule, setDrawSchedule] = useState("Every Sunday 8PM EST");

  // ── Mail-In Entries State ───────────────────────────────────────
  const [mailInEntries, setMailInEntries] = useState([
    { id: "m1", name: "James Miller", postmark: "Jan 28", status: "Verified", address: "142 Elm St, Astoria NY", tickets: 1 },
    { id: "m2", name: "Maria Santos", postmark: "Jan 27", status: "Verified", address: "88 Broadway, Manhattan NY", tickets: 1 },
    { id: "m3", name: "Kevin Park", postmark: "Jan 26", status: "Pending", address: "512 5th Ave, Brooklyn NY", tickets: 1 },
  ]);

  // ── History Filter ──────────────────────────────────────────────
  const [historyFilter, setHistoryFilter] = useState("Last 12 Weeks");

  // ── Live Countdown State ────────────────────────────────────────
  const [countdown, setCountdown] = useState({
    days: "04",
    hours: "12",
    minutes: "33",
    seconds: "47",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let sec = parseInt(prev.seconds, 10) - 1;
        let min = parseInt(prev.minutes, 10);
        let hrs = parseInt(prev.hours, 10);
        let days = parseInt(prev.days, 10);

        if (sec < 0) {
          sec = 59;
          min -= 1;
          if (min < 0) {
            min = 59;
            hrs -= 1;
            if (hrs < 0) {
              hrs = 23;
              days = Math.max(0, days - 1);
            }
          }
        }

        return {
          days: String(days).padStart(2, "0"),
          hours: String(hrs).padStart(2, "0"),
          minutes: String(min).padStart(2, "0"),
          seconds: String(sec).padStart(2, "0"),
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle verify mail entry
  const handleVerifyMailEntry = (id: string, name: string) => {
    setMailInEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Verified" } : item))
    );
    toast(`Mail entry for ${name} verified and ticket added to Week #47 draw pool!`, "success");
  };

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast(`Draw Settings saved successfully! Prize Bounty set to $${prizeAmount}.`, "success");
  };

  // Handle Draw Winner Simulation
  const handleStartDraw = () => {
    setIsDrawing(true);
    setDrawnWinner(null);
    setShowDrawWinnerModal(true);

    setTimeout(() => {
      setIsDrawing(false);
      setDrawnWinner({
        name: "Chloe Bennett",
        ticket: "#MH-47-81920",
        tier: "Annual VIP Hunter",
        borough: "Brooklyn NY",
        prize: `$${prizeAmount}`,
      });
      toast("Winner selected with cryptographic seed verified!", "success");
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade pb-14 select-none">
      {/* ── 1. TOP BAR / HEADER ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium mb-1">
            <span>Admin Console</span>
            <span>/</span>
            <span className="text-stone-700 font-semibold">Sweepstakes</span>
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-[22px] font-black text-stone-900 tracking-tight">
              Sweepstakes Management
            </h1>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Week #47 Live
            </span>
          </div>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Sweepstakes
          </div>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Weekly cash prize draws, entry management, and winner selection.
          </p>
        </div>

        {/* Top-Right Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowEntryLogModal(true)}
            className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-[#E6E4DC] hover:border-stone-300 text-stone-700 text-xs font-bold px-3.5 py-2 rounded-xl shadow-2xs transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-stone-500" />
            <span>View Entry Log</span>
          </button>

          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-1.5 bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all hover:scale-[1.01]"
          >
            <Plus className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            <span>+ New Sweepstakes</span>
          </button>
        </div>
      </div>

      {/* ── 2. STAT CARDS (4 cards row) ─────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 🎰 Gold icon bg */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-stone-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shadow-2xs">
              <span className="text-base">🎰</span>
            </div>
            <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              +8.2% vs last week
            </span>
          </div>
          <div className="mt-3">
            <div className="text-[24px] font-black text-stone-900 tracking-tight">
              12,440
            </div>
            <div className="text-[11px] font-medium text-stone-400 mt-0.5">
              Total Entries This Week
            </div>
          </div>
        </div>

        {/* Card 2: 👥 Green icon bg */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-stone-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shadow-2xs">
              <Users className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Auto-Enrolled
            </span>
          </div>
          <div className="mt-3">
            <div className="text-[24px] font-black text-stone-900 tracking-tight">
              2,847
            </div>
            <div className="text-[11px] font-medium text-stone-400 mt-0.5">
              Auto-Enrolled Premium Users
            </div>
            <div className="text-[10.5px] text-emerald-600 font-semibold mt-1">
              100% of active subscribers
            </div>
          </div>
        </div>

        {/* Card 3: 💰 Green icon bg */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-stone-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shadow-2xs">
              <DollarSign className="w-4 h-4 stroke-[2.4]" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
              Bounty Pool
            </span>
          </div>
          <div className="mt-3">
            <div className="text-[24px] font-black text-stone-900 tracking-tight">
              $1,000
            </div>
            <div className="text-[11px] font-medium text-stone-400 mt-0.5">
              Current Prize Pool
            </div>
            <div className="text-[10.5px] text-stone-500 font-semibold mt-1">
              Draw: Sunday 8PM EST
            </div>
          </div>
        </div>

        {/* Card 4: ⏳ Amber icon bg */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-stone-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shadow-2xs">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <span className="text-[10.5px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
              Week #47
            </span>
          </div>
          <div className="mt-3">
            <div className="text-[24px] font-black text-stone-900 tracking-tight">
              4 Days
            </div>
            <div className="text-[11px] font-medium text-stone-400 mt-0.5">
              Until Next Draw
            </div>
            <div className="text-[10.5px] text-stone-500 font-semibold mt-1">
              Week #47
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. LIVE DRAW CONTROL (Dark Card #1A1A1A) ────────────────── */}
      <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 border border-[#2E2E2E] shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* Top-Left Badge */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] font-bold text-emerald-400 bg-white/[0.08] border border-white/10 px-3 py-1 rounded-full flex items-center gap-2 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            SWEEPSTAKES ACTIVE — WEEK #47
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Side: Title + Sub + 3 Mini Stat Boxes (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Weekly Cash Prize Draw
              </h2>
              <p className="text-xs text-stone-400 font-medium mt-0.5">
                Sunday, Feb 2, 2025 · 8:00 PM EST
              </p>
            </div>

            {/* 3 Mini Stat Boxes (Dark Glass) */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/[0.06] border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                <div className="text-lg font-black text-white tracking-tight">
                  12,440
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-0.5">
                  Total Entries
                </div>
              </div>

              <div className="bg-white/[0.06] border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                <div className="text-lg font-black text-emerald-400 tracking-tight">
                  2,847
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-0.5">
                  Auto-enrolled
                </div>
              </div>

              <div className="bg-white/[0.06] border border-white/10 rounded-xl p-3.5 backdrop-blur-xs">
                <div className="text-lg font-black text-amber-400 tracking-tight">
                  9,593
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mt-0.5">
                  Bonus Entries
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Countdown + Action Buttons (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-start lg:items-end justify-center space-y-3.5 lg:border-l lg:border-white/10 lg:pl-8">
            {/* Countdown in Gold Color */}
            <div className="text-left lg:text-right">
              <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
                Time Remaining To Live Draw
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-wider text-[#FBBF24] drop-shadow-sm">
                {countdown.days} : {countdown.hours} : {countdown.minutes} : {countdown.seconds}
              </div>
              <div className="text-[9.5px] font-bold uppercase tracking-[0.25em] text-stone-400 mt-1">
                DAYS &nbsp;·&nbsp; HRS &nbsp;·&nbsp; MIN &nbsp;·&nbsp; SEC
              </div>
            </div>

            {/* Buttons Below Countdown */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={handleStartDraw}
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all hover:scale-[1.01] flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Draw Winner Now</span>
              </button>

              <button
                onClick={() => setShowAutoDrawModal(true)}
                className="border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                <span>Schedule Auto-Draw</span>
              </button>
            </div>

            {/* Small text below */}
            <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>Auto-draw enabled · Every Sunday 8PM EST</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. ENTRY BREAKDOWN (2 equal columns) ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT CARD — "Entry Sources" */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-stone-900">Entry Sources</h2>
              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                12,440 Total
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-5">
              How entries were earned this week
            </p>

            {/* 3 Source Rows with Progress Bars */}
            <div className="space-y-4">
              {/* Row 1: ⭐ green circle icon */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-emerald-500 stroke-emerald-600" />
                    </div>
                    <span className="font-bold text-stone-800">
                      Premium Auto-Entry
                    </span>
                  </div>
                  <span className="font-semibold text-emerald-700">
                    2,847 entries · 23%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
                    style={{ width: "23%" }}
                  />
                </div>
              </div>

              {/* Row 2: 💎 gold circle icon */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Gem className="w-3.5 h-3.5 fill-amber-400 stroke-amber-600" />
                    </div>
                    <span className="font-bold text-stone-800">
                      Hunt Points Purchase
                    </span>
                  </div>
                  <span className="font-semibold text-amber-700">
                    8,140 entries · 65%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>

              {/* Row 3: ✉️ blue circle icon */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <span className="font-bold text-stone-800">
                      Mail-In Entries
                    </span>
                  </div>
                  <span className="font-semibold text-blue-700">
                    1,453 entries · 12%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-stone-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: "12%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Divider & Summary */}
          <div className="pt-4 mt-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <span className="font-semibold">
              Total: 12,440 entries across 2,847 eligible participants
            </span>
            <span className="text-[11px] text-emerald-600 font-bold">
              100% Validated
            </span>
          </div>
        </div>

        {/* RIGHT CARD — "Hunt Points Purchase Log" */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-stone-900">
                Hunt Points Purchase Log
              </h2>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-md">
                Extra Tickets
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-3">
              Points redeemed for extra entries
            </p>

            {/* Table (4 rows) */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50/70 border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">PACKAGE</th>
                    <th className="py-2.5 px-3">COST</th>
                    <th className="py-2.5 px-3 text-right">PURCHASES</th>
                    <th className="py-2.5 px-3 text-right">ENTRIES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                  <tr className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-stone-900">+1 Entry</td>
                    <td className="py-2.5 px-3 text-amber-700 font-semibold">200 pts</td>
                    <td className="py-2.5 px-3 text-right">1,240</td>
                    <td className="py-2.5 px-3 text-right font-bold text-stone-900">1,240</td>
                  </tr>
                  <tr className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-stone-900">+3 Entries</td>
                    <td className="py-2.5 px-3 text-amber-700 font-semibold">600 pts</td>
                    <td className="py-2.5 px-3 text-right">892</td>
                    <td className="py-2.5 px-3 text-right font-bold text-stone-900">2,676</td>
                  </tr>
                  <tr className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-stone-900">+5 Entries</td>
                    <td className="py-2.5 px-3 text-amber-700 font-semibold">1,000 pts</td>
                    <td className="py-2.5 px-3 text-right">634</td>
                    <td className="py-2.5 px-3 text-right font-bold text-stone-900">3,170</td>
                  </tr>
                  <tr className="hover:bg-stone-50/60 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-stone-900">+10 Entries</td>
                    <td className="py-2.5 px-3 text-amber-700 font-semibold">2,000 pts</td>
                    <td className="py-2.5 px-3 text-right">254</td>
                    <td className="py-2.5 px-3 text-right font-bold text-stone-900">2,540</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Total Row */}
          <div className="pt-3 mt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 text-stone-600 bg-stone-50/60 p-2.5 rounded-xl border border-stone-200/50">
            <span className="font-semibold text-stone-800">
              Total Points Redeemed: <strong className="text-amber-700">2,847,200 HP</strong>
            </span>
            <span className="font-semibold text-stone-800">
              Total Bonus Entries Generated: <strong className="text-emerald-700">9,626</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ── 5. DRAW SETTINGS + MAIL-IN (2 columns) ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT CARD — "Draw Settings" */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-stone-900">Draw Settings</h2>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Active Policy
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-4">
              Configure automated draw engine, eligibility, and legal compliance
            </p>

            {/* 5 Toggle Rows */}
            <div className="space-y-3 divide-y divide-stone-100 text-xs">
              {/* Toggle 1 */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <div className="font-bold text-stone-800">
                    Auto-draw every Sunday 8PM
                  </div>
                  <div className="text-[11px] text-stone-400">
                    System draws automatically
                  </div>
                </div>
                <div
                  onClick={() => setAutoDrawSun(!autoDrawSun)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    autoDrawSun ? "bg-[#22C55E]" : "bg-stone-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      autoDrawSun ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between pt-2.5">
                <div>
                  <div className="font-bold text-stone-800">
                    Auto-enroll Premium subscribers
                  </div>
                  <div className="text-[11px] text-stone-400">
                    1 free entry per subscriber
                  </div>
                </div>
                <div
                  onClick={() => setAutoEnrollPremium(!autoEnrollPremium)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    autoEnrollPremium ? "bg-[#22C55E]" : "bg-stone-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      autoEnrollPremium ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between pt-2.5">
                <div>
                  <div className="font-bold text-stone-800">
                    Allow Hunt Points entries
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Members buy extra entries
                  </div>
                </div>
                <div
                  onClick={() => setAllowHuntPoints(!allowHuntPoints)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    allowHuntPoints ? "bg-[#22C55E]" : "bg-stone-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      allowHuntPoints ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Toggle 4 */}
              <div className="flex items-center justify-between pt-2.5">
                <div>
                  <div className="font-bold text-stone-800">
                    Mail-In Entry Accepted
                  </div>
                  <div className="text-[11px] text-stone-400">
                    No purchase necessary (legal)
                  </div>
                </div>
                <div
                  onClick={() => setMailInAccepted(!mailInAccepted)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    mailInAccepted ? "bg-[#22C55E]" : "bg-stone-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      mailInAccepted ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              {/* Toggle 5 */}
              <div className="flex items-center justify-between pt-2.5">
                <div>
                  <div className="font-bold text-stone-800">
                    Winner push + email notification
                  </div>
                  <div className="text-[11px] text-stone-400">
                    Auto-notify on draw
                  </div>
                </div>
                <div
                  onClick={() => setWinnerNotification(!winnerNotification)}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                    winnerNotification ? "bg-[#22C55E]" : "bg-stone-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      winnerNotification ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Inputs Below Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-stone-100">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Prize Amount ($)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-stone-400 font-bold text-xs">$</span>
                  <input
                    type="text"
                    value={prizeAmount}
                    onChange={(e) => setPrizeAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 rounded-xl border border-stone-200/90 text-xs font-bold text-stone-900 bg-stone-50 focus:bg-white outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  Draw Schedule
                </label>
                <select
                  value={drawSchedule}
                  onChange={(e) => setDrawSchedule(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-stone-200/90 text-xs font-bold text-stone-900 bg-stone-50 focus:bg-white outline-none focus:border-emerald-500 cursor-pointer hover:border-stone-300 transition-all"
                >
                  <option value="Every Sunday 8PM EST">Every Sunday 8PM EST</option>
                  <option value="Bi-Weekly Sunday 8PM EST">Bi-Weekly Sunday 8PM EST</option>
                  <option value="Monthly First Sunday 8PM">Monthly First Sunday 8PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* [Save Draw Settings] green button full width */}
          <div className="pt-4 mt-4 border-t border-stone-100">
            <button
              onClick={handleSaveSettings}
              className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs py-2.5 rounded-xl shadow-xs transition-all hover:scale-[1.005]"
            >
              Save Draw Settings
            </button>
          </div>
        </div>

        {/* RIGHT CARD — "Mail-In Entry Log" */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-stone-900">Mail-In Entry Log</h2>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-2 py-0.5 rounded-md">
                Legal Compliance
              </span>
            </div>
            <p className="text-xs text-stone-400 mb-3">
              Manually verified by admin team
            </p>

            {/* Mini Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-50/70 border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">NAME</th>
                    <th className="py-2.5 px-3">POSTMARK</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
                  {mailInEntries.map((row) => (
                    <tr key={row.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="py-3 px-3 font-bold text-stone-900">
                        {row.name}
                      </td>
                      <td className="py-3 px-3 text-stone-500">
                        {row.postmark}
                      </td>
                      <td className="py-3 px-3">
                        {row.status === "Verified" ? (
                          <span className="inline-flex items-center gap-1 font-bold text-[11px] text-[#15803D] bg-[#DCFCE7] border border-emerald-200/60 px-2 py-0.5 rounded-full">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-[11px] text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        {row.status === "Verified" ? (
                          <button
                            onClick={() => {
                              toast(`Viewing verified mail-in envelope for ${row.name} (${row.address})`, "info");
                            }}
                            className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-bold text-xs px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                          >
                            View
                          </button>
                        ) : (
                          <button
                            onClick={() => handleVerifyMailEntry(row.id, row.name)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Log Button & Subtext */}
          <div className="pt-4 mt-3 border-t border-stone-100 space-y-2">
            <button
              onClick={() => setShowMailInModal(true)}
              className="w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs py-2 rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-stone-500" />
              <span>+ Log New Mail Entry</span>
            </button>
            <div className="text-[11px] text-stone-400 text-center font-medium">
              Total mail entries this week: 1,453
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. DRAW HISTORY TABLE ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#EAE8E1] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Header Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-stone-900">
                Past Sweepstakes Results
              </h2>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Audited winner selection history, cash disbursement records, and verifiable draws
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Range:</span>
            <select
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
              className="text-xs font-semibold bg-stone-50 border border-stone-200/80 rounded-xl px-3 py-1.5 text-stone-700 outline-none cursor-pointer hover:border-stone-300"
            >
              <option value="Last 12 Weeks">Last 12 Weeks</option>
              <option value="Last 4 Weeks">Last 4 Weeks</option>
              <option value="Year 2025">Year 2025</option>
              <option value="All Time">All Time</option>
            </select>
          </div>
        </div>

        {/* 5 Data Rows Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-50/70 border-b border-stone-100 text-stone-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedHistoryIds.length === 5}
                    onChange={() => {
                      if (selectedHistoryIds.length === 5) {
                        setSelectedHistoryIds([]);
                      } else {
                        setSelectedHistoryIds(["#47", "#46", "#45", "#44", "#43"]);
                      }
                    }}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                  />
                </th>
                <th className="py-3 px-4">WEEK</th>
                <th className="py-3 px-4">PRIZE</th>
                <th className="py-3 px-4">ENTRIES</th>
                <th className="py-3 px-4">WINNER</th>
                <th className="py-3 px-4">BOROUGH</th>
                <th className="py-3 px-4">DRAW DATE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">PAYOUT</th>
                <th className="py-3 px-4 text-right w-[110px]">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700 font-medium">
              {[
                {
                  id: "#47",
                  week: "#47",
                  prize: "$1,000",
                  entries: "12,440",
                  winner: null,
                  borough: "—",
                  date: "—",
                  status: "Live Active",
                  payout: "—",
                  isCurrent: true,
                },
                {
                  id: "#46",
                  week: "#46",
                  prize: "$1,000",
                  entries: "11,280",
                  winner: { name: "Sofia Torres", initials: "ST" },
                  borough: "Queens NY",
                  date: "Jan 26",
                  status: "Paid",
                  payout: "$1,000",
                  txnId: "TXN-SWEEP-4601",
                },
                {
                  id: "#45",
                  week: "#45",
                  prize: "$1,000",
                  entries: "10,450",
                  winner: { name: "Kai Nakamura", initials: "KN" },
                  borough: "Brooklyn NY",
                  date: "Jan 19",
                  status: "Paid",
                  payout: "$1,000",
                  txnId: "TXN-SWEEP-4501",
                },
                {
                  id: "#44",
                  week: "#44",
                  prize: "$1,000",
                  entries: "9,820",
                  winner: { name: "Layla Khan", initials: "LK" },
                  borough: "Denver CO",
                  date: "Jan 12",
                  status: "Paid",
                  payout: "$1,000",
                  txnId: "TXN-SWEEP-4401",
                },
                {
                  id: "#43",
                  week: "#43",
                  prize: "$500",
                  entries: "7,240",
                  winner: { name: "Diego Silva", initials: "DS" },
                  borough: "Queens NY",
                  date: "Jan 5",
                  status: "Paid",
                  payout: "$500",
                  txnId: "TXN-SWEEP-4301",
                },
              ].map((row) => {
                const isChecked = selectedHistoryIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`group hover:bg-[#F9FAFB] transition-colors ${
                      isChecked ? "bg-emerald-50/30" : row.isCurrent ? "bg-amber-50/[0.15]" : ""
                    }`}
                  >
                    <td className="py-3.5 px-3 w-10">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedHistoryIds((prev) =>
                            prev.includes(row.id)
                              ? prev.filter((i) => i !== row.id)
                              : [...prev, row.id]
                          );
                        }}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                      />
                    </td>
                    <td className="py-3.5 px-4 font-black text-stone-900">{row.week}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-700">{row.prize}</td>
                    <td className="py-3.5 px-4 font-semibold text-stone-800">{row.entries}</td>
                    <td className="py-3.5 px-4">
                      {row.winner ? (
                        <div className="flex items-center gap-2">
                          <HunterAvatar name={row.winner.name} initials={row.winner.initials} />
                          <span className="font-bold text-stone-900">{row.winner.name}</span>
                        </div>
                      ) : (
                        <span className="text-stone-400 italic">(current)</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600">{row.borough}</td>
                    <td className="py-3.5 px-4 text-stone-500">{row.date}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-900">{row.payout}</td>
                    <td className="py-3.5 px-4 text-right w-[110px]">
                      <div className="flex items-center justify-end">
                        <ActionButton
                          variant="secondary"
                          onClick={() =>
                            setSelectedHistoryItem({
                              week: row.week,
                              prize: row.prize,
                              entries: row.entries,
                              winner: row.winner ? row.winner.name : "Active In Progress",
                              borough: row.borough,
                              date: row.date,
                              status: row.status,
                              payout: row.payout,
                            })
                          }
                        >
                          Details
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── RULE 4: FLOATING BULK BAR ── */}
        <FloatingBulkBar
          selectedCount={selectedHistoryIds.length}
          itemLabel="sweepstakes draw"
          onClear={() => setSelectedHistoryIds([])}
          actions={[
            {
              label: "Export Selected",
              variant: "outline",
              onClick: () => {
                toast(`Exported ${selectedHistoryIds.length} draw audits`, "success");
                setSelectedHistoryIds([]);
              },
            },
            {
              label: "Download Certificates",
              variant: "green",
              onClick: () => {
                toast(`Generated certificates for ${selectedHistoryIds.length} draws`, "success");
                setSelectedHistoryIds([]);
              },
            },
          ]}
        />

        {/* Footer: Showing 5 of 47 · Pagination */}
        <div className="p-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div>
            Showing <span className="font-semibold text-stone-800">5</span> of{" "}
            <span className="font-semibold text-stone-800">47</span> sweepstakes draws
          </div>

          <div className="flex items-center gap-1.5">
            <button className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-40 font-medium transition-colors">
              Previous
            </button>
            <button className="w-7 h-7 rounded-lg text-xs font-bold bg-stone-900 text-white shadow-2xs">
              1
            </button>
            <button className="w-7 h-7 rounded-lg text-xs font-bold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
              2
            </button>
            <button className="w-7 h-7 rounded-lg text-xs font-bold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
              3
            </button>
            <span className="px-1 text-stone-400">...</span>
            <button className="w-7 h-7 rounded-lg text-xs font-bold bg-white border border-stone-200 text-stone-700 hover:bg-stone-50">
              10
            </button>
            <button className="px-2.5 py-1 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 font-medium transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ── 7. MODALS ──────────────────────────────────────────────── */}

      {/* Modal 1: + New Sweepstakes */}
      <Modal
        open={showNewModal}
        onClose={() => setShowNewModal(false)}
        title="Schedule New Sweepstakes Event"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast("New sweepstakes event created and locked into schedule!", "success");
            setShowNewModal(false);
          }}
          className="space-y-4 text-xs"
        >
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>New draws automatically integrate with mobile app push banners & hunter tickets.</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Sweepstakes Week #
              </label>
              <input
                required
                defaultValue="48"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-bold text-stone-900 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Cash Prize Bounty ($)
              </label>
              <input
                required
                defaultValue="1,000"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-bold text-stone-900 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Draw Date & Time (EST)
            </label>
            <input
              required
              defaultValue="Sunday, Feb 9, 2025 · 8:00 PM EST"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-900 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Eligible Participant Scope
            </label>
            <select className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold text-stone-900 outline-none focus:border-emerald-500">
              <option>All Premium Subscribers + Points & Mail-In</option>
              <option>Annual VIP Members Only (Special Drop)</option>
              <option>All Registered Hunters (Free Trial Included)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setShowNewModal(false)}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold transition-all shadow-xs"
            >
              Create Sweepstakes
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: View Entry Log */}
      <Modal
        open={showEntryLogModal}
        onClose={() => setShowEntryLogModal(false)}
        title="Week #47 Participant Entry Log"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200/60">
            <span>Pool Size: <strong>12,440 Tickets</strong></span>
            <span>Participants: <strong>2,847 Hunters</strong></span>
            <span className="text-emerald-700 font-bold">Draw Seed: #0x9F82A</span>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {[
              { name: "Sofia Torres", handle: "@CashQueen23", entries: 5, method: "VIP + 4 Points" },
              { name: "Kai Nakamura", handle: "@HunterKing", entries: 11, method: "VIP + 10 Points" },
              { name: "Diego Silva", handle: "@QueensKing99", entries: 1, method: "VIP Auto-Entry" },
              { name: "James Miller", handle: "@JMiller", entries: 1, method: "Mail-In Entry" },
              { name: "Layla Khan", handle: "@PriyaHunts", entries: 6, method: "VIP + 5 Points" },
              { name: "Amara Adeyemi", handle: "@AmaraHunts", entries: 1, method: "VIP Auto-Entry" },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200/70 bg-white"
              >
                <div className="flex items-center gap-2.5">
                  <HunterAvatar name={p.name} initials={p.name.slice(0, 2).toUpperCase()} />
                  <div>
                    <div className="font-bold text-stone-900">{p.name}</div>
                    <div className="text-[10px] text-stone-400">{p.handle} · {p.method}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
                    {p.entries} {p.entries === 1 ? "entry" : "entries"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-100">
            <button
              onClick={() => toast("Exported 12,440 tickets ledger to CSV", "info")}
              className="px-3.5 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 font-bold text-stone-700 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Full Ledger</span>
            </button>
            <button
              onClick={() => setShowEntryLogModal(false)}
              className="px-4 py-1.5 rounded-lg bg-stone-900 text-white font-bold"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal 3: Draw Winner Simulation */}
      <Modal
        open={showDrawWinnerModal}
        onClose={() => setShowDrawWinnerModal(false)}
        title="Live Cryptographic Winner Draw"
      >
        <div className="space-y-5 text-xs text-center py-2">
          {isDrawing ? (
            <div className="py-8 space-y-3">
              <div className="w-12 h-12 rounded-full border-3 border-emerald-500 border-t-transparent animate-spin mx-auto" />
              <div className="text-sm font-bold text-stone-800">
                Randomizing 12,440 Tickets...
              </div>
              <p className="text-[11px] text-stone-400">
                Verifying state entropy with block hash and random beacon
              </p>
            </div>
          ) : drawnWinner ? (
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center text-2xl shadow-sm">
                🎉
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Winning Ticket Drawn
                </span>
                <h3 className="text-lg font-black text-stone-900 mt-2">
                  {drawnWinner.name}
                </h3>
                <div className="text-xs text-stone-500 mt-0.5">
                  {drawnWinner.borough} · {drawnWinner.tier}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200/60 text-left">
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase">Winning Ticket</div>
                  <div className="font-mono font-bold text-stone-900">{drawnWinner.ticket}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-stone-400 uppercase">Prize Amount</div>
                  <div className="font-bold text-emerald-700 text-sm">{drawnWinner.prize}</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    toast(`Push notification and congratulations email dispatched to ${drawnWinner.name}!`, "success");
                    setShowDrawWinnerModal(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold transition-all shadow-xs"
                >
                  Confirm & Notify Winner
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>

      {/* Modal 4: Schedule Auto-Draw */}
      <Modal
        open={showAutoDrawModal}
        onClose={() => setShowAutoDrawModal(false)}
        title="Schedule Auto-Draw Automation"
      >
        <div className="space-y-4 text-xs">
          <p className="text-stone-600">
            Configure the background cron runner to select and disburse cash prizes without manual intervention.
          </p>
          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-700">Automation Trigger:</span>
              <span className="font-bold text-emerald-700">Every Sunday 8:00:00 PM EST</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-700">Payout Escrow:</span>
              <span className="font-bold text-stone-900">Stripe Instant Transfer</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-700">Push Notification:</span>
              <span className="font-bold text-stone-900">Enabled (All Users)</span>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowAutoDrawModal(false)}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
            >
              Close
            </button>
            <button
              onClick={() => {
                toast("Auto-Draw scheduler synced with MoneyHunt cloud workers!", "success");
                setShowAutoDrawModal(false);
              }}
              className="px-5 py-2 rounded-xl bg-[#22C55E] text-white font-bold hover:bg-[#16A34A]"
            >
              Confirm Automation
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal 5: + Log New Mail Entry */}
      <Modal
        open={showMailInModal}
        onClose={() => setShowMailInModal(false)}
        title="Log New Mail-In Sweepstakes Entry"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const name = (form.elements.namedItem("hunterName") as HTMLInputElement).value;
            const postmark = (form.elements.namedItem("postmark") as HTMLInputElement).value;
            setMailInEntries((prev) => [
              { id: `m-${Date.now()}`, name, postmark, status: "Verified", address: "Handlogged by Admin", tickets: 1 },
              ...prev,
            ]);
            toast(`Mail-in entry for ${name} recorded and verified!`, "success");
            setShowMailInModal(false);
          }}
          className="space-y-4 text-xs"
        >
          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Full Legal Name
            </label>
            <input
              name="hunterName"
              required
              placeholder="e.g. David Richardson"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-900 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Postmark Date
              </label>
              <input
                name="postmark"
                required
                defaultValue="Jan 29"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-900 outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-700 mb-1">
                Envelope ID / Barcode
              </label>
              <input
                defaultValue="ENV-90218"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-900 outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">
              Physical Return Address
            </label>
            <input
              placeholder="e.g. 742 Evergreen Terrace, New York NY 10001"
              className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-semibold text-stone-900 outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setShowMailInModal(false)}
              className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold"
            >
              Verify & Add 1 Entry
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal 6: Draw History Details */}
      <Modal
        open={!!selectedHistoryItem}
        onClose={() => setSelectedHistoryItem(null)}
        title={`Sweepstakes Draw Audit: Week ${selectedHistoryItem?.week}`}
      >
        {selectedHistoryItem && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Official Winner:</span>
                <span className="font-bold text-stone-900">{selectedHistoryItem.winner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Location:</span>
                <span className="font-semibold text-stone-800">{selectedHistoryItem.borough}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Total Entries in Pool:</span>
                <span className="font-semibold text-stone-800">{selectedHistoryItem.entries} tickets</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Cash Bounty Disbursed:</span>
                <span className="font-bold text-emerald-700">{selectedHistoryItem.prize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Status:</span>
                <span className="font-bold text-stone-900">{selectedHistoryItem.status}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-1 text-emerald-900">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cryptographic Audit Proof</span>
              </div>
              <div className="font-mono text-[10px] break-all text-emerald-800">
                Hash: 0x9b4f2c0192e8fa71d34cba8100ef312984aa76c5
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                onClick={() => setSelectedHistoryItem(null)}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white font-bold"
              >
                Close Audit
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
