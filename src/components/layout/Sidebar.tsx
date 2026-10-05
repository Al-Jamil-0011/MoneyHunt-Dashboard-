"use client";
import React from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  MapPin,
  Tag,
  Sparkles,
  ChevronRight,
  Map as MapIcon,
  Shirt,
  PackageCheck,
  Trophy,
  CreditCard,
  DollarSign,
  Ticket,
  Bell,
  LogOut,
  Shield,
  X,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: any;
  hasChevron?: boolean;
};

const NAV_SECTIONS: { section: string; items: NavItem[] }[] = [
  {
    section: "OVERVIEW",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "USERS",
    items: [
      { id: "users", label: "Users", icon: UsersIcon },
    ],
  },
  {
    section: "HUNTS",
    items: [
      { id: "hunts", label: "Hunts & Drops", icon: MapPin },
    ],
  },
  {
    section: "DISCOVERY",
    items: [
      { id: "deals", label: "Deals", icon: Tag },
      { id: "perks", label: "Perks", icon: Sparkles, hasChevron: true },
      { id: "map", label: "Map & Locations", icon: MapIcon },
    ],
  },
  {
    section: "COMMERCE",
    items: [
      { id: "merch", label: "Merch", icon: Shirt },
      { id: "orders", label: "Orders", icon: PackageCheck },
    ],
  },
  {
    section: "REWARDS",
    items: [
      { id: "winners", label: "Winners & Rewards", icon: Trophy },
      { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
      { id: "payments", label: "Payments", icon: DollarSign },
    ],
  },
  {
    section: "ENGAGEMENT",
    items: [
      { id: "sweepstakes", label: "Sweepstakes", icon: Ticket },
      { id: "notifications", label: "Notifications", icon: Bell },
    ],
  },
];

export function Sidebar({
  active,
  onNav,
  mobileOpen = false,
  onCloseMobile,
}: {
  active: string;
  onNav: (id: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden animate-fade"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:static flex-shrink-0 bg-[#0B0E14] h-screen flex flex-col border-r border-[#1C232E] select-none transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        } ${
          collapsed ? "lg:w-[60px]" : "w-[240px] lg:w-[210px]"
        }`}
      >
        {/* Brand Header */}
        <div
          className={`border-b border-[#1C232E]/80 flex-shrink-0 transition-all duration-200 ${
            collapsed ? "px-2.5 py-4 flex justify-center" : "px-4 py-4"
          }`}
        >
          <div className="flex items-center justify-between gap-2.5">
            <div
              className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1"
              title="Money Hunt · Admin Console"
              onClick={() => {
                onNav("dashboard");
                onCloseMobile?.();
              }}
            >
              <div className="relative group flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-[0_0_14px_rgba(16,185,129,0.35)] ring-1 ring-emerald-300/30 transition-transform group-hover:scale-105 duration-200">
                  <Shield className="w-4 h-4 fill-white/20 stroke-white" strokeWidth={2.2} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0B0E14]" />
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1 animate-fade">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-extrabold text-white tracking-tight leading-tight">
                      Money Hunt
                    </span>
                  </div>
                  <div className="text-[8.5px] font-bold text-emerald-400/90 tracking-[0.16em] uppercase mt-0.5 flex items-center gap-1">
                    <span>ADMIN CONSOLE</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Close Button (shown on mobile drawer) */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                title="Close Navigation"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-2.5 custom-scrollbar overflow-x-hidden">
          {NAV_SECTIONS.map(({ section, items }) => (
            <div key={section}>
              {!collapsed ? (
                <div className="text-[9px] font-bold text-slate-500 tracking-[0.14em] uppercase px-2 mb-1 animate-fade">
                  {section}
                </div>
              ) : (
                <div className="h-px bg-[#1C232E]/70 my-1.5 mx-1" />
              )}
              <div className="space-y-0.5">
                {items.map((item) => {
                  const isActive = active === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNav(item.id);
                        onCloseMobile?.();
                      }}
                      title={collapsed ? item.label : undefined}
                    className={`w-full group flex items-center rounded-xl text-[12px] font-medium transition-all duration-150 relative text-left cursor-pointer ${
                      collapsed ? "justify-center px-0 py-2.5" : "gap-2.5 px-2.5 py-1.5"
                    } ${
                      isActive
                        ? "bg-[#132A1C] text-[#22C55E] border border-[#22C55E]/40 font-semibold shadow-[0_0_12px_rgba(34,197,94,0.12)]"
                        : "text-slate-400 hover:text-stone-100 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="flex-shrink-0 transition-colors">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-[#22C55E]"
                            : "text-slate-400 group-hover:text-stone-200"
                        }`}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />
                    </span>

                    {!collapsed && (
                      <>
                        <span className="truncate flex-1 tracking-tight">{item.label}</span>
                        {item.hasChevron && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-transform" />
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ── RULE 3: COLLAPSE TOGGLE BUTTON (Above admin profile) ── */}
      <div className="p-2 border-t border-[#1C232E]/80 flex-shrink-0">
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar (« 210px)" : "Collapse sidebar (» 60px)"}
          className={`w-full flex items-center py-1.5 rounded-xl text-slate-400 hover:text-stone-100 hover:bg-white/[0.06] transition-all cursor-pointer ${
            collapsed ? "justify-center px-0" : "gap-2 px-2.5"
          }`}
        >
          <span className="text-sm font-black text-emerald-400 leading-none">
            {collapsed ? "»" : "«"}
          </span>
          {!collapsed && (
            <span className="text-[11px] font-semibold text-slate-400 tracking-tight">
              Collapse sidebar
            </span>
          )}
        </button>
      </div>

      {/* Admin Profile Footer */}
      <div className="p-2 border-t border-[#1C232E]/80 flex-shrink-0">
        <div
          title={collapsed ? "Aisha Rahman · Super Admin" : undefined}
          className={`flex items-center rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-all duration-200 group cursor-pointer ${
            collapsed ? "justify-center p-2" : "gap-2.5 p-2"
          }`}
        >
          <div className="relative flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Aisha Rahman"
              className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/40"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#0B0E14]" />
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0 animate-fade">
                <div className="text-[11.5px] font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                  Aisha Rahman
                </div>
                <div className="text-[9.5px] text-slate-400 font-medium truncate flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Super Admin
                </div>
              </div>
              <button
                title="Log Out"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
