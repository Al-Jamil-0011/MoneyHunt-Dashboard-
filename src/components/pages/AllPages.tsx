"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Button,
  Avatar,
  Modal,
  Input,
  Textarea,
  Select,
  Switch,
  Checkbox,
  Progress,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Tabs,
  TabsList,
  TabsTrigger,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  StatusBadge,
  EmptyState,
  TableEmptyState,
  FloatingBulkBar,
  ActionButton,
  useToast,
} from "../ui";
import {
  HUNTS,
  DEALS,
  PRODUCTS,
  ORDERS,
  EVENTS,
  TRANSACTIONS,
  OPPORTUNITY_CARDS,
  NOTIFICATIONS_SENT,
  STATS,
  REVENUE_CHART,
  BOROUGH_STATS,
} from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import {
  Target,
  Crosshair,
  Plus,
  Radio,
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Gift,
  ShoppingBag,
  Package,
  CreditCard,
  Bell,
  BarChart3,
  Settings as SettingsIcon,
  Sparkles,
  CheckCircle,
  Truck,
  RotateCcw,
  Send,
  Layers,
  FileText,
  Search,
  Download,
  AlertTriangle,
  Flame,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// 1. HUNT MANAGEMENT
// ─────────────────────────────────────────────────────────────────
export function HuntManagement() {
  const { toast } = useToast();
  const [showCreate, setShowCreate] = useState(false);
  const [hunts, setHunts] = useState(HUNTS);
  const [boroughFilter, setBoroughFilter] = useState("All Boroughs");
  const [viewMode, setViewMode] = useState<"list" | "timeline">("list");
  const [selectedHuntIds, setSelectedHuntIds] = useState<string[]>([]);
  const [form, setForm] = useState({
    location: "",
    borough: "Manhattan",
    prize: "",
    radius: "0.25",
    duration: "60",
    dropTime: "",
    freeHint: "",
    premiumHint: "",
    radiusHint: "",
  });

  const endHunt = (id: string) => {
    setHunts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "Completed" as const } : h))
    );
    toast("Hunt marked as completed", "success");
  };

  const activateHunt = (id: string) => {
    setHunts((prev) =>
      prev.map((h) => (h.id === id ? { ...h, status: "Active" as const } : h))
    );
    toast("Hunt drop activated! 🎯 Push notification broadcasted", "success");
  };

  const activeHunt = hunts.find((h) => h.status === "Active");
  const filteredHunts = hunts.filter(
    (h) => boroughFilter === "All Boroughs" || h.borough === boroughFilter
  );

  const CALENDAR_DAYS = [
    { day: "Mon", date: "Feb 2", isToday: true },
    { day: "Tue", date: "Feb 3", isToday: false },
    { day: "Wed", date: "Feb 4", isToday: false },
    { day: "Thu", date: "Feb 5", isToday: false },
    { day: "Fri", date: "Feb 6", isToday: false },
    { day: "Sat", date: "Feb 7", isToday: false },
    { day: "Sun", date: "Feb 8", isToday: false },
  ];

  const getTimelinePlacement = (dropId: string, index: number) => {
    if (dropId === "#183") return { startCol: 1, span: 3 };
    if (dropId === "#184") return { startCol: 4, span: 3 };
    if (dropId === "#185") return { startCol: 6, span: 2 };
    if (dropId === "#182") return { startCol: 1, span: 1 };
    const cols = [1, 3, 5, 2];
    return { startCol: cols[index % cols.length], span: 2 };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "#22C55E";
      case "Scheduled": return "#3B82F6";
      case "Draft": return "#9CA3AF";
      case "Completed": return "#E5E7EB";
      default: return "#9CA3AF";
    }
  };

  return (
    <div className="animate-fade space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Hunt Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Hunt Drops & Coordinates Schedule
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Hunts & Drops
          </div>
          <p className="text-xs text-stone-500">
            Control live cash drops, coordinate releases, clue timers, and radius beacons.
          </p>
        </div>
        <Button variant="green" size="sm" onClick={() => setShowCreate(true)}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Create New Drop
        </Button>
      </div>

      {/* Active Hunt Hero Card */}
      {activeHunt && (
        <Card
          className="bg-[#0B0E14] border-stone-800 text-white relative overflow-hidden transition-all"
          style={{ boxShadow: "0 0 40px rgba(34,197,94,0.15)" }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <CardContent className="p-6 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                  <Badge variant="green" className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    LIVE DROP ACTIVE
                  </Badge>
                  <span className="text-xs text-stone-400 font-mono">
                    Drop ID: {activeHunt.dropId}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#22C55E] ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    1,247 hunters active now
                  </span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  {activeHunt.location}
                </h2>
                <div className="flex items-center gap-2 text-xs text-stone-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activeHunt.borough}</span>
                  <span>•</span>
                  <span>Radius: {activeHunt.radius} mi</span>
                  <span>•</span>
                  <span>Coordinates: {activeHunt.lat}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast("Hunt extended by 30 mins", "info")}
                  className="bg-stone-900 text-stone-200 border-stone-700 hover:bg-stone-800"
                >
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  +30 Min Clue
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => endHunt(activeHunt.id)}
                >
                  End Hunt Now
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Cash Prize</div>
                <div className="text-2xl font-black text-emerald-400 mt-0.5">
                  ${activeHunt.prize.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Hunters Searching</div>
                <div className="text-2xl font-black text-white mt-0.5">1,247</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Beacon Range</div>
                <div className="text-2xl font-black text-white mt-0.5">
                  {activeHunt.radius} mi
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                <div className="text-[11px] text-stone-400">Time Elapsed</div>
                <div className="text-2xl font-black text-amber-400 mt-0.5">38m 20s</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hunt Schedule Card */}
      <Card className="overflow-hidden">
        <CardHeader className="py-4 px-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50/40">
          <div>
            <CardTitle className="text-sm">Hunt Drop Schedule</CardTitle>
            <CardDescription>
              Upcoming, scheduled, and past verified drops across all 5 boroughs.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {/* ADDITION 1 — View Toggle: [📋 List View]  [📅 Timeline View] */}
            <div className="inline-flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
                  viewMode === "list"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                <span>📋</span> List View
              </button>
              <button
                type="button"
                onClick={() => setViewMode("timeline")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
                  viewMode === "timeline"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                <span>📅</span> Timeline View
              </button>
            </div>

            <div className="w-40">
              <Select
                value={boroughFilter}
                onChange={(e) => setBoroughFilter(e.target.value)}
              >
                <option>All Boroughs</option>
                <option>Manhattan</option>
                <option>Brooklyn</option>
                <option>Queens</option>
                <option>Bronx</option>
                <option>Staten Island</option>
              </Select>
            </div>
          </div>
        </CardHeader>

        {viewMode === "list" ? (
          /* Existing List View Table */
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 pl-4">
                  <input
                    type="checkbox"
                    checked={
                      selectedHuntIds.length === filteredHunts.length &&
                      filteredHunts.length > 0
                    }
                    onChange={() => {
                      if (selectedHuntIds.length === filteredHunts.length) {
                        setSelectedHuntIds([]);
                      } else {
                        setSelectedHuntIds(filteredHunts.map((h) => h.id));
                      }
                    }}
                    className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                </TableHead>
                <TableHead>Drop ID</TableHead>
                <TableHead>Location & Borough</TableHead>
                <TableHead>Prize Bounty</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Drop Status</TableHead>
                <TableHead className="text-right pr-6 w-[170px]">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHunts.length === 0 ? (
                <TableEmptyState
                  colSpan={7}
                  icon={Crosshair}
                  title="No hunts found"
                  subtitle="No hunts match your selected borough filter."
                  actionLabel="Reset Filter"
                  onAction={() => setBoroughFilter("All Boroughs")}
                />
              ) : (
                filteredHunts.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell className="pl-4">
                      <input
                        type="checkbox"
                        checked={selectedHuntIds.includes(h.id)}
                        onChange={() => {
                          setSelectedHuntIds((prev) =>
                            prev.includes(h.id)
                              ? prev.filter((id) => id !== h.id)
                              : [...prev, h.id]
                          );
                        }}
                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell className="font-mono font-bold text-xs text-stone-900">
                      {h.dropId}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-xs text-stone-900">{h.location}</div>
                      <div className="text-[11px] text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {h.borough} · {h.lat}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-black text-xs text-emerald-700">
                        ${h.prize.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-stone-500">{h.scheduled}</TableCell>
                    <TableCell>
                      <StatusBadge status={h.status} dot={h.status === "Active"} />
                    </TableCell>
                    <TableCell className="text-right pr-6 w-[170px]">
                      <div className="flex items-center justify-end gap-[6px]">
                        {h.status === "Active" ? (
                          <ActionButton
                            variant="danger"
                            onClick={() => endHunt(h.id)}
                          >
                            End
                          </ActionButton>
                        ) : (
                          <ActionButton
                            variant="primary"
                            onClick={() => activateHunt(h.id)}
                          >
                            Launch
                          </ActionButton>
                        )}
                        <ActionButton
                          variant="secondary"
                          onClick={() => setShowCreate(true)}
                        >
                          Edit
                        </ActionButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        ) : (
          /* ADDITION 1 — Horizontal Calendar Grid (Mon → Sun) */
          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* Calendar Grid Header: Mon → Sun */}
              <div className="grid grid-cols-7 border-b border-stone-200 bg-stone-50/70 text-center py-2.5">
                {CALENDAR_DAYS.map((d) => (
                  <div key={d.day} className="px-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="font-bold text-xs text-stone-800">{d.day}</span>
                      <span className="text-[11px] font-medium text-stone-400">({d.date})</span>
                      {d.isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" title="Today" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calendar Grid Body with Vertical Columns & Colored Hunt Blocks */}
              <div className="relative p-5 space-y-3 min-h-[260px]">
                {/* Vertical column separator lines */}
                <div className="absolute inset-0 grid grid-cols-7 pointer-events-none divide-x divide-stone-100 px-5">
                  {CALENDAR_DAYS.map((d, i) => (
                    <div
                      key={d.day}
                      className={cn(
                        "h-full transition-colors",
                        d.isToday ? "bg-emerald-500/[0.02]" : ""
                      )}
                    />
                  ))}
                </div>

                {/* Hunt Blocks */}
                {filteredHunts.length === 0 ? (
                  <div className="relative z-10 py-12 text-center text-xs text-stone-400">
                    No hunts scheduled for {boroughFilter} during this week.
                  </div>
                ) : (
                  filteredHunts.map((h, idx) => {
                    const placement = getTimelinePlacement(h.dropId, idx);
                    const bgColor = getStatusColor(h.status);
                    const isCompleted = h.status === "Completed";
                    const statusText = h.status.toUpperCase() === "ACTIVE" ? "ACTIVE" : h.status;
                    const blockLabel = `${h.dropId} ${statusText}`;

                    return (
                      <div
                        key={h.id}
                        className="grid grid-cols-7 gap-2 relative z-10 py-1"
                      >
                        <div
                          style={{
                            gridColumnStart: placement.startCol,
                            gridColumnEnd: `span ${placement.span}`,
                            backgroundColor: bgColor,
                          }}
                          className={cn(
                            "group relative h-11 rounded-lg px-3.5 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer select-none",
                            isCompleted
                              ? "text-stone-700 border border-stone-300 font-semibold"
                              : "text-white font-bold"
                          )}
                        >
                          {/* Block Content */}
                          <div className="flex items-center gap-2 truncate">
                            {h.status === "Active" ? (
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
                            ) : h.status === "Scheduled" ? (
                              <Clock className="w-3.5 h-3.5 shrink-0 opacity-80" />
                            ) : null}
                            <span className="text-xs font-mono font-bold tracking-tight">
                              {blockLabel}
                            </span>
                            <span
                              className={cn(
                                "text-[11px] font-normal truncate hidden sm:inline",
                                isCompleted ? "text-stone-600" : "text-white/90"
                              )}
                            >
                              · {h.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            <span
                              className={cn(
                                "text-xs font-black px-1.5 py-0.5 rounded",
                                isCompleted
                                  ? "bg-stone-200/90 text-stone-800"
                                  : "bg-black/20 text-white"
                              )}
                            >
                              ${h.prize.toLocaleString()}
                            </span>
                          </div>

                          {/* Hover on block: tooltip shows drop ID, location, prize, time */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-stone-900 text-white rounded-xl p-3 shadow-2xl border border-stone-700/80 pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1 transition-all duration-150 z-50">
                            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-emerald-400 text-xs">
                                  {h.dropId}
                                </span>
                                <span
                                  className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded"
                                  style={{
                                    backgroundColor: `${bgColor}25`,
                                    color: isCompleted ? "#D1D5DB" : bgColor,
                                  }}
                                >
                                  {h.status}
                                </span>
                              </div>
                              <span className="font-black text-emerald-400 text-xs">
                                ${h.prize.toLocaleString()}
                              </span>
                            </div>
                            <div className="mt-2 space-y-1.5 text-[11px]">
                              <div className="flex items-start gap-1.5 text-stone-200">
                                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span className="font-semibold">{h.location}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-stone-400">
                                <Clock className="w-3.5 h-3.5 shrink-0" />
                                <span>{h.scheduled}</span>
                              </div>
                              <div className="flex items-center justify-between pt-1.5 text-[10px] text-stone-400 border-t border-stone-800">
                                <span>Borough: {h.borough}</span>
                                <span>Radius: {h.radius} mi</span>
                              </div>
                            </div>
                            {/* Tooltip Caret */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-stone-900" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Block Colors Legend */}
              <div className="flex flex-wrap items-center justify-between px-5 py-3 border-t border-stone-100 bg-stone-50/60 text-xs text-stone-500">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Block Colors:
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" /> Active (#22C55E)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Scheduled (#3B82F6)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9CA3AF]" /> Draft (#9CA3AF)
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E5E7EB] border border-stone-300" /> Completed (#E5E7EB)
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 italic">
                  Hover on block for drop ID, location, prize & time
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>

      <FloatingBulkBar
        selectedCount={selectedHuntIds.length}
        onClear={() => setSelectedHuntIds([])}
        actions={
          <>
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => {
                toast(`Launched ${selectedHuntIds.length} hunt drops!`, "success");
                setSelectedHuntIds([]);
              }}
            >
              Batch Launch
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-stone-800 text-white border-stone-700 hover:bg-stone-700"
              onClick={() => {
                toast(`Exported coordinates for ${selectedHuntIds.length} hunts`, "info");
                setSelectedHuntIds([]);
              }}
            >
              Export CSV
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setHunts((prev) => prev.filter((h) => !selectedHuntIds.includes(h.id)));
                setSelectedHuntIds([]);
                toast("Selected hunts removed", "info");
              }}
            >
              Delete
            </Button>
          </>
        }
      />

      {/* Create Drop Modal */}
      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="🎯 Schedule New Cash Drop"
        wide
        footer={
          <div className="flex flex-wrap justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast("Saved as draft drop", "info");
                setShowCreate(false);
              }}
            >
              Save Draft
            </Button>
            <Button
              variant="green"
              onClick={() => {
                const newId = `h${Date.now()}`;
                const newDropId = `#${180 + hunts.length + 1}`;
                setHunts((prev) => [
                  ...prev,
                  {
                    id: newId,
                    dropId: newDropId,
                    location: form.location || "Central Park Great Lawn",
                    borough: form.borough,
                    prize: Number(form.prize) || 350,
                    scheduled: "Upcoming · Scheduled",
                    status: "Scheduled" as const,
                    radius: Number(form.radius) || 0.25,
                    hunters: 0,
                    lat: "40.7812°N",
                  },
                ]);
                toast("Hunt scheduled and geofenced! 🎯", "success");
                setShowCreate(false);
              }}
            >
              Schedule Drop
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Drop Location / Venue
            </label>
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Washington Square Park, Manhattan"
            />
          </div>

          {/* ADDITION 2 — Map preview in Create modal (200px height) */}
          <div className="col-span-1 sm:col-span-2 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Drop Zone Preview
              </label>
              <span className="text-[11px] text-stone-400 font-normal italic">
                Radius shown as dashed circle
              </span>
            </div>

            {/* 200px Height Dark Map Area */}
            <div className="h-[200px] w-full rounded-xl overflow-hidden relative border border-stone-800 bg-[#0B0E14] select-none shadow-inner flex items-center justify-center">
              {/* Dark Map Vector Street & Water Grid Background */}
              <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="modalMapGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#334155" strokeWidth="0.8" />
                    <circle cx="18" cy="18" r="1" fill="#475569" opacity="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#modalMapGrid)" />
                {/* Arteries & Streets */}
                <path d="M -20,120 Q 180,90 340,140 T 700,80" fill="none" stroke="#1E293B" strokeWidth="12" />
                <path d="M -20,120 Q 180,90 340,140 T 700,80" fill="none" stroke="#475569" strokeWidth="2" />
                <path d="M 120,-10 L 240,210" fill="none" stroke="#1E293B" strokeWidth="10" />
                <path d="M 120,-10 L 240,210" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 2" />
                <path d="M 440,-10 L 370,210" fill="none" stroke="#1E293B" strokeWidth="12" />
                <path d="M 440,-10 L 370,210" fill="none" stroke="#475569" strokeWidth="2" />
                {/* Simulated Waterway */}
                <path d="M 0,35 Q 220,80 380,25 T 700,60 L 700,-10 L 0,-10 Z" fill="#0c1929" opacity="0.8" />
              </svg>

              {/* Radar Concentric Rings */}
              <div className="absolute w-44 h-44 rounded-full border border-stone-800/60 pointer-events-none" />
              <div className="absolute w-72 h-72 rounded-full border border-stone-800/40 pointer-events-none" />

              {/* Center Drop Zone with Dashed Circle & Pin */}
              <div className="relative flex items-center justify-center">
                {/* Dashed Circle: Radius shown as dashed circle */}
                <div
                  style={{
                    width: `${Math.min(170, Math.max(80, (Number(form.radius) || 0.25) * 360))}px`,
                    height: `${Math.min(170, Math.max(80, (Number(form.radius) || 0.25) * 360))}px`,
                  }}
                  className="border-2 border-dashed border-[#22C55E] bg-[#22C55E]/10 rounded-full flex items-center justify-center transition-all duration-300 relative pointer-events-none"
                >
                  <span className="absolute inset-0 rounded-full border border-[#22C55E]/30 animate-ping opacity-30" />
                </div>

                {/* Pin (Updates when location is typed) */}
                <div className="absolute flex flex-col items-center pointer-events-none">
                  {/* Floating Location Callout Bubble */}
                  <div className="mb-1 -translate-y-2 bg-stone-900/95 border border-emerald-500/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-2xl flex items-center gap-1.5 whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="max-w-[220px] truncate">
                      {form.location.trim() ? form.location : "Pin: Set Drop Location"}
                    </span>
                  </div>

                  {/* Pin Marker */}
                  <div className="relative flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#22C55E] fill-[#22C55E] filter drop-shadow-[0_2px_10px_rgba(34,197,94,0.7)]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-black absolute top-2" />
                  </div>
                </div>
              </div>

              {/* Map UI Badges */}
              <div className="absolute top-2.5 left-3 flex items-center gap-1.5 text-[10px] font-mono text-stone-400 bg-stone-950/80 backdrop-blur px-2 py-0.5 rounded border border-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                <span>GEOFENCE: {form.borough.toUpperCase()}</span>
              </div>

              <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[10px] font-mono text-stone-400 bg-stone-950/80 backdrop-blur px-2 py-0.5 rounded border border-stone-800">
                <span className="text-emerald-400">● GPS LOCK</span>
                <span>40.7128°N, 74.0060°W</span>
              </div>

              <div className="absolute bottom-2.5 left-3 text-[10px] text-stone-400 bg-stone-950/80 backdrop-blur px-2 py-0.5 rounded border border-stone-800">
                Radius: <span className="text-white font-semibold">{form.radius || "0.25"} mi</span> ({Math.round((Number(form.radius) || 0.25) * 5280)} ft)
              </div>

              <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[9px] font-mono font-bold bg-emerald-950/80 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                DARK CARTO VECTOR
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Borough
            </label>
            <Select
              value={form.borough}
              onChange={(e) => setForm({ ...form, borough: e.target.value })}
            >
              <option>Manhattan</option>
              <option>Brooklyn</option>
              <option>Queens</option>
              <option>Bronx</option>
              <option>Staten Island</option>
            </Select>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Prize Amount ($ USD)
            </label>
            <Input
              type="number"
              value={form.prize}
              onChange={(e) => setForm({ ...form, prize: e.target.value })}
              placeholder="500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Radius (miles)
            </label>
            <Input
              type="number"
              step="0.05"
              value={form.radius}
              onChange={(e) => setForm({ ...form, radius: e.target.value })}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Duration (minutes)
            </label>
            <Input
              type="number"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Free Clue (Borough Level)
            </label>
            <Input
              value={form.freeHint}
              onChange={(e) => setForm({ ...form, freeHint: e.target.value })}
              placeholder="e.g. Look beneath the historic triumphal arch..."
            />
          </div>

          <div className="col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Premium Exclusive Clue
            </label>
            <Textarea
              value={form.premiumHint}
              onChange={(e) => setForm({ ...form, premiumHint: e.target.value })}
              placeholder="Precise landmark details, visual cues, and GPS accuracy beacon..."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 2. DEALS
// ─────────────────────────────────────────────────────────────────
export function Deals() {
  const { toast } = useToast();
  const [deals, setDeals] = useState(DEALS);
  const [selectedDealIds, setSelectedDealIds] = useState<string[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<(typeof DEALS)[0] | null>(null);

  const toggleStatus = (id: string) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "Live" ? ("Paused" as const) : ("Live" as const) }
          : d
      )
    );
    const deal = deals.find((d) => d.id === id);
    toast(
      deal?.status === "Live" ? `${deal.name} paused` : `${deal?.name} activated!`,
      deal?.status === "Live" ? "error" : "success"
    );
  };

  return (
    <div className="animate-fade space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Partner Deals</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Partner Business Deals & Perks
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Partner Deals
          </div>
          <p className="text-xs text-stone-500">
            Local business promotions, discounts, and hunt redemption spots.
          </p>
        </div>
        <Button
          variant="green"
          size="sm"
          onClick={() => {
            setEditing(null);
            setShowAdd(true);
          }}
        >
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Business Partner
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Active Partners
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">
              {STATS.activePartners}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="green">+5% this month</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Live Deals
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">
              {deals.filter((d) => d.status === "Live").length}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="blue">Active in app</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Redeemed Today
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Gift className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">
              {STATS.dealsToday.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="purple">+18% vs yesterday</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="py-4 px-4 sm:px-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 space-y-0 bg-stone-50/40">
          <div>
            <CardTitle className="text-sm">Partner Businesses</CardTitle>
            <CardDescription>
              All merchant offers linked with hunt drop checkpoints.
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-stone-500 self-start sm:self-auto">
            {deals.length} Vendors
          </Badge>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-4">
                <input
                  type="checkbox"
                  checked={selectedDealIds.length === deals.length && deals.length > 0}
                  onChange={() => {
                    if (selectedDealIds.length === deals.length) {
                      setSelectedDealIds([]);
                    } else {
                      setSelectedDealIds(deals.map((d) => d.id));
                    }
                  }}
                  className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </TableHead>
              <TableHead>Business</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Promotion Deal</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="text-right pr-6 w-[170px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.length === 0 ? (
              <TableEmptyState
                colSpan={8}
                icon={Tag}
                title="No partner deals"
                subtitle="Add business promotions or discount partnerships."
                actionLabel="Add Business Partner"
                onAction={() => {
                  setEditing(null);
                  setShowAdd(true);
                }}
              />
            ) : (
              deals.map((d) => (
                <TableRow key={d.id}>
                  <TableCell className="pl-4">
                    <input
                      type="checkbox"
                      checked={selectedDealIds.includes(d.id)}
                      onChange={() => {
                        setSelectedDealIds((prev) =>
                          prev.includes(d.id)
                            ? prev.filter((id) => id !== d.id)
                            : [...prev, d.id]
                        );
                      }}
                      className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{d.icon}</span>
                      <span className="font-semibold text-xs text-stone-900">{d.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-stone-500">{d.category}</TableCell>
                  <TableCell className="text-xs font-medium text-stone-800">{d.deal}</TableCell>
                  <TableCell className="text-xs text-stone-400">{d.distance}</TableCell>
                  <TableCell>
                    <StatusBadge status={d.status} dot={d.status === "Live"} />
                  </TableCell>
                  <TableCell className="text-xs text-stone-400">{d.expires}</TableCell>
                  <TableCell className="text-right pr-6 w-[170px]">
                    <div className="flex items-center justify-end gap-[6px]">
                      <ActionButton
                        variant={d.status === "Live" ? "danger" : "primary"}
                        onClick={() => toggleStatus(d.id)}
                      >
                        {d.status === "Live" ? "Pause" : "Activate"}
                      </ActionButton>
                      <ActionButton
                        variant="secondary"
                        onClick={() => {
                          setEditing(d);
                          setShowAdd(true);
                        }}
                      >
                        Edit
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <FloatingBulkBar
        selectedCount={selectedDealIds.length}
        onClear={() => setSelectedDealIds([])}
        actions={
          <>
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => {
                toast(`Activated ${selectedDealIds.length} partner deals!`, "success");
                setSelectedDealIds([]);
              }}
            >
              Batch Activate
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-stone-800 text-white border-stone-700 hover:bg-stone-700"
              onClick={() => {
                toast(`Exported details for ${selectedDealIds.length} partner deals`, "info");
                setSelectedDealIds([]);
              }}
            >
              Export CSV
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setDeals((prev) => prev.filter((d) => !selectedDealIds.includes(d.id)));
                setSelectedDealIds([]);
                toast("Selected deals removed", "info");
              }}
            >
              Delete
            </Button>
          </>
        }
      />

      <Modal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        title={editing ? `Edit — ${editing.name}` : "🏪 Add Partner Business"}
        wide
        footer={
          <div className="flex justify-end gap-2 w-full">
            <Button variant="outline" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
            <Button
              variant="green"
              onClick={() => {
                toast(editing ? "Deal updated!" : "Partner business added!", "success");
                setShowAdd(false);
              }}
            >
              {editing ? "Save Changes" : "Create Deal"}
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Business Name
            </label>
            <Input defaultValue={editing?.name} placeholder="e.g. Joe's Pizza" />
          </div>
          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Category
            </label>
            <Select>
              <option>Food & Drink</option>
              <option>Coffee & Cafe</option>
              <option>Fitness</option>
              <option>Entertainment</option>
              <option>Retail</option>
            </Select>
          </div>
          <div className="col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Deal Description
            </label>
            <Input
              defaultValue={editing?.deal}
              placeholder="e.g. Free Garlic Knots with any large pizza purchase"
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-bold text-stone-700 block mb-1.5">
              Address
            </label>
            <Input placeholder="123 Broadway, Manhattan, NY 10007" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 3. SWEEPSTAKES (Exported from dedicated page)
// ─────────────────────────────────────────────────────────────────
export { Sweepstakes } from "./Sweepstakes";


// ─────────────────────────────────────────────────────────────────
// 4. MERCH
// ─────────────────────────────────────────────────────────────────
export function Merch() {
  const { toast } = useToast();
  const [products, setProducts] = useState(PRODUCTS);
  const [selectedMerchIds, setSelectedMerchIds] = useState<string[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [catFilter, setCatFilter] = useState("All");

  const filtered = products.filter(
    (p) => catFilter === "All" || p.category === catFilter
  );

  return (
    <div className="animate-fade space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Official Merch Store</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Merchandise & Apparel Catalog
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Official Merch Store
          </div>
          <p className="text-xs text-stone-500">
            Exclusive hunter gear, member discounts, stock levels, and fulfillment.
          </p>
        </div>
        <Button variant="green" size="sm" onClick={() => setShowAdd(true)}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Active Products
            </CardTitle>
            <Package className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">
              {products.filter((p) => p.status !== "Hidden").length}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Live in store</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Orders This Month
            </CardTitle>
            <ShoppingBag className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">847</div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="green">+18% growth</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Merch Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-emerald-700">$18,240</div>
            <div className="text-[11px] text-stone-400 mt-1">Gross sales</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Low Stock Alerts
            </CardTitle>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-amber-600">
              {products.filter((p) => p.status === "Low Stock").length}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Needs restock</div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="py-4 px-4 sm:px-5 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-3 space-y-0 bg-stone-50/40">
          <div>
            <CardTitle className="text-sm">Gear Catalog</CardTitle>
            <CardDescription>
              Inventory quantities, SKU mappings, and subscriber pricing.
            </CardDescription>
          </div>
          <div className="overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <Tabs value={catFilter} onValueChange={setCatFilter}>
              <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Apparel">Apparel</TabsTrigger>
                <TabsTrigger value="Accessories">Accessories</TabsTrigger>
                <TabsTrigger value="Limited Edition">Limited Edition</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-4">
                <input
                  type="checkbox"
                  checked={selectedMerchIds.length === filtered.length && filtered.length > 0}
                  onChange={() => {
                    if (selectedMerchIds.length === filtered.length) {
                      setSelectedMerchIds([]);
                    } else {
                      setSelectedMerchIds(filtered.map((p) => p.id));
                    }
                  }}
                  className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Retail Price</TableHead>
              <TableHead>Member Price</TableHead>
              <TableHead>Stock Level</TableHead>
              <TableHead>Total Sold</TableHead>
              <TableHead>Inventory Status</TableHead>
              <TableHead className="text-right pr-6 w-[130px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableEmptyState
                colSpan={8}
                icon={Package}
                title="No merchandise found"
                subtitle="No products match the selected category filter."
                actionLabel="Reset Filter"
                onAction={() => setCatFilter("All")}
              />
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="pl-4">
                    <input
                      type="checkbox"
                      checked={selectedMerchIds.includes(p.id)}
                      onChange={() => {
                        setSelectedMerchIds((prev) =>
                          prev.includes(p.id)
                            ? prev.filter((id) => id !== p.id)
                            : [...prev, p.id]
                        );
                      }}
                      className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{p.icon}</span>
                      <div>
                        <div className="font-semibold text-xs text-stone-900">{p.name}</div>
                        <div className="text-[11px] text-stone-400">
                          {p.category} · {p.sku}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-stone-900">
                    ${p.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs font-bold text-emerald-700">
                    ${(p.price * (1 - p.memberDiscount / 100)).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-xs font-bold">
                    <span
                      className={
                        p.stock < 15 ? "text-amber-600" : "text-stone-800"
                      }
                    >
                      {p.stock} units
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-stone-600">{p.orders}</TableCell>
                  <TableCell>
                    <StatusBadge status={p.status} dot={p.status === "Active"} />
                  </TableCell>
                  <TableCell className="text-right pr-6 w-[130px]">
                    <div className="flex items-center justify-end">
                      <ActionButton variant="secondary" onClick={() => setShowAdd(true)}>
                        Edit Product
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <FloatingBulkBar
        selectedCount={selectedMerchIds.length}
        onClear={() => setSelectedMerchIds([])}
        actions={
          <>
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => {
                toast(`Restocked inventory for ${selectedMerchIds.length} products!`, "success");
                setSelectedMerchIds([]);
              }}
            >
              Batch Restock
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-stone-800 text-white border-stone-700 hover:bg-stone-700"
              onClick={() => {
                toast(`Exported inventory for ${selectedMerchIds.length} items`, "info");
                setSelectedMerchIds([]);
              }}
            >
              Export CSV
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setProducts((prev) => prev.filter((p) => !selectedMerchIds.includes(p.id)));
                setSelectedMerchIds([]);
                toast("Selected products removed", "info");
              }}
            >
              Archive
            </Button>
          </>
        }
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 5. ORDERS
// ─────────────────────────────────────────────────────────────────
export function Orders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState(ORDERS);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);

  const shipOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: "Shipped" as const } : o))
    );
    toast("Order marked as shipped! Tracking emailed", "success");
  };

  return (
    <div className="animate-fade space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Merch Orders</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Customer Orders & Fulfillment
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Merch Orders
          </div>
          <p className="text-xs text-stone-500">
            Dispatch apparel orders, manage shipping carrier tracking, and print labels.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Total Orders
            </CardTitle>
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">847</div>
            <div className="text-[11px] text-stone-400 mt-1">+18% this month</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Processing
            </CardTitle>
            <Clock className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-amber-600">
              {orders.filter((o) => o.status === "Processing").length}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Pending dispatch</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Delivered
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-emerald-600">
              {orders.filter((o) => o.status === "Delivered").length}
            </div>
            <div className="text-[11px] text-stone-400 mt-1">Confirmed delivery</div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="py-4 px-4 sm:px-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 space-y-0 bg-stone-50/40">
          <div>
            <CardTitle className="text-sm">Recent Order Shipments</CardTitle>
            <CardDescription>
              Orders awaiting packaging, in transit, or completed.
            </CardDescription>
          </div>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-4">
                <input
                  type="checkbox"
                  checked={selectedOrderIds.length === orders.length && orders.length > 0}
                  onChange={() => {
                    if (selectedOrderIds.length === orders.length) {
                      setSelectedOrderIds([]);
                    } else {
                      setSelectedOrderIds(orders.map((o) => o.id));
                    }
                  }}
                  className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Ordered Items</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right pr-6 w-[120px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableEmptyState
                colSpan={8}
                icon={ShoppingBag}
                title="No customer orders"
                subtitle="All apparel and merchandise orders have been processed."
              />
            ) : (
              orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="pl-4">
                    <input
                      type="checkbox"
                      checked={selectedOrderIds.includes(o.id)}
                      onChange={() => {
                        setSelectedOrderIds((prev) =>
                          prev.includes(o.id)
                            ? prev.filter((id) => id !== o.id)
                            : [...prev, o.id]
                        );
                      }}
                      className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="font-mono font-bold text-xs text-stone-900">
                    {o.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar initials={o.avatar} size="sm" />
                      <span className="font-semibold text-xs text-stone-900">
                        {o.customer}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-stone-600">{o.items}</TableCell>
                  <TableCell className="font-bold text-xs text-stone-900">
                    ${o.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={o.status} dot={o.status === "Processing"} />
                  </TableCell>
                  <TableCell className="text-xs text-stone-400">{o.date}</TableCell>
                  <TableCell className="text-right pr-6 w-[120px]">
                    <div className="flex items-center justify-end">
                      {o.status === "Processing" && (
                        <ActionButton
                          variant="primary"
                          onClick={() => shipOrder(o.id)}
                        >
                          <Truck className="w-3 h-3 mr-1" /> Ship
                        </ActionButton>
                      )}
                      {o.status === "Shipped" && (
                        <ActionButton
                          variant="secondary"
                          onClick={() => toast("Tracking opened", "info")}
                        >
                          Track
                        </ActionButton>
                      )}
                      {o.status === "Delivered" && (
                        <ActionButton
                          variant="secondary"
                          onClick={() => toast(`Order #${o.id} details`, "info")}
                        >
                          Complete
                        </ActionButton>
                      )}
                      {o.status !== "Processing" && o.status !== "Shipped" && o.status !== "Delivered" && (
                        <ActionButton
                          variant="secondary"
                          onClick={() => toast(`Order #${o.id} details`, "info")}
                        >
                          Details
                        </ActionButton>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <FloatingBulkBar
        selectedCount={selectedOrderIds.length}
        onClear={() => setSelectedOrderIds([])}
        actions={
          <>
            <Button
              variant="default"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => {
                toast(`Marked ${selectedOrderIds.length} orders as shipped!`, "success");
                setSelectedOrderIds([]);
              }}
            >
              Batch Ship
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-stone-800 text-white border-stone-700 hover:bg-stone-700"
              onClick={() => {
                toast(`Printed packing slips for ${selectedOrderIds.length} orders`, "info");
                setSelectedOrderIds([]);
              }}
            >
              Print Slips
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                setOrders((prev) => prev.filter((o) => !selectedOrderIds.includes(o.id)));
                setSelectedOrderIds([]);
                toast("Selected orders removed", "info");
              }}
            >
              Archive
            </Button>
          </>
        }
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 6. PERKS
// ─────────────────────────────────────────────────────────────────
export function Perks() {
  const { toast } = useToast();
  const [events, setEvents] = useState(EVENTS);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [cards, setCards] = useState(OPPORTUNITY_CARDS);
  const [showCreate, setShowCreate] = useState(false);

  const toggleCard = (id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
    toast("Perk card visibility updated", "info");
  };

  return (
    <div className="animate-fade space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Perks & Opportunities</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Subscriber Perks & Opportunity Cards
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Perks & Opportunities
          </div>
          <p className="text-xs text-stone-500">
            Configure premium webinars, workshops, mixers, and unlockable opportunity cards.
          </p>
        </div>
        <Button variant="green" size="sm" onClick={() => setShowCreate(true)}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Create Community Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Table */}
        <Card className="overflow-hidden">
          <CardHeader className="py-4 px-4 sm:px-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 space-y-0 bg-stone-50/40">
            <CardTitle className="text-sm">Community Events</CardTitle>
            <Badge variant="outline" className="self-start sm:self-auto">{events.length} Active</Badge>
          </CardHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 pl-4">
                  <input
                    type="checkbox"
                    checked={selectedEventIds.length === events.length && events.length > 0}
                    onChange={() => {
                      if (selectedEventIds.length === events.length) {
                        setSelectedEventIds([]);
                      } else {
                        setSelectedEventIds(events.map((e) => e.id));
                      }
                    }}
                    className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                </TableHead>
                <TableHead>Event & Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>RSVPs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6 w-[160px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.length === 0 ? (
                <TableEmptyState
                  colSpan={6}
                  icon={Sparkles}
                  title="No community events"
                  subtitle="Schedule upcoming workshops, mixers, or webinars."
                  actionLabel="Create Community Event"
                  onAction={() => setShowCreate(true)}
                />
              ) : (
                events.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="pl-4">
                      <input
                        type="checkbox"
                        checked={selectedEventIds.includes(e.id)}
                        onChange={() => {
                          setSelectedEventIds((prev) =>
                            prev.includes(e.id)
                              ? prev.filter((id) => id !== e.id)
                              : [...prev, e.id]
                          );
                        }}
                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-xs text-stone-900">{e.name}</div>
                      <div className="text-[11px] text-stone-400">{e.location}</div>
                    </TableCell>
                    <TableCell className="text-xs text-stone-500">{e.date}</TableCell>
                    <TableCell className="text-xs font-bold text-stone-800">
                      {e.rsvps}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={e.status} dot={e.status === "Live"} />
                    </TableCell>
                    <TableCell className="text-right pr-6 w-[160px]">
                      <div className="flex items-center justify-end gap-[6px]">
                        <ActionButton
                          variant="secondary"
                          onClick={() => toast(`Editing ${e.name}`, "info")}
                        >
                          Edit
                        </ActionButton>
                        <ActionButton
                          variant="danger"
                          onClick={() => toast(`Cancelled ${e.name}`, "error")}
                        >
                          Cancel
                        </ActionButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

        <FloatingBulkBar
          selectedCount={selectedEventIds.length}
          onClear={() => setSelectedEventIds([])}
          actions={
            <>
              <Button
                variant="default"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => {
                  toast(`Published ${selectedEventIds.length} community events!`, "success");
                  setSelectedEventIds([]);
                }}
              >
                Publish Selected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setEvents((prev) => prev.filter((e) => !selectedEventIds.includes(e.id)));
                  setSelectedEventIds([]);
                  toast("Selected events removed", "info");
                }}
              >
                Cancel Events
              </Button>
            </>
          }
        />

        {/* Opportunity Cards */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Opportunity Cards in App</CardTitle>
            <CardDescription>
              Toggle premium feature cards visible in member dashboards.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {cards.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-3.5 bg-stone-50/80 rounded-xl border border-stone-200/60"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <div className="font-bold text-xs text-stone-900">{c.name}</div>
                    <div className="text-[11px] text-stone-400">{c.access}</div>
                  </div>
                </div>
                <Switch
                  checked={c.active}
                  onCheckedChange={() => toggleCard(c.id)}
                />
              </div>
            ))}
            <Button
              variant="green"
              className="w-full justify-center mt-2"
              onClick={() => toast("Perks updated for all mobile users!", "success")}
            >
              Publish Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 7. MAP & LOCATIONS
// ─────────────────────────────────────────────────────────────────
export function MapLocations() {
  const { toast } = useToast();
  const [mapView, setMapView] = useState<"pin" | "heat">("pin");
  const [selectedPinIds, setSelectedPinIds] = useState<string[]>([]);

  const BOROUGH_PERFORMANCE = [
    {
      borough: "Manhattan",
      activity: 42,
      barColor: "#22C55E",
      badge: "🟢 High",
      badgeCls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      sub: "Best performing borough",
    },
    {
      borough: "Brooklyn",
      activity: 28,
      barColor: "#22C55E",
      badge: "🟢 High",
      badgeCls: "bg-emerald-50 text-emerald-700 border-emerald-200",
      sub: "Strong engagement",
    },
    {
      borough: "Queens",
      activity: 18,
      barColor: "#F59E0B",
      badge: "🟡 Medium",
      badgeCls: "bg-amber-50 text-amber-700 border-amber-200",
      sub: "Growth opportunity",
    },
    {
      borough: "Bronx",
      activity: 8,
      barColor: "#F97316",
      badge: "🟠 Low",
      badgeCls: "bg-orange-50 text-orange-700 border-orange-200",
      sub: "Needs more drops",
    },
  ];

  return (
    <div className="animate-fade space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Map & GPS Geofences</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Interactive Geofence & Partner Radar
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Map & Locations
          </div>
          <p className="text-xs text-stone-500">
            Live beacon telemetry, radar radii, and verified discovery drop zones.
          </p>
        </div>
      </div>

      {/* ── ADDITION 1: VIEW MODE TOGGLE & NOTE ABOVE MAP PREVIEW ── */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 shadow-xs">
              <button
                type="button"
                onClick={() => setMapView("pin")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all",
                  mapView === "pin"
                    ? "bg-white text-stone-900 shadow-xs font-bold"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                <span>📍</span> Pin View
              </button>
              <button
                type="button"
                onClick={() => setMapView("heat")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all",
                  mapView === "heat"
                    ? "bg-white text-stone-900 shadow-xs font-bold"
                    : "text-stone-500 hover:text-stone-900"
                )}
              >
                <span>🔥</span> Heat Map View
              </button>
            </div>
            <p className="text-xs text-stone-500 mt-1.5 italic">
              Use heat map to choose optimal next drop locations
            </p>
          </div>
          <div className="text-xs font-medium text-stone-400 hidden sm:block">
            {mapView === "heat"
              ? "🔥 Heat Map Mode: Density Hotspots"
              : "📍 Pin Mode: Live Active Beacons"}
          </div>
        </div>

        {/* ── MAP PREVIEW CONTAINER (With Heat Map / Pin View overlays & Bottom-Left Legend) ── */}
        <div className="bg-[#08150A] rounded-2xl overflow-hidden h-80 relative border border-emerald-950 shadow-inner select-none transition-all duration-300">
          {/* Subtle Carto Radar Grid Pattern */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,197,94,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,0.15) 1px,transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Top-Right Telemetry Badge */}
          <div className="absolute top-4 right-4 z-20 bg-[#08150A]/90 backdrop-blur border border-emerald-500/30 px-3 py-1 rounded-full shadow-lg">
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {mapView === "heat"
                ? "Hunter Density Analysis — Live Aggregation"
                : "Active Radar Beacon — Manhattan"}
            </span>
          </div>

          {/* ── PIN VIEW CONTENT ── */}
          {mapView === "pin" && (
            <div className="absolute inset-0 animate-fade">
              {/* Concentric rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border border-emerald-500/20 rounded-full flex items-center justify-center">
                  <div className="w-44 h-44 border border-dashed border-emerald-400/50 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-20 h-20 border border-emerald-300 rounded-full flex items-center justify-center bg-emerald-500/10 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                      <span className="text-[11px] font-black text-emerald-400">
                        DROP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pins */}
              <div className="absolute group cursor-pointer" style={{ top: "32%", left: "30%" }}>
                <span className="text-2xl filter drop-shadow hover:scale-125 transition-transform inline-block">
                  📍
                </span>
                <span className="absolute left-6 top-0 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow border border-emerald-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Downtown Drop #183
                </span>
              </div>
              <div className="absolute group cursor-pointer" style={{ top: "46%", right: "30%" }}>
                <span className="text-2xl filter drop-shadow hover:scale-125 transition-transform inline-block">
                  🍕
                </span>
                <span className="absolute left-6 top-0 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow border border-emerald-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Joe's Pizza Perk
                </span>
              </div>
              <div className="absolute group cursor-pointer" style={{ top: "66%", left: "44%" }}>
                <span className="text-2xl filter drop-shadow hover:scale-125 transition-transform inline-block">
                  ☕
                </span>
                <span className="absolute left-6 top-0 bg-stone-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow border border-emerald-500/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Brew & Bean Coffee
                </span>
              </div>
            </div>
          )}

          {/* ── HEAT MAP VIEW OVERLAY ── */}
          {mapView === "heat" && (
            <div className="absolute inset-0 animate-fade">
              {/* Heat Density Hotspot 1: Manhattan (Dark green = highest hunt activity) */}
              <div
                className="absolute w-72 h-72 rounded-full pointer-events-none filter blur-2xl opacity-80 animate-pulse"
                style={{
                  top: "16%",
                  left: "20%",
                  background:
                    "radial-gradient(circle, rgba(21,128,61,0.95) 0%, rgba(34,197,94,0.65) 45%, rgba(22,101,52,0.2) 75%, transparent 100%)",
                }}
              />
              <div
                className="absolute z-10 flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg"
                style={{ top: "34%", left: "28%" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping" />
                <span>Manhattan Hotspot (42% Density)</span>
              </div>

              {/* Heat Density Hotspot 2: Brooklyn (Medium green = moderate activity) */}
              <div
                className="absolute w-56 h-56 rounded-full pointer-events-none filter blur-2xl opacity-75"
                style={{
                  top: "42%",
                  left: "48%",
                  background:
                    "radial-gradient(circle, rgba(34,197,94,0.7) 0%, rgba(22,163,74,0.4) 50%, transparent 80%)",
                }}
              />
              <div
                className="absolute z-10 flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg"
                style={{ top: "54%", left: "54%" }}
              >
                <span>🟢</span>
                <span>Brooklyn Sector (28% Density)</span>
              </div>

              {/* Heat Density Hotspot 3: Queens (Light/transparent = low/medium activity) */}
              <div
                className="absolute w-44 h-44 rounded-full pointer-events-none filter blur-2xl opacity-50"
                style={{
                  top: "22%",
                  right: "18%",
                  background:
                    "radial-gradient(circle, rgba(234,179,8,0.55) 0%, rgba(202,138,4,0.2) 60%, transparent 85%)",
                }}
              />
              <div
                className="absolute z-10 flex items-center gap-1.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg"
                style={{ top: "30%", right: "20%" }}
              >
                <span>🟡</span>
                <span>Queens Cluster (18% Density)</span>
              </div>

              {/* Heat Density Hotspot 4: Bronx (Light/transparent = low activity) */}
              <div
                className="absolute w-36 h-36 rounded-full pointer-events-none filter blur-2xl opacity-40"
                style={{
                  top: "8%",
                  left: "42%",
                  background:
                    "radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 75%)",
                }}
              />
              <div
                className="absolute z-10 flex items-center gap-1.5 bg-stone-900/80 border border-stone-600 text-stone-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow"
                style={{ top: "14%", left: "44%" }}
              >
                <span>⚪</span>
                <span>Bronx Ridge (8% Density)</span>
              </div>
            </div>
          )}

          {/* ── LEGEND (Bottom-Left of Map) ── */}
          <div className="absolute bottom-3 left-3 z-20 bg-[#08150A]/95 backdrop-blur border border-emerald-500/30 rounded-xl px-3 py-2 shadow-xl flex flex-col gap-1 text-stone-200">
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 pb-0.5 border-b border-emerald-900/60">
              Activity Legend
            </span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span>🟢</span>
              <span className="font-semibold text-white">High Activity</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span>🟡</span>
              <span className="font-medium text-stone-300">Medium Activity</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span>⚪</span>
              <span className="font-medium text-stone-400">Low Activity</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── ADDITION 2: BOROUGH PERFORMANCE CARDS (Below the map, above the pins table) ── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-stone-900">
            Borough Performance & Drop Readiness
          </h2>
          <span className="text-xs text-stone-400 italic">
            Metrics help decide optimal location for the next cash drop
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BOROUGH_PERFORMANCE.map((b) => (
            <div
              key={b.borough}
              className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-stone-900">{b.borough}</span>
                  <span
                    className={cn(
                      "text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-2xs",
                      b.badgeCls
                    )}
                  >
                    {b.badge}
                  </span>
                </div>
                <div className="text-2xl font-black text-stone-900 tracking-tight">
                  {b.activity}% <span className="text-xs font-semibold text-stone-400">activity</span>
                </div>
                {/* Bar */}
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden my-3">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${b.activity}%`, backgroundColor: b.barColor }}
                  />
                </div>
              </div>
              <div className="text-xs text-stone-500 font-medium">
                {b.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LOWER SECTION: GEOFENCE PARAMETERS & LIVE RADAR PINS TABLE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Geofence Parameters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Active Drop Zone Address
                </label>
                <Input defaultValue="Financial District, Manhattan, NY" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Discovery Radius (mi)
                  </label>
                  <Input type="number" defaultValue="0.25" step="0.05" />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Borough
                  </label>
                  <Select defaultValue="Manhattan">
                    <option>Manhattan</option>
                    <option>Brooklyn</option>
                    <option>Queens</option>
                  </Select>
                </div>
              </div>
              <Button
                variant="green"
                size="sm"
                onClick={() => toast("Radar coordinates recalibrated!", "success")}
              >
                Update Geofence Beacon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pin Table */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden">
            <CardHeader className="py-4 px-5 border-b border-stone-100 flex-row items-center justify-between space-y-0 bg-stone-50/40">
              <CardTitle className="text-sm">Live Radar Pins</CardTitle>
              <Badge variant="green">
                {DEALS.filter((d) => d.status === "Live").length} Pins Active
              </Badge>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 pl-4">
                    <input
                      type="checkbox"
                      checked={selectedPinIds.length === DEALS.length && DEALS.length > 0}
                      onChange={() => {
                        if (selectedPinIds.length === DEALS.length) {
                          setSelectedPinIds([]);
                        } else {
                          setSelectedPinIds(DEALS.map((d) => d.id));
                        }
                      }}
                      className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                    />
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Attached Deal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right pr-6 w-[120px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DEALS.length === 0 ? (
                  <TableEmptyState
                    colSpan={5}
                    icon={MapPin}
                    title="No radar pins found"
                    subtitle="No active geofence beacons in this area."
                  />
                ) : (
                  DEALS.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="pl-4">
                        <input
                          type="checkbox"
                          checked={selectedPinIds.includes(d.id)}
                          onChange={() => {
                            setSelectedPinIds((prev) =>
                              prev.includes(d.id)
                                ? prev.filter((id) => id !== d.id)
                                : [...prev, d.id]
                            );
                          }}
                          className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-base">{d.icon}</span>
                          <span className="font-semibold text-xs text-stone-900">{d.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-stone-500 max-w-[140px] truncate">
                        {d.deal}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={d.status} dot={d.status === "Live"} />
                      </TableCell>
                      <TableCell className="text-right pr-6 w-[120px]">
                        <div className="flex items-center justify-end">
                          <ActionButton
                            variant="secondary"
                            onClick={() => toast(`${d.name} pin recalibrated`, "info")}
                          >
                            Pin Info
                          </ActionButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>

          <FloatingBulkBar
            selectedCount={selectedPinIds.length}
            onClear={() => setSelectedPinIds([])}
            actions={
              <>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => {
                    toast(`Recalibrated GPS radar beacon for ${selectedPinIds.length} pins!`, "success");
                    setSelectedPinIds([]);
                  }}
                >
                  Recalibrate Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-stone-800 text-white border-stone-700 hover:bg-stone-700"
                  onClick={() => {
                    toast(`Exported coordinates for ${selectedPinIds.length} radar pins`, "info");
                    setSelectedPinIds([]);
                  }}
                >
                  Export Coordinates
                </Button>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 8. NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────
export function Notifications() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    audience: "All Users (248,439)",
    type: "Hunt Alert 🎯",
    title: "",
    message: "",
  });

  const TEMPLATES = [
    {
      id: "t1",
      emoji: "🎯",
      name: "Hunt Drop Active",
      preview: "Win $500 cash in Downtown...",
      audience: "All Users (248,439)",
      type: "Hunt Alert 🎯",
      title: "🎯 Hunt Drop Active NOW in Manhattan!",
      message: "Win $500 cash in Downtown Manhattan! First clue is now live. Open the app to check your radar beacon and claim the bounty.",
    },
    {
      id: "t2",
      emoji: "🏆",
      name: "Winner Announced",
      preview: "@CashQueen23 just found...",
      audience: "All Users (248,439)",
      type: "Winner Announcement 🏆",
      title: "🏆 We Have a Winner!",
      message: "@CashQueen23 just found the $400 cash bounty in Central Park! Check out the victory photo and get ready for the next drop.",
    },
    {
      id: "t3",
      emoji: "🎰",
      name: "Sunday Draw Tonight",
      preview: "The weekly $1,000 draw is...",
      audience: "All Users (248,439)",
      type: "Hunt Alert 🎯",
      title: "🎰 Weekly $1,000 Cash Draw Tonight!",
      message: "The weekly $1,000 draw is happening live tonight at 8:00 PM EST. All active subscribers are automatically enrolled with free tickets.",
    },
    {
      id: "t4",
      emoji: "🎉",
      name: "New Event Live",
      preview: "Credit Repair Workshop...",
      audience: "Premium Subscribers (2,847)",
      type: "Event Reminder 🎉",
      title: "🎉 Live Event: Credit Repair Workshop",
      message: "Credit Repair Workshop & Wealth Building session starts in 1 hour. Free live access for all active members.",
    },
    {
      id: "t5",
      emoji: "💳",
      name: "Trial Ending Soon",
      preview: "Your 7-day free trial ends...",
      audience: "Free Hunters Only",
      type: "Deal Alert 🏷️",
      title: "💳 Keep Your Pro Hunter Radar Active",
      message: "Your 7-day free trial ends in 24 hours. Don't lose early clue drops, 2x XP multipliers, and automatic weekly cash sweepstakes entries.",
    },
  ];

  const handleUseTemplate = (t: typeof TEMPLATES[0]) => {
    setForm({
      audience: t.audience,
      type: t.type,
      title: t.title,
      message: t.message,
    });
    toast(`Applied "${t.name}" template! 📋`, "info");
  };

  return (
    <div className="animate-fade space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Push Notifications</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Mobile Push Broadcast Center
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Push Notifications
          </div>
          <p className="text-xs text-stone-500">
            Send instant alerts, borough drop notices, and winner announcements.
          </p>
        </div>
      </div>

      {/* ADDITION 1 — Template Library (Above the compose form) */}
      <Card className="overflow-hidden border-stone-200/80">
        <CardHeader className="py-3.5 px-5 border-b border-stone-100 bg-stone-50/50">
          <CardTitle className="text-sm">Quick Templates</CardTitle>
          <CardDescription>Click to auto-fill the form below</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {TEMPLATES.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-stone-200/90 rounded-[10px] p-3.5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-emerald-500/50 transition-all duration-150 group"
              >
                <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {t.emoji}
                </div>
                <div className="text-xs font-bold text-stone-900 mb-1 truncate w-full">
                  {t.name}
                </div>
                <div
                  className="text-[11px] text-stone-400 truncate w-full mb-3"
                  title={t.preview}
                >
                  {t.preview}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs h-7.5 border-stone-200 hover:border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50/40 font-semibold"
                  onClick={() => handleUseTemplate(t)}
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Compose Push Notification</CardTitle>
            <CardDescription>
              Dispatches via Apple APNs & Firebase Cloud Messaging (FCM).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Target Audience
              </label>
              <Select
                value={form.audience}
                onChange={(e) => setForm({ ...form, audience: e.target.value })}
              >
                <option>All Users (248,439)</option>
                <option>Premium Subscribers (2,847)</option>
                <option>Free Hunters Only</option>
                <option>Manhattan Radius</option>
              </Select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Category
              </label>
              <Select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option>Hunt Alert 🎯</option>
                <option>Deal Alert 🏷️</option>
                <option>Winner Announcement 🏆</option>
                <option>Event Reminder 🎉</option>
              </Select>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Notification Headline
              </label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. 🎯 Hunt Drop Active NOW in Manhattan!"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                Notification Message Body
              </label>
              <Textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="First clue is now live. Open the app to check your radar..."
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="green"
                className="flex-1 justify-center"
                onClick={() => {
                  if (!form.title || !form.message) {
                    toast("Please fill in title and message", "error");
                    return;
                  }
                  toast(`Broadcast sent to ${form.audience}! 📢`, "success");
                  setForm({ ...form, title: "", message: "" });
                }}
              >
                <Send className="w-3.5 h-3.5 mr-1.5" />
                Send Broadcast Now
              </Button>
              <Button
                variant="outline"
                className="flex-1 justify-center"
                onClick={() => toast("Notification scheduled", "info")}
              >
                Schedule Delivery
              </Button>
            </div>

            {/* ADDITION 2 — Delivery Stats card (Below the send button area) */}
            <div className="pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2.5">
                <div className="text-xs font-bold text-stone-900">
                  Last Notification Performance
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  Sent 2h ago
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Stat 1: Sent */}
                <div className="bg-white rounded-[10px] p-3 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">📤</span>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Sent
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-bold text-stone-900 leading-tight">
                      248,439
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      100%
                    </div>
                  </div>
                </div>

                {/* Stat 2: Delivered */}
                <div className="bg-white rounded-[10px] p-3 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">✅</span>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Delivered
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-bold text-stone-900 leading-tight">
                      246,891
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      99.4%
                    </div>
                  </div>
                </div>

                {/* Stat 3: Opened */}
                <div className="bg-white rounded-[10px] p-3 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">👁️</span>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Opened
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-bold text-stone-900 leading-tight">
                      182,340
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      73.8%
                    </div>
                  </div>
                </div>

                {/* Stat 4: Clicked */}
                <div className="bg-white rounded-[10px] p-3 border border-stone-200/90 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-base">👆</span>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
                      Clicked
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-bold text-stone-900 leading-tight">
                      44,219
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      17.8%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History */}
        <Card className="overflow-hidden">
          <CardHeader className="py-4 px-5 border-b border-stone-100 flex-row items-center justify-between space-y-0 bg-stone-50/40">
            <CardTitle className="text-sm">Broadcast Log</CardTitle>
            <Badge variant="outline">Delivered</Badge>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {NOTIFICATIONS_SENT.length === 0 ? (
              <EmptyState
                icon={Send}
                title="No broadcast notifications sent"
                subtitle="All sent notifications and borough drop alerts will be logged here."
              />
            ) : (
              NOTIFICATIONS_SENT.map((n) => (
                <div
                  key={n.id}
                  className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/60"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-xs text-stone-900">{n.title}</div>
                    <Badge variant="green">{n.count} sent</Badge>
                  </div>
                  <div className="text-xs text-stone-500 mb-2">{n.body}</div>
                  <div className="text-[10px] text-stone-400 font-mono">
                    {n.audience} · {n.time}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 9. ANALYTICS
// ─────────────────────────────────────────────────────────────────
export function Analytics() {
  const { toast } = useToast();
  return (
    <div className="animate-fade space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Analytics & Metrics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Performance Analytics & Engagement
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Analytics & Reports
          </div>
          <p className="text-xs text-stone-500">
            Growth velocity, user retention, hunt participation, and borough telemetry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Daily Active Users (DAU)
            </CardTitle>
            <BarChart3 className="w-4 h-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">
              {STATS.dau.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="green">+12.8%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Hunt Participation
            </CardTitle>
            <Target className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">
              {STATS.huntParticipation}%
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="blue">Active hunters</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Paywall Conversion
            </CardTitle>
            <Flame className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">
              {STATS.conversion}%
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="gold">Free to Premium</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Monthly Churn
            </CardTitle>
            <RotateCcw className="w-4 h-4 text-stone-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900">{STATS.churn}%</div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="outline">Low Risk</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">User Signups Trend</CardTitle>
            <CardDescription>Daily organic hunter acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={REVENUE_CHART} barSize={26}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F0EB" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#A8A29E" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    background: "#0B0E14",
                    border: "none",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="users" fill="#22C55E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Daily Revenue Trend ($ USD)</CardTitle>
            <CardDescription>
              Subscriptions, Merch, and Sponsor Inflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={REVENUE_CHART}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F0EB" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "#A8A29E" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    background: "#0B0E14",
                    border: "none",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  dot={{ fill: "#10B981", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Borough Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Activity Distribution by Borough</CardTitle>
          <CardDescription>
            Proportion of active scavenger hunters by NYC location
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {BOROUGH_STATS.map((b) => (
            <div key={b.borough} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-stone-700">{b.borough}</span>
                <span className="text-stone-900 font-bold">{b.pct}%</span>
              </div>
              <Progress value={b.pct} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// 10. SETTINGS
// ─────────────────────────────────────────────────────────────────
export function Settings() {
  const { toast } = useToast();
  const [toggles, setToggles] = useState({
    map: true,
    sweep: true,
    referral: true,
    merch: true,
    deals: true,
  });

  return (
    <div className="animate-fade space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>System Configuration</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Platform Settings & Feature Gates
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Settings
          </div>
          <p className="text-xs text-stone-500">
            Global app controls, pricing tiers, API credentials, and legal compliance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">App & Pricing Configuration</CardTitle>
            <CardDescription>
              Values sync live with iOS and Android app clients.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Application Brand Name
              </label>
              <Input defaultValue="MoneyHunt NYC" />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Free Trial Duration (Days)
              </label>
              <Input type="number" defaultValue={7} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Monthly Subscription ($)
                </label>
                <Input type="number" defaultValue={9.99} step="0.01" />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Yearly Subscription ($)
                </label>
                <Input type="number" defaultValue={99.99} step="0.01" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Referral XP Bonus
              </label>
              <Input type="number" defaultValue={500} />
            </div>

            <Button
              variant="green"
              className="w-full justify-center"
              onClick={() => toast("Platform settings saved successfully!", "success")}
            >
              Save Configuration
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Feature Toggles</CardTitle>
              <CardDescription>
                Enable or disable mobile features without submitting app store updates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {(
                Object.entries(toggles) as [keyof typeof toggles, boolean][]
              ).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-2 border-b border-stone-100 last:border-0"
                >
                  <div>
                    <div className="text-xs font-bold text-stone-900 capitalize">
                      {key === "map"
                        ? "GPS Hunt Radar Map"
                        : key === "sweep"
                        ? "Weekly Cash Sweepstakes"
                        : key === "referral"
                        ? "Hunter Referral Rewards"
                        : key === "merch"
                        ? "Official Merch Store"
                        : "Partner Business Deals"}
                    </div>
                  </div>
                  <Switch
                    checked={val}
                    onCheckedChange={(v) => {
                      setToggles((prev) => ({ ...prev, [key]: v }));
                      toast(`${key} toggle updated`, "info");
                    }}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Legal & Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Official Sweepstakes Rules & Eligibility",
                "Hunter Terms of Service & Geofence Waiver",
                "Privacy Policy & Location Data Retention",
              ].map((doc) => (
                <Button
                  key={doc}
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => toast(`Opening ${doc}...`, "info")}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-stone-500" />
                    {doc}
                  </span>
                  <span className="text-stone-400 text-xs">Edit</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Fallback exports for Subscriptions & Payments to prevent breakage
// ─────────────────────────────────────────────────────────────────
export { Subscriptions } from "./Subscriptions";
export function Payments() {
  const { Subscriptions } = require("./Subscriptions");
  return <Subscriptions initialTab="payments" />;
}
