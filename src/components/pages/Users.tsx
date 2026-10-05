"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Button,
  Avatar,
  Modal,
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
  Separator,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  StatusBadge,
  TableEmptyState,
  FloatingBulkBar,
  useToast,
} from "../ui";
import { USERS, User } from "@/lib/data";
import { Users as UsersIcon, ShieldCheck, Ban, Search, Download, UserPlus, Star, MapPin, Calendar, Award } from "lucide-react";

export function Users() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(USERS);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<"All" | "Premium" | "Free" | "Banned">("All");
  const [selected, setSelected] = useState<User | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = users.filter((u) => {
    const ms =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.handle.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const mp =
      planFilter === "All" ||
      (planFilter === "Banned" ? u.status === "Banned" : u.plan === planFilter);
    return ms && mp;
  });

  const banUser = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Banned" as const } : u))
    );
    toast("User restricted / banned", "error");
    setSelected(null);
  };
  const unbanUser = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "Active" as const } : u))
    );
    toast("User status restored to Active", "success");
    setSelected(null);
  };
  const upgradeUser = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, plan: "Premium" as const } : u))
    );
    toast("User upgraded to Premium! 🌟", "success");
    setSelected(null);
  };

  const premiumCount = users.filter((u) => u.plan === "Premium").length;
  const bannedCount = users.filter((u) => u.status === "Banned").length;

  return (
    <div className="animate-fade space-y-6">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Breadcrumb className="mb-1">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Admin Console</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>User Directory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            User Directory & Access Control
          </h1>
          <div className="text-[12px] text-[#9CA3AF] font-medium mt-0.5">
            Admin Console / Users
          </div>
          <p className="text-xs text-stone-500">
            Manage hunter accounts, member tiers, security status, and activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast("Exporting all user profiles to CSV...", "info")}
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV
          </Button>
          <Button
            variant="green"
            size="sm"
            onClick={() => toast("Inviting new user...", "info")}
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
            Invite Hunter
          </Button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:border-stone-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Total Registered Hunters
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <UsersIcon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {users.length.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="green">+12.4%</Badge>
              <span className="text-[11px] text-stone-400">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-stone-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Premium Subscribers
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {premiumCount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="gold">
                {((premiumCount / users.length) * 100).toFixed(1)}% of base
              </Badge>
              <span className="text-[11px] text-stone-400">+8% active growth</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:border-stone-300 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-stone-500">
              Restricted / Banned
            </CardTitle>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <Ban className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-stone-900 tracking-tight">
              {bannedCount.toString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant={bannedCount > 0 ? "red" : "gray"}>
                {bannedCount} flagged
              </Badge>
              <span className="text-[11px] text-stone-400">Security enforcement</span>
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
              placeholder="Search by name, handle, or email..."
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <Tabs
              value={planFilter}
              onValueChange={(val) => setPlanFilter(val as any)}
            >
              <TabsList>
                <TabsTrigger value="All">All ({users.length})</TabsTrigger>
                <TabsTrigger value="Premium">Premium ({premiumCount})</TabsTrigger>
                <TabsTrigger value="Free">Free</TabsTrigger>
                <TabsTrigger value="Banned">Banned ({bannedCount})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Table Card */}
      <Card className="overflow-hidden">
        <CardHeader className="py-4 px-5 border-b border-stone-100 flex-row items-center justify-between space-y-0 bg-stone-50/40">
          <div>
            <CardTitle className="text-sm">Members & Verification Status</CardTitle>
            <CardDescription>
              Showing {filtered.length} member profiles based on current filter.
            </CardDescription>
          </div>
          <Badge variant="outline" className="font-mono text-stone-500">
            Live Records
          </Badge>
        </CardHeader>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-4 pr-1">
                <input
                  type="checkbox"
                  checked={selectedIds.length === filtered.length && filtered.length > 0}
                  onChange={() => {
                    if (selectedIds.length === filtered.length) {
                      setSelectedIds([]);
                    } else {
                      setSelectedIds(filtered.map((u) => u.id));
                    }
                  }}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                />
              </TableHead>
              <TableHead>Hunter Name & Profile</TableHead>
              <TableHead>Subscription Plan</TableHead>
              <TableHead>Hunt Points</TableHead>
              <TableHead>Deals Claimed</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right pr-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableEmptyState
                colSpan={8}
                icon="👥"
                title="No hunters found"
                subtitle="No accounts match your current search or filter."
                actionLabel="Reset Search"
                onAction={() => {
                  setSearch("");
                  setPlanFilter("All");
                }}
              />
            ) : (
              filtered.map((u) => {
                const isChecked = selectedIds.includes(u.id);
                return (
                  <TableRow
                    key={u.id}
                    className={`hover:bg-[#F9FAFB] transition-colors ${
                      isChecked ? "bg-emerald-50/30" : ""
                    }`}
                  >
                    <TableCell className="w-10 pl-4 pr-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          setSelectedIds((prev) =>
                            prev.includes(u.id) ? prev.filter((i) => i !== u.id) : [...prev, u.id]
                          );
                        }}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-[#22C55E]"
                      />
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar initials={u.avatar} size="sm" />
                        <div>
                          <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                            {u.name}
                            {u.plan === "Premium" && (
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {u.handle} · {u.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={u.plan} />
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold text-stone-800">
                        {u.huntPoints.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-stone-400 ml-1 font-medium">XP</span>
                    </TableCell>
                    <TableCell className="text-xs font-medium text-stone-600">
                      {u.deals} redeemed
                    </TableCell>
                    <TableCell className="text-xs text-stone-400">{u.joined}</TableCell>
                    <TableCell>
                      <StatusBadge status={u.status} />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelected(u)}
                        >
                          Profile
                        </Button>
                        {u.status === "Banned" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => unbanUser(u.id)}
                            className="border-green-200 text-green-700 hover:bg-green-50"
                          >
                            Unban
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => banUser(u.id)}
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                          >
                            Ban
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* ── RULE 4: FLOATING BULK BAR ── */}
        <FloatingBulkBar
          selectedCount={selectedIds.length}
          itemLabel="hunter"
          onClear={() => setSelectedIds([])}
          actions={[
            {
              label: "Export Selected",
              variant: "outline",
              onClick: () => {
                toast(`Exported ${selectedIds.length} user profiles`, "success");
                setSelectedIds([]);
              },
            },
            {
              label: "Ban Selected",
              variant: "danger",
              onClick: () => {
                setUsers((prev) =>
                  prev.map((u) =>
                    selectedIds.includes(u.id) ? { ...u, status: "Banned" as const } : u
                  )
                );
                toast(`Restricted ${selectedIds.length} users`, "error");
                setSelectedIds([]);
              },
            },
          ]}
        />

        {/* Shadcn Pagination Bar */}
        <div className="p-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-50/30">
          <span className="text-xs text-stone-500 font-medium">
            Showing <span className="font-bold text-stone-900">1</span> to{" "}
            <span className="font-bold text-stone-900">{filtered.length}</span> of{" "}
            <span className="font-bold text-stone-900">{users.length}</span> entries
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
                <PaginationLink>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>

      {/* User Detail Modal */}
      {selected && (
        <Modal
          open={!!selected}
          onClose={() => setSelected(null)}
          title={`Hunter Profile — ${selected.handle}`}
          wide
          footer={
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] text-stone-400 font-mono">
                User ID: {selected.id}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSelected(null)}>
                  Close
                </Button>
                {selected.plan === "Free" && (
                  <Button variant="green" onClick={() => upgradeUser(selected.id)}>
                    ⭐ Upgrade to Premium
                  </Button>
                )}
                {selected.status === "Banned" ? (
                  <Button variant="green" onClick={() => unbanUser(selected.id)}>
                    Unban Account
                  </Button>
                ) : (
                  <Button variant="destructive" onClick={() => banUser(selected.id)}>
                    Restrict / Ban
                  </Button>
                )}
              </div>
            </div>
          }
        >
          <div className="space-y-5">
            {/* Header info card */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80">
              <Avatar initials={selected.avatar} size="lg" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-stone-900">{selected.name}</h4>
                  <div className="flex gap-1.5">
                    <Badge variant={selected.plan === "Premium" ? "gold" : "gray"}>
                      {selected.plan}
                    </Badge>
                    <Badge variant={selected.status === "Active" ? "green" : "red"}>
                      {selected.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-3">
                  <span>{selected.email}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {selected.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3.5 bg-stone-50/80 rounded-xl border border-stone-100">
                <div className="text-lg font-black text-stone-900">{selected.hunts}</div>
                <div className="text-[11px] text-stone-400 font-medium">Hunts Completed</div>
              </div>
              <div className="text-center p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <div className="text-lg font-black text-emerald-700">${selected.moneySaved}</div>
                <div className="text-[11px] text-emerald-600 font-medium">Money Saved</div>
              </div>
              <div className="text-center p-3.5 bg-amber-50/60 rounded-xl border border-amber-100">
                <div className="text-lg font-black text-amber-700">{selected.huntPoints.toLocaleString()}</div>
                <div className="text-[11px] text-amber-600 font-medium">Earned Points</div>
              </div>
            </div>

            <Separator />

            {/* Detailed metadata */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Member Since</span>
                <span className="font-semibold text-stone-800">{selected.joined}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Next Billing Date</span>
                <span className="font-semibold text-stone-800">{selected.billing}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Partner Deals Claimed</span>
                <span className="font-semibold text-stone-800">{selected.deals} deals</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-500">Friends Referred</span>
                <span className="font-semibold text-stone-800">{selected.referrals} hunters</span>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
