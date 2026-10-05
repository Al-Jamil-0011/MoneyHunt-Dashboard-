"use client";
import React from "react";
import {
  LayoutDashboard,
  Users as UsersIcon,
  MapPin,
  Tag,
  Gift,
  ChevronRight,
  Map as MapIcon,
  ShoppingBag,
  FileText,
  Trophy,
  CreditCard,
  DollarSign,
  Ticket,
  Bell,
  BarChart3,
  Settings as SettingsIcon,
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
      { id: "perks", label: "Perks", icon: Gift, hasChevron: true },
      { id: "map", label: "Map & Locations", icon: MapIcon },
    ],
  },
  {
    section: "COMMERCE",
    items: [
      { id: "merch", label: "Merch", icon: ShoppingBag },
      { id: "orders", label: "Orders", icon: FileText },
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
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "sweepstakes", label: "Sweepstakes", icon: Ticket },
    ],
  },
  {
    section: "INSIGHTS",
    items: [
      { id: "analytics", label: "Analytics", icon: BarChart3 },
      { id: "settings", label: "Settings", icon: SettingsIcon },
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
        className={`fixed inset-y-0 left-0 z-50 lg:static flex-shrink-0 bg-[#111214] h-screen flex flex-col border-r border-[#1F2024] select-none transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        } ${
          collapsed ? "lg:w-[64px]" : "w-[240px] lg:w-[230px]"
        }`}
      >
        {/* ── BRAND HEADER ── */}
        <div
          className={`flex-shrink-0 border-b border-[#1F2024]/70 transition-all duration-200 ${
            collapsed ? "px-2.5 py-4 flex justify-center" : "px-4 pt-4 pb-3.5"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div
              className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
              title="Money Hunt · Admin Console"
              onClick={() => {
                onNav("dashboard");
                onCloseMobile?.();
              }}
            >
              {/* Vibrant Green Shield Logo */}
              <div className="relative group flex-shrink-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-[#22C55E] to-[#16A34A] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(34,197,94,0.35)] ring-1 ring-white/20 transition-transform group-hover:scale-105 duration-200">
                  <div className="relative flex items-center justify-center">
                    <Shield className="w-5 h-5 fill-white stroke-none" />
                    <span className="absolute text-[#16A34A] font-black text-[10px] leading-none">
                      +
                    </span>
                  </div>
                </div>
              </div>

              {!collapsed && (
                <div className="min-w-0 flex-1 animate-fade">
                  <div className="text-[15px] font-bold text-white tracking-tight leading-tight">
                    Money Hunt
                  </div>
                  <div className="text-[10px] font-semibold text-[#71717A] tracking-[0.09em] uppercase mt-0.5">
                    ADMIN CONSOLE
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Close Button (shown on mobile drawer) */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                title="Close Navigation"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── NAVIGATION LIST ── */}
        <nav className="flex-1 py-3 px-2.5 overflow-y-auto space-y-1 custom-scrollbar overflow-x-hidden">
          {NAV_SECTIONS.map(({ section, items }) => (
            <div key={section} className="mb-2.5">
              {!collapsed ? (
                <div className="text-[10.5px] font-bold text-[#71717A] tracking-[0.07em] uppercase px-3 pt-3 pb-1.5 animate-fade">
                  {section}
                </div>
              ) : (
                <div className="h-px bg-[#1F2024] my-2 mx-1" />
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
                      className={`w-full group flex items-center rounded-xl text-[13.5px] font-medium transition-all duration-150 relative text-left cursor-pointer ${
                        collapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2"
                      } ${
                        isActive
                          ? "bg-[#153420] text-white font-semibold"
                          : "text-[#E4E4E7] hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {/* Left Green Active Bar (Signature from reference design) */}
                      {isActive && (
                        <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-[3.5px] h-5 rounded-r-full bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      )}

                      <span className="flex-shrink-0 transition-colors">
                        <Icon
                          className={`w-[18px] h-[18px] ${
                            isActive
                              ? "text-[#22C55E]"
                              : "text-[#A1A1AA] group-hover:text-white"
                          }`}
                          strokeWidth={isActive ? 2 : 1.8}
                        />
                      </span>

                      {!collapsed && (
                        <>
                          <span className="truncate flex-1 tracking-tight">
                            {item.label}
                          </span>
                          {item.hasChevron && (
                            <ChevronRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-white transition-transform" />
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

        {/* ── COLLAPSE TOGGLE BUTTON ── */}
        <div className="px-2.5 py-1.5 border-t border-[#1F2024]/60 flex-shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar (« 230px)" : "Collapse sidebar (» 64px)"}
            className={`w-full flex items-center py-1.5 rounded-xl text-[#71717A] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer ${
              collapsed ? "justify-center px-0" : "gap-2 px-3"
            }`}
          >
            <span className="text-xs font-black text-[#22C55E] leading-none">
              {collapsed ? "»" : "«"}
            </span>
            {!collapsed && (
              <span className="text-[11px] font-semibold text-[#71717A] tracking-tight hover:text-white">
                Collapse sidebar
              </span>
            )}
          </button>
        </div>

        {/* ── ADMIN PROFILE FOOTER (Aisha Rahman) ── */}
        <div className="p-2.5 border-t border-[#1F2024] flex-shrink-0 bg-[#111214]">
          <div
            title={collapsed ? "Aisha Rahman · Super Admin" : undefined}
            className={`flex items-center rounded-xl hover:bg-white/[0.04] transition-all duration-200 group cursor-pointer ${
              collapsed ? "justify-center p-1.5" : "gap-2.5 p-1.5"
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Aisha Rahman"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10"
              />
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0 animate-fade">
                  <div className="text-[13px] font-bold text-white group-hover:text-[#22C55E] transition-colors truncate leading-tight">
                    Aisha Rahman
                  </div>
                  <div className="text-[11px] text-[#71717A] font-medium truncate leading-tight mt-0.5">
                    Super Admin
                  </div>
                </div>
                <button
                  title="Log Out"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 rounded-lg text-[#71717A] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
