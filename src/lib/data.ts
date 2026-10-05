export const STATS = {
  totalUsers: 58412,
  premiumUsers: 6172,
  freeUsers: 52240,
  bannedUsers: 42,
  revenue: 389204,
  rewardsPaid: 142880,
  arr: 4670448,
  churn: 3.8,
  conversion: 10.6,
  dau: 31904,
  activeHunts: 18,
  liveDrops: 3,
  totalDeals: 214,
  huntParticipation: 74,
  totalDrops: 1892440,
  activePartners: 3241,
  dealsToday: 847,
  sweepEntries: 12440,
};

export const REVENUE_CHART = [
  { day: "Mon", revenue: 4240, users: 242 },
  { day: "Tue", revenue: 5180, users: 298 },
  { day: "Wed", revenue: 3850, users: 220 },
  { day: "Thu", revenue: 6620, users: 367 },
  { day: "Fri", revenue: 5940, users: 310 },
  { day: "Sat", revenue: 7780, users: 420 },
  { day: "Sun", revenue: 8120, users: 490 },
];

export const USER_GROWTH_DATA = [
  { date: "Day 1", signups: 12400, dau: 22400 },
  { date: "Day 5", signups: 13800, dau: 24100 },
  { date: "Day 10", signups: 14900, dau: 26300 },
  { date: "Day 15", signups: 15800, dau: 27800 },
  { date: "Day 20", signups: 16900, dau: 29400 },
  { date: "Day 25", signups: 17800, dau: 30800 },
  { date: "Day 30", signups: 18900, dau: 31904 },
];

export const HUNTS_ENGAGEMENT_DATA = [
  { date: "Day 1", signups: 820, dau: 1850 },
  { date: "Day 5", signups: 940, dau: 2120 },
  { date: "Day 10", signups: 1050, dau: 2450 },
  { date: "Day 15", signups: 1160, dau: 2680 },
  { date: "Day 20", signups: 1270, dau: 2920 },
  { date: "Day 25", signups: 1380, dau: 3100 },
  { date: "Day 30", signups: 1490, dau: 3350 },
];

export const DROPS_ENGAGEMENT_DATA = [
  { date: "Day 1", signups: 420, dau: 1200 },
  { date: "Day 5", signups: 650, dau: 1540 },
  { date: "Day 10", signups: 780, dau: 1890 },
  { date: "Day 15", signups: 920, dau: 2100 },
  { date: "Day 20", signups: 1150, dau: 2450 },
  { date: "Day 25", signups: 1320, dau: 2800 },
  { date: "Day 30", signups: 1450, dau: 3100 },
];

export const REVENUE_BREAKDOWN_DATA = [
  { name: "Subscriptions", amount: 248300, pct: 64, fill: "#22C55E" },
  { name: "Partner Deals", amount: 78420, pct: 20, fill: "#3B82F6" },
  { name: "Merch Store", amount: 38640, pct: 10, fill: "#8B5CF6" },
  { name: "Drop Fees", amount: 23844, pct: 6, fill: "#F59E0B" },
];

export const LIVE_DROPS_DATA = [
  {
    id: "ld1",
    location: "Gulshan Circle 2, Dhaka",
    huntName: "Downtown Gold Rush",
    prize: "$150",
    claims: "38 claims",
    status: "Live" as const,
  },
  {
    id: "ld2",
    location: "6th Street, Austin",
    huntName: "Riverside Relic Hunt",
    prize: "$220",
    claims: "61 claims",
    status: "Live" as const,
  },
  {
    id: "ld3",
    location: "Deansgate, Manchester",
    huntName: "Canal District Clue Hunt",
    prize: "$90",
    claims: "20 claims",
    status: "Paused" as const,
  },
];

export const PENDING_VERIFICATIONS_DATA = [
  {
    id: "pv1",
    name: "Layla Khan",
    hunt: "Riverside Relic Hunt",
    amount: "$220",
    avatar: "LK",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "pv2",
    name: "Amara Adeyemi",
    hunt: "Downtown Gold Rush",
    amount: "$150",
    avatar: "AA",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80",
  },
];

