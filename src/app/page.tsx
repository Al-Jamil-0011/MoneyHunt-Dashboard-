"use client";
import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ToastProvider } from "@/components/ui";
import { Dashboard } from "@/components/pages/Dashboard";
import { Winners } from "@/components/pages/Winners";
import { Users } from "@/components/pages/Users";
import { Subscriptions } from "@/components/pages/Subscriptions";
import { Payments } from "@/components/pages/Payments";
import { Sweepstakes } from "@/components/pages/Sweepstakes";
import {
  HuntManagement, Deals, Merch, Orders,
  Perks, MapLocations,
  Notifications, Analytics, Settings
} from "@/components/pages/AllPages";

type Page =
  | "dashboard" | "users" | "hunts" | "deals" | "perks" | "map"
  | "merch" | "orders" | "winners" | "subscriptions" | "payments"
  | "notifications" | "sweepstakes" | "analytics" | "settings";

function PageContent({ page, onNav }: { page: Page; onNav: (p: string) => void }) {
  switch (page) {
    case "dashboard": return <Dashboard onNav={onNav} />;
    case "users": return <Users />;
    case "hunts": return <HuntManagement />;
    case "deals": return <Deals />;
    case "perks": return <Perks />;
    case "map": return <MapLocations />;
    case "merch": return <Merch />;
    case "orders": return <Orders />;
    case "winners": return <Winners />;
    case "subscriptions": return <Subscriptions initialTab="subscribers" />;
    case "payments": return <Payments />;
    case "notifications": return <Notifications />;
    case "sweepstakes": return <Sweepstakes />;
    case "analytics": return <Analytics />;
    case "settings": return <Settings />;
    default: return <Dashboard onNav={onNav} />;
  }
}

export default function AdminApp() {
  const [page, setPage] = useState<Page>("dashboard");
  const [showHuntModal, setShowHuntModal] = useState(false);

  const navigate = (p: string) => setPage(p as Page);

  return (
    <ToastProvider>
      <div className="flex h-screen overflow-hidden bg-[#F8F7F2]">
        <Sidebar active={page} onNav={navigate} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar page={page} onNewHunt={() => navigate("hunts")} />
          <main className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
            <PageContent page={page} onNav={navigate} />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
