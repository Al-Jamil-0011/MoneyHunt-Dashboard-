"use client";
import React from "react";
import { Search, Bell, HelpCircle, ChevronDown, Download, Plus, Menu } from "lucide-react";
import { Button } from "../ui";

export function Topbar({
  page,
  onNewHunt,
  onToggleMobileSidebar,
}: {
  page: string;
  onNewHunt: () => void;
  onToggleMobileSidebar?: () => void;
}) {
  return (
    <header className="bg-[#F8F7F2] border-b border-[#EAE8E1] px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between flex-shrink-0 z-20">
      {/* Left: Hamburger menu toggle (mobile/tablet) + Search */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 -ml-1 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-xl transition-colors"
            title="Open Menu"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Search Input Box */}
        <div className="relative flex items-center">
          <div className="flex items-center gap-2 sm:gap-2.5 bg-white border border-[#E6E4DC] hover:border-[#D5D2C7] focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/15 rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all w-36 xs:w-48 sm:w-60 md:w-72 lg:w-80">
            <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-stone-400 flex-shrink-0" />
            <input
              placeholder="Search..."
              className="text-xs sm:text-[13px] bg-transparent border-none outline-none w-full text-stone-800 placeholder:text-stone-400 font-normal"
            />
            <kbd className="hidden sm:inline-block text-[10px] text-stone-400 bg-stone-50 border border-stone-200/80 rounded px-1.5 py-0.5 font-mono flex-shrink-0">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* Notification Bell */}
        <button
          title="Notifications"
          className="w-9 h-9 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-white rounded-xl border border-[#E6E4DC] relative bg-white/70 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Help / Activity Icon */}
        <button
          title="Help & Documentation"
          className="w-9 h-9 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-white rounded-xl border border-[#E6E4DC] bg-white/70 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Admin Profile Dropdown */}
        <div className="flex items-center gap-2.5 bg-white border border-[#E6E4DC] hover:border-[#D5D2C7] rounded-xl pl-1.5 pr-2.5 py-1.5 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              alt="Aisha Rahman"
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-emerald-500/30"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-[12px] font-bold text-stone-900 leading-tight">
              Aisha Rahman
            </div>
            <div className="text-[10px] text-stone-400 font-medium">
              Super Admin
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-0.5" />
        </div>

        {/* Page specific action buttons */}
        {page === "winners" && (
          <Button variant="outline" size="sm" onClick={() => {}} className="hidden xs:inline-flex ml-1">
            <Download className="w-3.5 h-3.5 mr-1" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        )}
        {page === "hunts" && (
          <Button variant="green" size="sm" onClick={onNewHunt} className="ml-1">
            <Plus className="w-3.5 h-3.5 mr-1" />
            <span>New Drop</span>
          </Button>
        )}
      </div>
    </header>
  );
}