export const RECENT_WINNERS_DATA = [
  {
    id: "rw1",
    name: "Sofia Torres",
    hunt: "Market Street Mystery",
    date: "2026-07-14",
    prize: "$400",
    avatar: "ST",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "rw2",
    name: "Kai Nakamura",
    hunt: "Downtown Gold Rush",
    date: "2026-08-11",
    prize: "$150",
    avatar: "KN",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "rw3",
    name: "Layla Khan",
    hunt: "Riverside Relic Hunt",
    date: "2026-08-12",
    prize: "$220",
    avatar: "LK",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
  },
];

export const RECENT_REGISTRATIONS_DATA = [
  {
    id: "rr1",
    name: "Kai Rahman",
    location: "Nairobi",
    date: "2026-01-09",
    plan: "Premium" as const,
    avatar: "KR",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "rr2",
    name: "Sam Osei",
    location: "Singapore",
    date: "2026-08-16",
    plan: "Premium" as const,
    avatar: "SO",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "rr3",
    name: "Omar Silva",
    location: "Chattogram",
    date: "2026-06-25",
    plan: "Free" as const,
    avatar: "OS",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "rr4",
    name: "Priya Petrov",
    location: "Brooklyn",
    date: "2026-03-05",
    plan: "Premium" as const,
    avatar: "PP",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
  },
];

export const BOROUGH_STATS = [
  { borough: "Manhattan", pct: 42, color: "#22C55E" },
  { borough: "Brooklyn", pct: 28, color: "#3B82F6" },
  { borough: "Queens", pct: 18, color: "#8B5CF6" },
  { borough: "Bronx", pct: 8, color: "#F59E0B" },
  { borough: "Staten Island", pct: 4, color: "#EF4444" },
];

export type User = {
  id: string; handle: string; name: string; email: string;
  city: string; plan: "Premium" | "Free"; huntPoints: number;
  deals: number; joined: string; status: "Active" | "Banned";
  hunts: number; moneySaved: number; referrals: number; billing: string;
  avatar: string;
};

export const USERS: User[] = [
  { id: "u1", handle: "@CashQueen23", name: "Sofia Torres", email: "sofia@email.com", city: "Queens, NY", plan: "Premium", huntPoints: 12480, deals: 23, joined: "Jan 5, 2025", status: "Active", hunts: 47, moneySaved: 777, referrals: 6, billing: "Feb 5, 2025", avatar: "ST" },
  { id: "u2", handle: "@HunterKing", name: "Kai Nakamura", email: "kai@email.com", city: "Brooklyn, NY", plan: "Premium", huntPoints: 8250, deals: 15, joined: "Jan 12, 2025", status: "Active", hunts: 28, moneySaved: 340, referrals: 3, billing: "Feb 12, 2025", avatar: "KN" },
  { id: "u3", handle: "@PriyaHunts", name: "Layla Khan", email: "layla@email.com", city: "Denver, CO", plan: "Free", huntPoints: 2100, deals: 4, joined: "Jan 20, 2025", status: "Active", hunts: 8, moneySaved: 90, referrals: 1, billing: "—", avatar: "LK" },
  { id: "u4", handle: "@SpamBot99", name: "John Spam", email: "spam@email.com", city: "Unknown", plan: "Free", huntPoints: 0, deals: 0, joined: "Jan 22, 2025", status: "Banned", hunts: 0, moneySaved: 0, referrals: 0, billing: "—", avatar: "JS" },
  { id: "u5", handle: "@QueensKing99", name: "Diego Silva", email: "diego@email.com", city: "Queens, NY", plan: "Premium", huntPoints: 15890, deals: 31, joined: "Dec 28, 2024", status: "Active", hunts: 62, moneySaved: 1240, referrals: 11, billing: "Jan 28, 2025", avatar: "DS" },
  { id: "u6", handle: "@AmaraHunts", name: "Amara Adeyemi", email: "amara@email.com", city: "Austin, TX", plan: "Free", huntPoints: 4200, deals: 9, joined: "Jan 15, 2025", status: "Active", hunts: 14, moneySaved: 180, referrals: 2, billing: "—", avatar: "AA" },
];

