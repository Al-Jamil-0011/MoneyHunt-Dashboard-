"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Avatar,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  WinnerStatusBadge,
  TableEmptyState,
  ActionButton,
  useToast,
} from "../ui";
import { WINNERS, Winner } from "@/lib/data";
import {
  Trophy,
  DollarSign,
  Clock,
  CheckCircle2,
  Search,
  Download,
  AlertCircle,
  MapPin,
  Calendar,
  Sparkles,
  CreditCard,
  ExternalLink,
  X,
  Check,
} from "lucide-react";

type FilterStage = "All Stages" | "Pending" | "Verified" | "Approved" | "Paid" | "Rejected";

export function Winners() {
  const { toast } = useToast();
  const [winners, setWinners] = useState<Winner[]>(WINNERS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStage>("All Stages");
  const [selected, setSelected] = useState<Winner | null>(null);

  // ── ADDITION 2: Checkbox Bulk Selection State ───────────────────
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // ── Keyboard ESC listener to close panel ────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = winners.filter((w) => {
    const matchSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.drop.toLowerCase().includes(search.toLowerCase()) ||
      w.borough.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All Stages" || w.status === filter;
    return matchSearch && matchFilter;
  });

  const updateStatus = (id: string, status: Winner["status"]) => {
    setWinners((prev) => prev.map((w) => (w.id === id ? { ...w, status } : w)));
    const winner = winners.find((w) => w.id === id);
    const msgs: Record<string, string> = {
      Verified: `${winner?.name} claim identity verified ✓`,
      Approved: `${winner?.name} prize payout approved 🚀`,
      Paid: `Prize payment sent to ${winner?.name} 💰`,
      Rejected: `${winner?.name} claim was rejected`,
    };
    toast(msgs[status] || "Status updated", status === "Rejected" ? "error" : "success");
    setSelected(null);
  };

  // Bulk actions handlers
  const handleToggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((w) => w.id));
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkApprove = () => {
    setWinners((prev) =>
      prev.map((w) => (selectedIds.includes(w.id) ? { ...w, status: "Approved" as const } : w))
    );
    toast(`Approved payouts for ${selectedIds.length} winners!`, "success");
    setSelectedIds([]);
  };

  const handleBulkReject = () => {
    setWinners((prev) =>
      prev.map((w) => (selectedIds.includes(w.id) ? { ...w, status: "Rejected" as const } : w))
    );
    toast(`Rejected claims for ${selectedIds.length} winners`, "error");
    setSelectedIds([]);
  };

  const handleBulkExport = () => {
    toast(`Exporting ${selectedIds.length} winner records to CSV...`, "info");
  };

  const pendingCount = winners.filter((w) => w.status === "Pending").length;
  const verifiedCount = winners.filter((w) => w.status === "Verified").length;
  const paidCount = winners.filter((w) => w.status === "Paid").length;
  const totalPrizePaid = winners
    .filter((w) => w.status === "Paid")
    .reduce((sum, w) => sum + w.prize, 0);

  const STAGES: FilterStage[] = [
    "All Stages",
    "Pending",
    "Verified",
    "Approved",
    "Paid",
    "Rejected",
  ];

  return (
    <div className="animate-fade space-y-6 pb-12 select-none relative">
      {/* Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Winners & Payouts</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Winner Claims & Prize Verification
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Winners & Rewards
          </div>
          <p className="text-xs text-stone-500">
            Audit proof of discovery, verify hunter photo submissions, and approve instant payouts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast("Exporting winner payout ledger...", "info")}
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export Ledger
          </Button>
          <Button
            variant="green"
            size="sm"
            onClick={() => toast("All approved prizes marked for batch processing", "success")}
          >
            <CreditCard className="w-3.5 h-3.5 mr-1.5" />
            Batch Payout
          </Button>
        </div>
      </div>

      {/* 4 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-stone-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Pending Verification
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-amber-600 tracking-tight">
              {pendingCount}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="amber">Requires Action</Badge>
              <span className="text-[11px] text-stone-400">Claims waiting</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-stone-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Verified & Ready
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {verifiedCount}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="blue">ID Confirmed</Badge>
              <span className="text-[11px] text-stone-400">Ready for approval</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-stone-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Total Prizes Disbursed
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-emerald-600 tracking-tight">
              ${totalPrizePaid.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="green">{paidCount} Paid</Badge>
              <span className="text-[11px] text-stone-400">Direct deposit</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-stone-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Total Recorded Winners
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {winners.length}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="purple">NYC Metro</Badge>
              <span className="text-[11px] text-stone-400">Season 2026</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search Bar */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by winner name, hunt drop, or borough..."
              className="pl-9"
            />
          </div>

          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Tabs
              value={filter}
              onValueChange={(val) => setFilter(val as FilterStage)}
            >
              <TabsList>
                {STAGES.map((s) => (
                  <TabsTrigger key={s} value={s}>
                    {s}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Winners Data Table */}
      <Card className="overflow-hidden">
        <CardHeader className="py-4 px-4 sm:px-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 space-y-0 bg-stone-50/40">
          <div>
            <CardTitle className="text-sm">Prize Claims & Verification Roster</CardTitle>
            <CardDescription>
              Showing {filtered.length} claims filtered by "{filter}".
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-stone-500 self-start sm:self-auto">
            Encrypted Audit Log
          </Badge>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              {/* Checkbox Column Header */}
              <TableHead className="w-10 pl-4 pr-1">
                <input
                  type="checkbox"
                  checked={filtered.length > 0 && selectedIds.length === filtered.length}
                  onChange={handleToggleSelectAll}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                />
              </TableHead>
              <TableHead>Winner Profile</TableHead>
              <TableHead>Hunt Location & Drop</TableHead>
              <TableHead>Borough</TableHead>
              <TableHead>Prize Amount</TableHead>
              <TableHead>XP Awarded</TableHead>
              <TableHead>Claim Date</TableHead>
              <TableHead>Verification Status</TableHead>
              <TableHead className="text-right pr-6 w-[210px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableEmptyState
                colSpan={9}
                icon="🏆"
                title="No pending winners"
                subtitle="All claims are reviewed ✅"
                actionLabel="Clear Filters"
                onAction={() => {
                  setSearch("");
                  setFilter("All Stages");
                }}
              />
            ) : (
              filtered.map((w) => {
                const isChecked = selectedIds.includes(w.id);
                return (
                  <TableRow
                    key={w.id}
                    className={`hover:bg-[#F9FAFB] transition-colors ${
                      isChecked ? "bg-emerald-50/30" : ""
                    }`}
                  >
                    {/* Checkbox Column Row */}
                    <TableCell className="w-10 pl-4 pr-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleRow(w.id)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                      />
                    </TableCell>

                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={w.avatar} size="sm" />
                        <div>
                          <div className="text-xs font-bold text-stone-900">{w.name}</div>
                          <div className="text-[11px] text-stone-400">{w.handle}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-emerald-700">{w.drop}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs text-stone-600">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {w.borough}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-black text-stone-900">
                        ${w.prize.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-amber-600">+{w.xp}</span>
                      <span className="text-[10px] text-stone-400 ml-1">XP</span>
                    </TableCell>
                    <TableCell className="text-xs text-stone-500">{w.date}</TableCell>
                    <TableCell>
                      <WinnerStatusBadge status={w.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6 w-[210px]">
                      <div className="flex items-center justify-end gap-[6px]">
                        <ActionButton
                          variant="primary"
                          onClick={() => setSelected(w)}
                        >
                          Review Claim
                        </ActionButton>
                        <ActionButton
                          variant="secondary"
                          onClick={() => setSelected(w)}
                        >
                          Details
                        </ActionButton>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Shadcn Pagination Bar */}
        <div className="p-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50/30">
          <span className="text-xs text-stone-500 font-medium">
            Showing <span className="font-bold text-stone-900">1</span> to{" "}
            <span className="font-bold text-stone-900">{filtered.length}</span> of{" "}
            <span className="font-bold text-stone-900">{winners.length}</span> claims
          </span>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>

      {/* ── ADDITION 2: FLOATING BULK ACTIONS BAR ──────────────────── */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white border border-[#EAE8E1] rounded-[12px] shadow-[0_10px_35px_rgba(0,0,0,0.14)] px-5 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-200">
          <div className="text-xs font-bold text-stone-800 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>
              {selectedIds.length} {selectedIds.length === 1 ? "winner" : "winners"} selected
            </span>
          </div>

          <div className="h-4 w-px bg-stone-200" />

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkApprove}
              className="bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition-all"
            >
              Approve All
            </button>

            <button
              onClick={handleBulkReject}
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all"
            >
              Reject All
            </button>

            <button
              onClick={handleBulkExport}
              className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Export Selected</span>
            </button>

            <button
              onClick={() => setSelectedIds([])}
              className="text-stone-400 hover:text-stone-700 ml-1 p-1 rounded-md hover:bg-stone-100 transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── ADDITION 1: SLIDE-IN REVIEW PANEL ──────────────────────── */}
      {/* Backdrop */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 bg-black/35 backdrop-blur-[2px] z-40 transition-opacity animate-in fade-in duration-200"
        />
      )}

      {/* Right Side Panel (Responsive: full width on mobile, 340px on tablet/desktop) */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[340px] max-w-full bg-white border-l border-[#EAE8E1] shadow-2xl z-50 flex flex-col justify-between p-4 sm:p-5 transform transition-transform duration-300 ease-in-out ${
          selected ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selected ? (
          <>
            <div className="overflow-y-auto pr-0.5 custom-scrollbar">
              {/* Close Button */}
              <div className="flex items-center justify-end mb-1">
                <button
                  onClick={() => setSelected(null)}
                  className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Large Avatar (80px) + Name + Handle */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-md mx-auto ring-4 ring-emerald-500/15 flex-shrink-0">
                  {selected.avatar}
                </div>
                <h3 className="text-base font-black text-stone-900 mt-2.5 tracking-tight leading-tight">
                  {selected.name}
                </h3>
                <div className="text-xs text-stone-400 font-medium mt-0.5">
                  {selected.handle}
                </div>
              </div>

              {/* Location Badge (e.g. "Queens, NY") */}
              <div className="flex justify-center mt-2.5">
                <span className="text-[11px] font-bold text-stone-700 bg-stone-100 border border-stone-200/80 px-3 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                  <MapPin className="w-3 h-3 text-stone-400" />
                  {selected.borough}
                </span>
              </div>

              {/* Prize Amount: large green "$400" */}
              <div className="text-3xl font-black text-[#15803D] text-center mt-3 tracking-tight">
                ${selected.prize.toLocaleString()}
              </div>

              {/* Hunt Name: "Market Street Mystery" */}
              <div className="text-xs font-bold text-stone-800 text-center mt-1">
                {selected.drop}
              </div>

              {/* Drop ID: "#183" + XP: "+1000 XP" */}
              <div className="flex items-center justify-center gap-2 text-xs text-stone-500 mt-1 font-semibold">
                <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono text-[11px]">
                  #183
                </span>
                <span>•</span>
                <span className="text-amber-600 font-bold">+{selected.xp} XP</span>
              </div>

              {/* Divider */}
              <hr className="my-4 border-stone-200/80" />

              {/* Verification Timeline (vertical, 5 steps) */}
              <div className="px-1">
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                  Verification Timeline
                </div>

                <div className="space-y-0 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-3 before:w-0.5 before:bg-stone-200">
                  {/* Step 1: ✅ green "Claim Submitted" + timestamp */}
                  <div className="relative pb-4">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                    <div className="text-xs font-bold text-stone-900 leading-tight">
                      Claim Submitted
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5 font-medium">
                      {selected.date}, 2:14 PM
                    </div>
                  </div>

                  {/* Step 2: ✅ green "Photo Verified" + timestamp */}
                  <div className="relative pb-4">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-300 flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                    <div className="text-xs font-bold text-stone-900 leading-tight">
                      Photo Verified
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5 font-medium">
                      {selected.date}, 2:18 PM
                    </div>
                  </div>

                  {/* Step 3: ⏳ amber "Admin Approval" — CURRENT */}
                  <div className="relative pb-4">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-amber-100 text-amber-700 border border-amber-300 flex items-center justify-center text-[10px]">
                      ⏳
                    </span>
                    <div className="flex items-center gap-1.5 leading-tight">
                      <span className="text-xs font-bold text-amber-800">
                        Admin Approval
                      </span>
                      <span className="text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300/80 px-1 py-0.2 rounded">
                        CURRENT
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5 font-medium">
                      Awaiting review confirmation
                    </div>
                  </div>

                  {/* Step 4: ○ gray "Payout Initiated" */}
                  <div className="relative pb-4">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-stone-100 text-stone-400 border border-stone-300 flex items-center justify-center text-[10px]">
                      ○
                    </span>
                    <div className="text-xs font-semibold text-stone-400 leading-tight">
                      Payout Initiated
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5 font-medium">
                      Stripe transfer queued
                    </div>
                  </div>

                  {/* Step 5: ○ gray "Funds Delivered" */}
                  <div className="relative">
                    <span className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-stone-100 text-stone-400 border border-stone-300 flex items-center justify-center text-[10px]">
                      ○
                    </span>
                    <div className="text-xs font-semibold text-stone-400 leading-tight">
                      Funds Delivered
                    </div>
                    <div className="text-[10px] text-stone-400 mt-0.5 font-medium">
                      Direct deposit settlement
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons & Footer */}
            <div className="pt-4 border-t border-stone-100 space-y-2.5">
              <button
                onClick={() => updateStatus(selected.id, "Approved")}
                className="w-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition-all hover:scale-[1.01]"
              >
                Approve & Pay
              </button>

              <button
                onClick={() => {
                  toast(`Information request sent to ${selected.name}`, "info");
                  setSelected(null);
                }}
                className="w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold py-2 rounded-xl text-xs transition-all shadow-2xs"
              >
                Request More Info
              </button>

              <div className="text-center pt-0.5">
                <button
                  onClick={() => updateStatus(selected.id, "Rejected")}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline transition-colors"
                >
                  Reject Claim
                </button>
              </div>

              <div className="text-[11px] text-stone-400 text-center font-medium pt-1">
                Press Esc to close
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </div>
  );
}
