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
  LogOut,
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
        className={`fixed inset-y-0 left-0 z-50 lg:static flex-shrink-0 bg-[#0E1013] h-screen flex flex-col border-r border-[#1B1D22] select-none transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
          } ${collapsed ? "lg:w-[68px]" : "w-[240px] lg:w-[230px]"
          }`}
      >
        {/* ── BRAND HEADER: OFFICIAL MASCOT DISPLAY (matches checkmarked design) ── */}
        <div
          className={`flex-shrink-0 border-b border-[#1B1D22] transition-all duration-200 relative ${collapsed ? "px-2 py-3.5 flex justify-center" : "px-4 pt-4 pb-3.5"
            }`}
        >
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden absolute top-3 right-3 p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors z-10"
              title="Close Navigation"
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div
            className="cursor-pointer group flex flex-col items-center text-center"
            title="Money Hunt · Admin Console"
            onClick={() => {
              onNav("dashboard");
              onCloseMobile?.();
            }}
          >
            {/* Mascot Bear Illustration */}
            <div className="relative">
              <img
                src="/logo-bear.png"
                alt="Money Hunt Mascot"
                className={`transition-all duration-200 drop-shadow-[0_6px_20px_rgba(34,197,94,0.3)] group-hover:scale-105 ${collapsed
                  ? "w-11 h-11 object-contain"
                  : "w-[124px] h-[105px] object-contain"
                  }`}
              />
            </div>

            {/* Typography: MONEY in Green, HUNT APP in White */}
            {!collapsed && (
              <div className="mt-2 animate-fade">
                <div className="text-[15.5px] font-black tracking-tight leading-tight select-none">
                  <span className="text-[#22C55E]">MONEY </span>
                  <span className="text-white">HUNT APP</span>
                </div>
                <div className="text-[9px] font-bold text-[#71717A] tracking-[0.16em] uppercase mt-1 flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                  <span>ADMIN CONSOLE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── NAVIGATION LIST (Clean, professional, slightly reduced gaps) ── */}
        <nav className="flex-1 py-2 px-2.5 overflow-y-auto space-y-0.5 custom-scrollbar overflow-x-hidden">
          {NAV_SECTIONS.map(({ section, items }) => (
            <div key={section} className="mb-1">
              {!collapsed ? (
                <div className="text-[9.5px] font-bold text-[#71717A] tracking-[0.08em] uppercase px-2.5 pt-1.5 pb-0.5 animate-fade select-none">
                  {section}
                </div>
              ) : (
                <div className="h-px bg-[#1B1D22] my-1 mx-1" />
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
                      className={`w-full group flex items-center rounded-lg text-[13px] font-medium transition-all duration-150 relative text-left cursor-pointer ${collapsed ? "justify-center px-0 py-2" : "gap-2.5 px-2.5 py-1.5"
                        } ${isActive
                          ? "bg-[#14341F] text-white font-semibold shadow-xs"
                          : "text-[#D1D5DB] hover:text-white hover:bg-white/[0.06]"
                        }`}
                    >
                      {/* Left Green Active Bar */}
                      {isActive && (
                        <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-[3px] h-4.5 rounded-r-full bg-[#22C55E] shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                      )}

                      <span className="flex-shrink-0 transition-colors">
                        <Icon
                          className={`w-4 h-4 ${isActive
                            ? "text-[#22C55E]"
                            : "text-[#9CA3AF] group-hover:text-white"
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
                            <ChevronRight className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-white transition-transform" />
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
        <div className="px-2.5 py-1 border-t border-[#1B1D22]/80 flex-shrink-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar (« 230px)" : "Collapse sidebar (» 68px)"}
            className={`w-full flex items-center py-1 rounded-lg text-[#71717A] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer ${collapsed ? "justify-center px-0" : "gap-2 px-2.5"
              }`}
          >
            <span className="text-xs font-black text-[#22C55E] leading-none">
              {collapsed ? "»" : "«"}
            </span>
            {!collapsed && (
              <span className="text-[10px] font-semibold text-[#71717A] tracking-tight hover:text-white">
                Collapse sidebar
              </span>
            )}
          </button>
        </div>

        {/* ── ADMIN PROFILE FOOTER (Aisha Rahman) ── */}
        <div className="p-2 border-t border-[#1B1D22] flex-shrink-0 bg-[#0E1013]">
          <div
            title={collapsed ? "Aisha Rahman · Super Admin" : undefined}
            className={`flex items-center rounded-lg hover:bg-white/[0.04] transition-all duration-200 group cursor-pointer ${collapsed ? "justify-center p-1" : "gap-2.5 p-1.5"
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
                  <div className="text-[12.5px] font-bold text-white group-hover:text-[#22C55E] transition-colors truncate leading-tight">
                    Aisha Rahman
                  </div>
                  <div className="text-[10.5px] text-[#71717A] font-medium truncate leading-tight mt-0.5">
                    Super Admin
                  </div>
                </div>
                <button
                  title="Log Out"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 rounded-md text-[#71717A] hover:text-white hover:bg-white/10 transition-colors"
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