export type Hunt = {
  id: string; dropId: string; location: string; borough: string;
  prize: number; scheduled: string; status: "Active" | "Scheduled" | "Draft" | "Completed";
  radius: number; hunters: number; lat: string;
};

export const HUNTS: Hunt[] = [
  { id: "h1", dropId: "#183", location: "Downtown Manhattan", borough: "Manhattan", prize: 500, scheduled: "Today · Live Now", status: "Active", radius: 0.25, hunters: 1247, lat: "40.7074°N" },
  { id: "h2", dropId: "#184", location: "Brooklyn Bridge Area", borough: "Brooklyn", prize: 250, scheduled: "Tomorrow · 3:00 PM", status: "Scheduled", radius: 0.25, hunters: 0, lat: "40.7036°N" },
  { id: "h3", dropId: "#185", location: "Flushing Meadows", borough: "Queens", prize: 300, scheduled: "Sat, Feb 1 · 1:00 PM", status: "Draft", radius: 0.5, hunters: 0, lat: "40.7282°N" },
  { id: "h4", dropId: "#182", location: "Yankee Stadium Area", borough: "Bronx", prize: 200, scheduled: "Jan 28 · Completed", status: "Completed", radius: 0.25, hunters: 892, lat: "40.8296°N" },
];

export type Winner = {
  id: string; handle: string; name: string; drop: string; borough: string;
  prize: number; xp: number; date: string;
  status: "Pending" | "Verified" | "Approved" | "Paid" | "Rejected";
  avatar: string;
};

export const WINNERS: Winner[] = [
  { id: "w1", handle: "@SofiaTorres", name: "Sofia Torres", drop: "Market Street Mystery", borough: "Toronto", prize: 400, xp: 1000, date: "2026-07-14", status: "Verified", avatar: "ST" },
  { id: "w2", handle: "@KaiNakamura", name: "Kai Nakamura", drop: "Downtown Gold Rush", borough: "Dhaka", prize: 150, xp: 400, date: "2026-08-11", status: "Approved", avatar: "KN" },
  { id: "w3", handle: "@LaylaKhan", name: "Layla Khan", drop: "Riverside Relic Hunt", borough: "Austin", prize: 220, xp: 600, date: "2026-08-12", status: "Pending", avatar: "LK" },
  { id: "w4", handle: "@DiegoSilva", name: "Diego Silva", drop: "Canal District Clue Hunt", borough: "Manchester", prize: 90, xp: 250, date: "2026-08-13", status: "Paid", avatar: "DS" },
  { id: "w5", handle: "@AmaraAd", name: "Amara Adeyemi", drop: "Downtown Gold Rush", borough: "Dhaka", prize: 150, xp: 400, date: "2026-08-13", status: "Pending", avatar: "AA" },
];

export type Deal = {
  id: string; name: string; category: string; deal: string;
  distance: string; status: "Live" | "Scheduled" | "Paused";
  expires: string; icon: string; phone: string; website: string;
};

