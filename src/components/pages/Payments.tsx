"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Input,
  StatusBadge,
  EmptyState,
  FloatingBulkBar,
  ActionButton,
  useToast,
} from "../ui";
import {
  DollarSign,
  RotateCcw,
  X,
  TrendingUp,
  Download,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";

export type PaymentTransaction = {
  id: string;
  user: string;
  type: "Reward" | "Refund" | "Merch Purchase" | "Membership";
  amount: number;
  isNegative: boolean;
  status: "Completed" | "Failed";
  method: string;
  date: string;
};

export const ALL_PAYMENTS: PaymentTransaction[] = [
  { id: "TXN-55000", user: "Kal Adeyemi", type: "Reward", amount: 113, isNegative: false, status: "Completed", method: "PayPal", date: "2026-08-05" },
  { id: "TXN-55001", user: "Sofia Adeyemi", type: "Refund", amount: -57, isNegative: true, status: "Completed", method: "Apple Pay", date: "2026-08-07" },
  { id: "TXN-55002", user: "Jack Brooks", type: "Reward", amount: 480, isNegative: false, status: "Completed", method: "PayPal", date: "2026-08-12" },
  { id: "TXN-55003", user: "Malik Kowalski", type: "Merch Purchase", amount: 106, isNegative: false, status: "Failed", method: "Visa •••• 4432", date: "2026-08-07" },
  { id: "TXN-55004", user: "Hana Moreau", type: "Merch Purchase", amount: 36, isNegative: false, status: "Completed", method: "Visa •••• 4432", date: "2026-08-11" },
  { id: "TXN-55005", user: "Ines Petrov", type: "Reward", amount: 196, isNegative: false, status: "Completed", method: "Visa •••• 4432", date: "2026-08-09" },
  { id: "TXN-55006", user: "Sofia Novak", type: "Reward", amount: 428, isNegative: false, status: "Completed", method: "Apple Pay", date: "2026-08-05" },
  { id: "TXN-55007", user: "Leo Kowalski", type: "Reward", amount: 565, isNegative: false, status: "Completed", method: "Apple Pay", date: "2026-08-13" },
  { id: "TXN-55008", user: "Sofia Novak", type: "Refund", amount: -14, isNegative: true, status: "Completed", method: "Visa •••• 4432", date: "2026-08-04" },
  { id: "TXN-55009", user: "Hana Torres", type: "Merch Purchase", amount: 83, isNegative: false, status: "Failed", method: "Visa •••• 4432", date: "2026-08-08" },
  { id: "TXN-55010", user: "Kai Novak", type: "Merch Purchase", amount: 55, isNegative: false, status: "Completed", method: "Apple Pay", date: "2026-08-12" },
  { id: "TXN-55011", user: "Ines Haddad", type: "Refund", amount: -23, isNegative: true, status: "Completed", method: "PayPal", date: "2026-08-08" },
  { id: "TXN-55012", user: "Amara Haddad", type: "Refund", amount: -28, isNegative: true, status: "Completed", method: "Mastercard •••• 8821", date: "2026-08-12" },
  { id: "TXN-55013", user: "Ava Petrov", type: "Membership", amount: 75, isNegative: false, status: "Failed", method: "Visa •••• 4432", date: "2026-08-03" },
  { id: "TXN-55014", user: "Nadia Novak", type: "Refund", amount: -71, isNegative: true, status: "Completed", method: "Mastercard •••• 8821", date: "2026-08-11" },
  { id: "TXN-55015", user: "Layla Nakamura", type: "Refund", amount: -41, isNegative: true, status: "Failed", method: "PayPal", date: "2026-08-07" },
  { id: "TXN-55016", user: "Ava Silva", type: "Reward", amount: 305, isNegative: false, status: "Failed", method: "Mastercard •••• 8821", date: "2026-08-05" },
  { id: "TXN-55017", user: "Tomas Chen", type: "Membership", amount: 39, isNegative: false, status: "Completed", method: "PayPal", date: "2026-08-01" },
  { id: "TXN-55018", user: "Zara Novak", type: "Merch Purchase", amount: 30, isNegative: false, status: "Failed", method: "PayPal", date: "2026-08-03" },
  { id: "TXN-55019", user: "Emma Haddad", type: "Membership", amount: 114, isNegative: false, status: "Failed", method: "Visa •••• 4432", date: "2026-08-11" },
];

export function Payments() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const pageSize = 10;

  const filtered = ALL_PAYMENTS.filter((t) => {
    const matchSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.method.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All Types" || t.type === typeFilter;
    const matchStatus = statusFilter === "All Status" || t.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="animate-fade space-y-4 pb-8">
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-black text-stone-900 tracking-tight">
            Payments
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Payments
          </div>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            All financial transactions across the platform
          </p>
        </div>

        <button
          onClick={() => toast("Exporting all transactions to CSV...", "info")}
          className="flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-[#E6E4DC] text-stone-700 text-xs font-bold px-3 py-1.5 rounded-xl shadow-sm transition-all hover:border-stone-300 w-fit cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-stone-500" />
          <span>Export</span>
        </button>
      </div>

      {/* ── 4 STAT CARDS ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Gross Volume */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 hover:border-stone-300 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EBF7EE] text-[#16A34A] flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" strokeWidth={2.4} />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
              ↑ +11.3%
            </span>
          </div>
          <div className="text-[12px] text-stone-500 font-medium mb-1">
            Gross Volume (30d)
          </div>
          <div className="text-[22px] font-black text-stone-900 tracking-tight leading-tight">
            $2,625
          </div>
        </div>

        {/* Card 2: Refunds */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 hover:border-stone-300 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#FFFBEB] text-[#D97706] flex items-center justify-center">
              <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FEE2E2] text-[#B91C1C]">
              ↓ +2.1%
            </span>
          </div>
          <div className="text-[12px] text-stone-500 font-medium mb-1">
            Refunds (30d)
          </div>
          <div className="text-[22px] font-black text-stone-900 tracking-tight leading-tight">
            $234
          </div>
        </div>

        {/* Card 3: Failed Transactions */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 hover:border-stone-300 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
              <X className="w-4 h-4" strokeWidth={2.4} />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
              ↑ -1
            </span>
          </div>
          <div className="text-[12px] text-stone-500 font-medium mb-1">
            Failed Transactions
          </div>
          <div className="text-[22px] font-black text-stone-900 tracking-tight leading-tight">
            7
          </div>
        </div>

        {/* Card 4: Net Revenue */}
        <div className="bg-white rounded-2xl border border-[#EAE8E1] p-4 hover:border-stone-300 transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#F5F5F4] text-[#78716C] flex items-center justify-center">
              <TrendingUp className="w-4 h-4" strokeWidth={2.4} />
            </div>
            <span className="inline-flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D]">
              ↑ +9.6%
            </span>
          </div>
          <div className="text-[12px] text-stone-500 font-medium mb-1">
            Net Revenue (30d)
          </div>
          <div className="text-[22px] font-black text-stone-900 tracking-tight leading-tight">
            $2,391
          </div>
        </div>
      </div>

      {/* ── TRANSACTIONS CARD ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#EAE8E1] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        {/* Filter bar */}
        <div className="p-4 border-b border-stone-100 flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search transaction ID or user"
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200/90 text-xs bg-white outline-none placeholder:text-stone-400 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/15 transition-all"
            />
          </div>

          {/* Type Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTypeMenu(!showTypeMenu);
                setShowStatusMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200/90 bg-white text-xs font-semibold text-stone-700 hover:border-stone-300 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>{typeFilter}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>
            {showTypeMenu && (
              <div className="absolute top-full left-0 mt-1 w-44 bg-white rounded-xl border border-stone-200/90 shadow-xl z-30 py-1 animate-fade">
                {["All Types", "Reward", "Refund", "Merch Purchase", "Membership"].map(
                  (t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTypeFilter(t);
                        setShowTypeMenu(false);
                        setCurrentPage(1);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-stone-50 transition-colors ${
                        typeFilter === t ? "text-[#22C55E] font-bold" : "text-stone-700"
                      }`}
                    >
                      {t}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Status Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowStatusMenu(!showStatusMenu);
                setShowTypeMenu(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200/90 bg-white text-xs font-semibold text-stone-700 hover:border-stone-300 transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>{statusFilter}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>
            {showStatusMenu && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-white rounded-xl border border-stone-200/90 shadow-xl z-30 py-1 animate-fade">
                {["All Status", "Completed", "Failed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setStatusFilter(s);
                      setShowStatusMenu(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium hover:bg-stone-50 transition-colors ${
                      statusFilter === s ? "text-[#22C55E] font-bold" : "text-stone-700"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 bg-[#FBF9F4]/40 text-stone-400 font-bold text-[10px] tracking-wider uppercase">
                <th className="py-3 px-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === paginated.length && paginated.length > 0}
                    onChange={() => {
                      if (selectedIds.length === paginated.length) {
                        setSelectedIds([]);
                      } else {
                        setSelectedIds(paginated.map((t) => t.id));
                      }
                    }}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                  />
                </th>
                <th className="py-3 px-4">TRANSACTION ID</th>
                <th className="py-3 px-4">USER</th>
                <th className="py-3 px-4">TYPE</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">PAYMENT METHOD</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-right w-[110px]">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100/80">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-6">
                    <EmptyState
                      icon="💳"
                      title="No transactions found"
                      subtitle="No payment records match your current search or filter."
                      actionLabel="Reset Filters"
                      onAction={() => {
                        setSearch("");
                        setTypeFilter("All Types");
                        setStatusFilter("All Status");
                      }}
                    />
                  </td>
                </tr>
              ) : (
                paginated.map((t) => {
                  const isChecked = selectedIds.includes(t.id);
                  return (
                    <tr
                      key={t.id}
                      className={`group hover:bg-[#F9FAFB] transition-colors ${
                        isChecked ? "bg-emerald-50/30" : ""
                      }`}
                    >
                      <td className="py-3 px-3 w-10">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            setSelectedIds((prev) =>
                              prev.includes(t.id) ? prev.filter((i) => i !== t.id) : [...prev, t.id]
                            );
                          }}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                        />
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-stone-700 text-xs">
                        {t.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-stone-900 text-xs">
                        {t.user}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                          {t.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-black text-xs ${
                            t.isNegative ? "text-[#DC2626]" : "text-[#16A34A]"
                          }`}
                        >
                          {t.isNegative
                            ? `-$${Math.abs(t.amount)}`
                            : `$${t.amount}`}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={t.status} />
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-stone-600">
                        {t.method}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-stone-500">
                        {t.date}
                      </td>
                      <td className="py-3 px-4 text-right w-[110px]">
                        <div className="flex items-center justify-end">
                          <ActionButton
                            variant="secondary"
                            onClick={() => toast(`Transaction details opened for ${t.id}`, "info")}
                          >
                            Details
                          </ActionButton>
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
          itemLabel="transaction"
          onClear={() => setSelectedIds([])}
          actions={[
            {
              label: "Export Selected",
              variant: "outline",
              onClick: () => {
                toast(`Exported ${selectedIds.length} transactions to CSV`, "success");
                setSelectedIds([]);
              },
            },
            {
              label: "Refund Selected",
              variant: "danger",
              onClick: () => {
                toast(`Initiated refunds for ${selectedIds.length} transactions`, "error");
                setSelectedIds([]);
              },
            },
          ]}
        />

        {/* Pagination */}
        <div className="p-3.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 bg-stone-50/20">
          <div>
            Showing{" "}
            <span className="font-bold text-stone-900">
              {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
            </span>
            –
            <span className="font-bold text-stone-900">
              {Math.min(currentPage * pageSize, filtered.length)}
            </span>{" "}
            of <span className="font-bold text-stone-900">{filtered.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              const isActive = currentPage === p;
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${
                    isActive
                      ? "bg-stone-900 text-white shadow-sm"
                      : "border border-stone-200 text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  {p}
                </button>
              );
            })}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