export const DEALS: Deal[] = [
  { id: "d1", name: "Joe's Pizza", category: "Food & Drink", deal: "Free Garlic Knots with any large pizza", distance: "0.3 mi", status: "Live", expires: "8:00 PM today", icon: "🍕", phone: "+1 (212) 555-0123", website: "joespizzany.com" },
  { id: "d2", name: "Brew & Bean Coffee", category: "Coffee", deal: "Buy 1 Get 1 Free", distance: "0.5 mi", status: "Live", expires: "7:00 PM today", icon: "☕", phone: "+1 (212) 555-0456", website: "brewandbean.com" },
  { id: "d3", name: "Flex Gym", category: "Fitness", deal: "Free Day Pass", distance: "0.7 mi", status: "Scheduled", expires: "Feb 5, 2025", icon: "💪", phone: "+1 (212) 555-0789", website: "flexgym.com" },
  { id: "d4", name: "AMC Theatres", category: "Entertainment", deal: "30% Off Tickets", distance: "0.4 mi", status: "Paused", expires: "Jan 31, 2025", icon: "🎬", phone: "+1 (212) 555-0321", website: "amctheatres.com" },
  { id: "d5", name: "Style Hub", category: "Beauty", deal: "15% Off any service", distance: "0.9 mi", status: "Live", expires: "Jan 15, 2025", icon: "💇", phone: "+1 (212) 555-0654", website: "stylehub.com" },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  memberDiscount: number;
  stock: number;
  orders: number;
  status: "Active" | "Low Stock" | "Hidden" | "Draft";
  icon: string;
  sku: string;
  brand?: string;
  description?: string;
  image?: string;
  colors?: string[];
  sizes?: string[];
  lowStockAlert?: number;
  badges?: {
    isNew?: boolean;
    isLimited?: boolean;
    showMemberDiscount?: boolean;
    featuredNewArrivals?: boolean;
    recommendedForYou?: boolean;
    featuredBanner?: boolean;
  };
  visibility?: "Published" | "Members Only" | "Draft";
};

export const PRODUCTS: Product[] = [
  { id: "p1", name: "MoneyHunt Joggers", category: "Apparel", price: 54.99, memberDiscount: 10, stock: 142, orders: 284, status: "Active", icon: "👟", sku: "MH-JOG-001" },
  { id: "p2", name: "Hunter Backpack", category: "Accessories", price: 89.99, memberDiscount: 20, stock: 8, orders: 421, status: "Low Stock", icon: "🎒", sku: "MH-BAG-002" },
  { id: "p3", name: "Classic Hoodie", category: "Apparel", price: 64.99, memberDiscount: 15, stock: 67, orders: 192, status: "Active", icon: "🧥", sku: "MH-HOD-003" },
  { id: "p4", name: "Hunter Cap", category: "Accessories", price: 34.99, memberDiscount: 10, stock: 0, orders: 98, status: "Hidden", icon: "🧢", sku: "MH-CAP-004" },
];

export type Order = {
  id: string; customer: string; avatar: string; items: string;
  total: number; status: "Processing" | "Shipped" | "Delivered" | "Refunded"; date: string;
};

export const ORDERS: Order[] = [
  { id: "#ORD-2847", customer: "Diego Silva", avatar: "DS", items: "Hunter Backpack × 1", total: 89.99, status: "Processing", date: "Jan 28" },
  { id: "#ORD-2846", customer: "Layla Khan", avatar: "LK", items: "Classic Hoodie × 2", total: 129.98, status: "Shipped", date: "Jan 27" },
  { id: "#ORD-2845", customer: "Sofia Torres", avatar: "ST", items: "MoneyHunt Joggers × 1", total: 49.49, status: "Delivered", date: "Jan 25" },
];

export type Transaction = {
  id: string; user: string; avatar: string; plan: string;
  amount: number; date: string; status: "Paid" | "Failed" | "Refunded";
};

export const TRANSACTIONS: Transaction[] = [
  { id: "t1", user: "@CashQueen23", avatar: "ST", plan: "Monthly", amount: 9.99, date: "Jan 28, 2025", status: "Paid" },
  { id: "t2", user: "Diego Silva", avatar: "DS", plan: "Yearly", amount: 74.99, date: "Jan 25, 2025", status: "Paid" },
  { id: "t3", user: "Jake D.", avatar: "JD", plan: "Monthly", amount: 9.99, date: "Jan 22, 2025", status: "Failed" },
  { id: "t4", user: "Layla Khan", avatar: "LK", plan: "Quarterly", amount: 39.99, date: "Jan 20, 2025", status: "Refunded" },
];

export const EVENTS = [
  { id: "e1", name: "Credit Repair Workshop", type: "Workshop", location: "Virtual — Zoom", date: "Jan 28 · 5PM", rsvps: 124, status: "Live", xp: 200, access: "All Members" },
  { id: "e2", name: "Real Estate Mixer NYC", type: "Meetup", location: "Williamsburg, Brooklyn", date: "Feb 1 · 7PM", rsvps: 67, status: "Upcoming", xp: 300, access: "Premium" },
  { id: "e3", name: "Community Drop Night", type: "Hunt Event", location: "Manhattan", date: "Feb 2 · 8PM", rsvps: 203, status: "Upcoming", xp: 500, access: "Premium" },
];

export const NOTIFICATIONS_SENT = [
  { id: "n1", title: "🎯 Hunt Drop Active NOW!", body: "Win $500 cash in Downtown Manhattan. Drop zone is live!", audience: "All Users", count: "248K", time: "2h ago", type: "hunt" },
  { id: "n2", title: "🏆 We Have a Winner!", body: "@CashQueen23 just found the Manhattan drop and won $325!", audience: "All Users", count: "248K", time: "5h ago", type: "winner" },
  { id: "n3", title: "🎉 Event Tomorrow!", body: "Credit Repair Workshop starts tomorrow at 5PM. Don't miss it!", audience: "Premium", count: "2,847", time: "1 day ago", type: "event" },
];

export const OPPORTUNITY_CARDS = [
  { id: "oc1", icon: "🎯", name: "Active Money Hunts", desc: "GPS map services", access: "Premium locked", active: true },
  { id: "oc2", icon: "🎰", name: "Cash Envelope Sweepstakes", desc: "Weekly sweepstakes", access: "Premium locked", active: true },
  { id: "oc3", icon: "⚖️", name: "Were You Hurt?", desc: "Legal assistance", access: "Free & Premium", active: true },
  { id: "oc4", icon: "🏠", name: "Buy or Sell a Home", desc: "Real estate", access: "Free & Premium", active: true },
  { id: "oc5", icon: "💳", name: "Credit Repair", desc: "Credit services", access: "Free & Premium", active: true },
  { id: "oc6", icon: "🎓", name: "Licensing & Education", desc: "Education programs", access: "Free & Premium", active: true },
];

export const SUBSCRIPTION_STATS = {
  mrr: 61720,
  mrrGrowth: "+12.1%",
  arr: 740640,
  arrGrowth: "+18.4%",
  activeSubs: 6172,
  subsGrowth: "+412 this mo",
  churnRate: "1.8%",
  churnChange: "-0.4%",
  arpu: "$18.40",
  arpuChange: "+5.2%",
  trialConversion: "68.4%",
  trialChange: "+3.1%",
  activeCoupons: 4,
  failedPaymentsCount: 12,
  failedAmount: "$119.88",
};

export const MOBILE_PAYWALL_CONFIG = {
  headline: "UNLOCK THE Money Hunt",
  subheadline: "Find Money. Save Money. The Hunt Never Stops.",
  trialDays: 7,
  trialNotice: "7-day free trial · Cancel anytime · Billed after trial ends",
  features: [
    { id: "f1", text: "See exactly where the money is dropped", active: true },
    { id: "f2", text: "Real-time GPS & map updates", active: true },
    { id: "f3", text: "Exclusive hints before each drop", active: true },
    { id: "f4", text: "Claim discounts at 500+ local businesses", active: true },
    { id: "f5", text: "Access exclusive sweepstakes", active: true },
    { id: "f6", text: "Member-only events & community access", active: true },
  ],
  plans: {
    monthly: {
      id: "plan_monthly",
      name: "Monthly",
      billingText: "Billed monthly",
      price: 9.99,
      priceDisplay: "$9.99",
      period: "/month",
      subscribers: 2282,
      active: true,
    },
    yearly: {
      id: "plan_yearly",
      name: "Yearly",
      billingText: "Billed annually",
      badge: "Best Value",
      price: 99.99,
      priceDisplay: "$99.99",
      period: "/year",
      subscribers: 3890,
      active: true,
      savings: "Save 16%",
    },
  },
};

export const SUBSCRIPTION_PLANS = [
  {
    id: "plan_monthly",
    name: "Monthly",
    billingText: "Billed monthly",
    badge: "Flexible",
    badgeType: "blue",
    price: 9.99,
    priceDisplay: "$9.99",
    period: "/month",
    subscribers: 2282,
    revenueShare: 37,
    mrr: 22797,
    active: true,
    desc: "Billed monthly. Full access to live radar, clues, drops and discounts.",
    features: [
      "See exactly where the money is dropped",
      "Real-time GPS & map updates",
      "Exclusive hints before each drop",
      "Claim discounts at 500+ local businesses",
      "Access exclusive sweepstakes",
      "Member-only events & community access",
    ],
    highlight: false,
    color: "#3B82F6",
  },
  {
    id: "plan_yearly",
    name: "Yearly",
    billingText: "Billed annually",
    badge: "Best Value",
    badgeType: "gold",
    price: 99.99,
    priceDisplay: "$99.99",
    period: "/year",
    subscribers: 3890,
    revenueShare: 63,
    mrr: 38923,
    active: true,
    desc: "Billed annually. Includes 7-day free trial and all premium hunting perks.",
    features: [
      "Everything in Monthly plan",
      "7-Day Free Trial included",
      "Best Value — Save $20/year",
      "Priority Winner Verification queue",
      "Special Golden Hunter in-app badge",
      "VIP community access",
    ],
    highlight: true,
    color: "#22C55E",
  },
];

export const MRR_GROWTH_HISTORY = [
  { month: "Jan", mrr: 28400, subscribers: 2840, churned: 48 },
  { month: "Feb", mrr: 32600, subscribers: 3310, churned: 52 },
  { month: "Mar", mrr: 36800, subscribers: 3790, churned: 59 },
  { month: "Apr", mrr: 41200, subscribers: 4210, churned: 64 },
  { month: "May", mrr: 45900, subscribers: 4680, churned: 71 },
  { month: "Jun", mrr: 49800, subscribers: 5040, churned: 78 },
  { month: "Jul", mrr: 53400, subscribers: 5390, churned: 82 },
  { month: "Aug", mrr: 56900, subscribers: 5720, churned: 89 },
  { month: "Sep", mrr: 59400, subscribers: 5980, churned: 94 },
  { month: "Oct", mrr: 61720, subscribers: 6172, churned: 98 },
];

export type Subscriber = {
  id: string;
  name: string;
  handle: string;
  email: string;
  plan: "Premium Annual" | "Premium Monthly" | "Partner Sponsor" | "Trial 7-Day";
  billingAmount: string;
  billingCycle: string;
  nextBilling: string;
  joined: string;
  ltv: string;
  status: "Active" | "Past Due" | "Trial" | "Cancelled";
  avatar: string;
  photo?: string;
  paymentMethod: string;
};

export const SUBSCRIBERS_LIST: Subscriber[] = [
  {
    id: "sub-101",
    name: "Sofia Torres",
    handle: "@CashQueen23",
    email: "sofia.torres@hunt.io",
    plan: "Premium Annual",
    billingAmount: "$89.99/yr",
    billingCycle: "Yearly",
    nextBilling: "Jan 05, 2027",
    joined: "Jan 05, 2025",
    ltv: "$179.98",
    status: "Active",
    avatar: "ST",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "sub-102",
    name: "Kai Nakamura",
    handle: "@HunterKing",
    email: "kai.nakamura@tokyo.net",
    plan: "Premium Annual",
    billingAmount: "$89.99/yr",
    billingCycle: "Yearly",
    nextBilling: "Feb 12, 2027",
    joined: "Jan 12, 2025",
    ltv: "$179.98",
    status: "Active",
    avatar: "KN",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    paymentMethod: "Mastercard ending in 8891",
  },
  {
    id: "sub-103",
    name: "Diego Silva",
    handle: "@QueensKing99",
    email: "diego.silva@nymail.com",
    plan: "Premium Annual",
    billingAmount: "$89.99/yr",
    billingCycle: "Yearly",
    nextBilling: "Dec 28, 2026",
    joined: "Dec 28, 2024",
    ltv: "$179.98",
    status: "Active",
    avatar: "DS",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    paymentMethod: "Apple Pay (Visa 1092)",
  },
  {
    id: "sub-104",
    name: "Layla Khan",
    handle: "@PriyaHunts",
    email: "layla.khan@austin.io",
    plan: "Premium Monthly",
    billingAmount: "$9.99/mo",
    billingCycle: "Monthly",
    nextBilling: "Nov 20, 2026",
    joined: "Jan 20, 2025",
    ltv: "$99.90",
    status: "Active",
    avatar: "LK",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
    paymentMethod: "Visa ending in 9031",
  },
  {
    id: "sub-105",
    name: "Amara Adeyemi",
    handle: "@AmaraHunts",
    email: "amara.adeyemi@lagos.org",
    plan: "Premium Monthly",
    billingAmount: "$9.99/mo",
    billingCycle: "Monthly",
    nextBilling: "Nov 15, 2026",
    joined: "Jan 15, 2025",
    ltv: "$99.90",
    status: "Active",
    avatar: "AA",
    photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&auto=format&fit=crop&q=80",
    paymentMethod: "Mastercard ending in 3341",
  },
  {
    id: "sub-106",
    name: "Kai Rahman",
    handle: "@NairobiSeeker",
    email: "kai.rahman@nairobi.ke",
    plan: "Premium Annual",
    billingAmount: "$89.99/yr",
    billingCycle: "Yearly",
    nextBilling: "Jan 09, 2027",
    joined: "Jan 09, 2026",
    ltv: "$89.99",
    status: "Active",
    avatar: "KR",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    paymentMethod: "Visa ending in 7712",
  },
  {
    id: "sub-107",
    name: "Sam Osei",
    handle: "@SingaGold",
    email: "sam.osei@sg.com",
    plan: "Premium Annual",
    billingAmount: "$89.99/yr",
    billingCycle: "Yearly",
    nextBilling: "Aug 16, 2027",
    joined: "Aug 16, 2026",
    ltv: "$89.99",
    status: "Active",
    avatar: "SO",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80",
    paymentMethod: "Mastercard ending in 1982",
  },
  {
    id: "sub-108",
    name: "Jake Daniels",
    handle: "@JakeDrop99",
    email: "jake.d@gmail.com",
    plan: "Premium Monthly",
    billingAmount: "$9.99/mo",
    billingCycle: "Monthly",
    nextBilling: "Retry Oct 22",
    joined: "Jul 11, 2025",
    ltv: "$29.97",
    status: "Past Due",
    avatar: "JD",
    paymentMethod: "Visa ending in 0021 (Declined)",
  },
  {
    id: "sub-109",
    name: "Elena Rostova",
    handle: "@ElenaExplorer",
    email: "elena.r@prague.cz",
    plan: "Trial 7-Day",
    billingAmount: "$0 (Trial)",
    billingCycle: "Renews Oct 28",
    nextBilling: "Oct 28, 2026",
    joined: "Oct 21, 2026",
    ltv: "$0.00",
    status: "Trial",
    avatar: "ER",
    paymentMethod: "Google Pay (Mastercard)",
  },
  {
    id: "sub-110",
    name: "Marcus Vance",
    handle: "@VanceMerch",
    email: "marcus@vanceapparel.com",
    plan: "Partner Sponsor",
    billingAmount: "$299.00/mo",
    billingCycle: "Monthly",
    nextBilling: "Nov 01, 2026",
    joined: "May 01, 2025",
    ltv: "$1,794.00",
    status: "Active",
    avatar: "MV",
    paymentMethod: "ACH Bank Transfer",
  },
];
