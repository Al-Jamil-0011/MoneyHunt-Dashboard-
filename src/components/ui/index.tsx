"use client";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ─────────────────────────────────────────────────────────────
// BUTTON (shadcn/ui Button)
// ─────────────────────────────────────────────────────────────
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-xs font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        default: "bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-sm",
        green: "bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        red: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline: "border border-stone-200/80 bg-white hover:bg-stone-50 text-stone-700 shadow-sm hover:border-stone-300",
        secondary: "bg-stone-100 text-stone-800 hover:bg-stone-200/80",
        ghost: "hover:bg-stone-100/80 text-stone-600 hover:text-stone-900",
        dark: "bg-stone-900 text-white hover:bg-stone-800 shadow-sm",
        link: "text-[#22C55E] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        md: "h-9 px-3.5 py-1.5 text-xs",
        lg: "h-10 px-5 py-2 text-sm",
        icon: "h-8 w-8 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// ─────────────────────────────────────────────────────────────
// BADGE (shadcn/ui Badge)
// ─────────────────────────────────────────────────────────────
// BADGE (shadcn/ui Badge) — Standardized with Rule 2
// ─────────────────────────────────────────────────────────────
export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-transparent bg-stone-900 text-white",
        secondary: "bg-stone-100 text-stone-600 border border-stone-200/80",
        destructive: "bg-[#FEE2E2] text-[#B91C1C] border border-red-200/60",
        outline: "text-stone-800 border border-stone-200",
        // Extended status colors matching RULE 2 exactly
        green: "bg-[#DCFCE7] text-[#15803D] border border-green-200/60",
        success: "bg-[#DCFCE7] text-[#15803D] border border-green-200/60",
        gold: "bg-[#FEF3C7] text-[#B45309] border border-amber-200/60",
        amber: "bg-[#FEF3C7] text-[#B45309] border border-amber-200/60",
        blue: "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200/60",
        purple: "bg-[#FAF5FF] text-[#7E22CE] border border-purple-200/60",
        gray: "bg-stone-100 text-stone-600 border border-stone-200/80",
        red: "bg-[#FEE2E2] text-[#B91C1C] border border-red-200/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({ className, variant, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current mr-0.5" />}
      {children}
    </div>
  );
}

// ── RULE 2: STANDARDIZED STATUS BADGE ─────────────────────────
export function StatusBadge({
  status,
  dot = true,
  className,
}: {
  status: string;
  dot?: boolean;
  className?: string;
}) {
  const s = status.toLowerCase().trim();
  let style = "bg-stone-100 text-stone-600 border border-stone-200/80"; // Draft / Hidden / Inactive
  let dotColor = "bg-stone-400";

  // Live / Active / Paid / Completed -> green bg, dark green text
  if (
    [
      "live",
      "active",
      "paid",
      "completed",
      "success",
      "approved",
      "verified",
      "delivered",
      "found",
    ].some((x) => s.includes(x))
  ) {
    style = "bg-[#DCFCE7] text-[#15803D] border border-green-200/60";
    dotColor = "bg-[#15803D]";
  }
  // Pending / Processing / In-Review -> amber bg, amber dark text
  else if (
    [
      "pending",
      "processing",
      "in-review",
      "in review",
      "review",
      "awaiting",
      "open",
    ].some((x) => s.includes(x))
  ) {
    style = "bg-[#FEF3C7] text-[#B45309] border border-amber-200/60";
    dotColor = "bg-[#B45309]";
  }
  // Scheduled / Upcoming -> blue bg, blue dark text
  else if (["scheduled", "upcoming", "shipped", "en route"].some((x) => s.includes(x))) {
    style = "bg-[#EFF6FF] text-[#1D4ED8] border border-blue-200/60";
    dotColor = "bg-[#1D4ED8]";
  }
  // Failed / Rejected / Banned -> red bg, red dark text
  else if (
    [
      "failed",
      "rejected",
      "banned",
      "churned",
      "cancelled",
      "canceled",
      "past due",
      "overdue",
      "error",
      "refunded",
    ].some((x) => s.includes(x))
  ) {
    style = "bg-[#FEE2E2] text-[#B91C1C] border border-red-200/60";
    dotColor = "bg-[#B91C1C]";
  }
  // Draft / Hidden / Inactive -> gray bg, gray text
  else if (["draft", "hidden", "inactive", "paused", "archived", "closed"].some((x) => s.includes(x))) {
    style = "bg-stone-100 text-stone-600 border border-stone-200/80";
    dotColor = "bg-stone-400";
  }
  // Trial / Free -> purple bg, purple text
  else if (["trial", "free", "basic"].some((x) => s.includes(x))) {
    style = "bg-[#FAF5FF] text-[#7E22CE] border border-purple-200/60";
    dotColor = "bg-[#7E22CE]";
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold select-none whitespace-nowrap",
        style,
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColor)} />}
      <span>{status}</span>
    </span>
  );
}

// ── RULE 1: EMPTY STATES COMPONENT ─────────────────────────────
export function EmptyState({
  icon = "🔍",
  title,
  subtitle,
  actionLabel,
  onAction,
  className,
}: {
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === "function" || (typeof icon === "object" && icon !== null && "$$typeof" in icon)) {
      const IconComp = icon as React.ComponentType<{ className?: string }>;
      return <IconComp className="w-6 h-6 text-stone-400" />;
    }
    return icon;
  };

  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center animate-fade", className)}>
      <div className="w-12 h-12 rounded-2xl bg-stone-100/90 border border-stone-200/80 flex items-center justify-center text-[28px] mb-3 shadow-inner">
        {renderIcon()}
      </div>
      <h4 className="text-sm font-bold text-stone-900 mb-1">{title}</h4>
      {subtitle && <p className="text-xs text-stone-500 max-w-sm mb-4">{subtitle}</p>}
      {actionLabel && (
        <Button variant="green" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function TableEmptyState({
  colSpan = 10,
  icon = "🔍",
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  colSpan?: number;
  icon?: React.ReactNode | React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="p-0">
        <EmptyState
          icon={icon}
          title={title}
          subtitle={subtitle}
          actionLabel={actionLabel}
          onAction={onAction}
        />
      </TableCell>
    </TableRow>
  );
}

// ── RULE 4: FLOATING BULK BAR COMPONENT ────────────────────────
export function FloatingBulkBar({
  selectedCount,
  itemLabel = "item",
  onClear,
  actions,
}: {
  selectedCount: number;
  itemLabel?: string;
  onClear: () => void;
  actions?:
    | React.ReactNode
    | {
        label: string;
        onClick: () => void;
        variant?: "green" | "danger" | "outline";
      }[];
}) {
  if (selectedCount <= 0) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white border border-[#EAE8E1] rounded-[12px] shadow-[0_10px_35px_rgba(0,0,0,0.14)] px-5 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-4 duration-200">
      <div className="text-xs font-bold text-stone-800 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
        <span>
          {selectedCount} {selectedCount === 1 ? itemLabel : `${itemLabel}s`} selected
        </span>
      </div>
      <div className="h-4 w-px bg-stone-200" />
      <div className="flex items-center gap-2">
        {React.isValidElement(actions) || (Array.isArray(actions) && actions.length > 0 && React.isValidElement(actions[0]))
          ? (actions as React.ReactNode)
          : Array.isArray(actions)
          ? actions.map((act, i) => {
              let btnClass =
                "bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-xs transition-all cursor-pointer";
              if (act.variant === "danger") {
                btnClass =
                  "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer";
              } else if (act.variant === "outline") {
                btnClass =
                  "bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer";
              }
              return (
                <button key={i} onClick={act.onClick} className={btnClass}>
                  {act.label}
                </button>
              );
            })
          : null}
        <button
          onClick={onClear}
          className="text-stone-400 hover:text-stone-700 ml-1 p-1 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
          title="Clear selection"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CARD (shadcn/ui Card)
// ─────────────────────────────────────────────────────────────
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-[#EAE8E1] bg-white text-stone-950 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 pb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-sm font-bold text-stone-900 leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-stone-400 mt-1", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-5 pt-0 border-t border-stone-100", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

// ─────────────────────────────────────────────────────────────
// INPUT (shadcn/ui Input)
// ─────────────────────────────────────────────────────────────
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-xl border border-stone-200 bg-white px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-stone-400 focus-visible:outline-none focus-visible:border-[#22C55E] focus-visible:ring-2 focus-visible:ring-[#22C55E]/15 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// ─────────────────────────────────────────────────────────────
// TABLE (shadcn/ui Table)
// ─────────────────────────────────────────────────────────────
export const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-xs text-stone-700", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-stone-50/70 border-b border-stone-100 [&_tr]:border-b", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0 divide-y divide-stone-100", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-stone-50/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "group border-b border-stone-100 transition-colors hover:bg-[#F9FAFB] data-[state=selected]:bg-stone-100",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-4 text-left align-middle font-bold text-[10px] uppercase tracking-wider text-stone-400 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-xs text-stone-400", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

// ─────────────────────────────────────────────────────────────
// TABS (shadcn/ui Tabs)
// ─────────────────────────────────────────────────────────────
interface TabsContextType {
  value: string;
  onValueChange: (val: string) => void;
}
const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [tab, setTab] = React.useState(value || defaultValue || "");
  const current = value !== undefined ? value : tab;
  const changeHandler = onValueChange || setTab;

  return (
    <TabsContext.Provider value={{ value: current, onValueChange: changeHandler }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-[#EFECE4] p-1 text-stone-500 border border-stone-200/70 select-none",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = ctx.value === value;

  return (
    <button
      type="button"
      onClick={() => ctx.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-white text-stone-900 shadow-sm"
          : "text-stone-500 hover:text-stone-900 hover:bg-white/40",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("TabsContent must be used within Tabs");
  if (ctx.value !== value) return null;

  return (
    <div
      className={cn(
        "mt-3 ring-offset-background focus-visible:outline-none animate-fade",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SEPARATOR (shadcn/ui Separator)
// ─────────────────────────────────────────────────────────────
export function Separator({
  orientation = "horizontal",
  className,
}: {
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "shrink-0 bg-stone-200/80",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// KBD (shadcn/ui Kbd)
// ─────────────────────────────────────────────────────────────
export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-stone-200 bg-stone-50 px-1.5 font-mono text-[10px] font-medium text-stone-500",
        className
      )}
    >
      {children}
    </kbd>
  );
}

// ─────────────────────────────────────────────────────────────
// SWITCH (shadcn/ui Switch)
// ─────────────────────────────────────────────────────────────
export function Switch({
  checked,
  onCheckedChange,
  className,
}: {
  checked: boolean;
  onCheckedChange: (c: boolean) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-[#22C55E]" : "bg-stone-300",
        className
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// SKELETON (shadcn/ui Skeleton)
// ─────────────────────────────────────────────────────────────
export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-stone-200/70", className)}
      {...props}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// AVATAR (shadcn/ui Avatar)
// ─────────────────────────────────────────────────────────────
export function Avatar({
  className,
  children,
  initials,
  size = "md",
}: {
  className?: string;
  children?: React.ReactNode;
  initials?: string;
  size?: "sm" | "md" | "lg";
}) {
  const szCls =
    size === "sm" ? "h-7 w-7 text-xs" : size === "lg" ? "h-11 w-11 text-base" : "h-9 w-9 text-xs";
  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full ring-1 ring-stone-200/80 bg-stone-100",
        szCls,
        className
      )}
    >
      {initials ? (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-emerald-600 font-bold text-white">
          {initials}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export function AvatarImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
    />
  );
}

export function AvatarFallback({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-stone-200 font-bold text-stone-600 text-xs",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DIALOG / MODAL (shadcn/ui Dialog)
// ─────────────────────────────────────────────────────────────
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  wide?: boolean;
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="modal-backdrop animate-fade"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={cn(
          "bg-white rounded-2xl shadow-2xl border border-stone-200/80 flex flex-col animate-slide overflow-hidden",
          wide ? "w-[680px]" : "w-[520px]",
          "max-w-[95vw] max-h-[90vh]"
        )}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h3 className="text-sm font-bold text-stone-900">{title}</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-stone-100 text-stone-500 hover:bg-stone-200 text-xs font-bold transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto flex-1">{children}</div>
        {footer && (
          <div className="px-6 py-3.5 border-t border-stone-100 flex justify-end gap-2 bg-stone-50/50">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TOAST (shadcn/ui Toast System)
// ─────────────────────────────────────────────────────────────
type Toast = { id: number; msg: string; type: "success" | "error" | "info" };
type ToastCtx = { toast: (msg: string, type?: Toast["type"]) => void };
const ToastContext = React.createContext<ToastCtx>({ toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const toast = React.useCallback((msg: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }, []);

  const bg: Record<Toast["type"], string> = {
    success: "bg-[#16A34A] text-white border-green-700 shadow-md",
    error: "bg-red-500 text-white border-red-700 shadow-md",
    info: "bg-stone-900 text-white border-stone-800 shadow-md",
  };
  const icon: Record<Toast["type"], string> = { success: "✓", error: "✕", info: "ℹ" };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 animate-slide pointer-events-auto min-w-[240px] border",
              bg[t.type]
            )}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              {icon[t.type]}
            </span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => React.useContext(ToastContext);

// ─────────────────────────────────────────────────────────────
// LABEL (shadcn/ui Label)
// ─────────────────────────────────────────────────────────────
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-xs font-bold text-stone-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none block",
        className
      )}
      {...props}
    />
  )
);
Label.displayName = "Label";

// ─────────────────────────────────────────────────────────────
// TEXTAREA (shadcn/ui Textarea)
// ─────────────────────────────────────────────────────────────
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs shadow-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:border-[#22C55E] focus-visible:ring-2 focus-visible:ring-[#22C55E]/15 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

// ─────────────────────────────────────────────────────────────
// PROGRESS (shadcn/ui Progress)
// ─────────────────────────────────────────────────────────────
export const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value?: number; indicatorClassName?: string }
>(({ className, value = 0, indicatorClassName, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-stone-100",
      className
    )}
    {...props}
  >
    <div
      className={cn("h-full bg-[#22C55E] transition-all duration-300 rounded-full", indicatorClassName)}
      style={{ width: `${Math.min(100, Math.max(0, value || 0))}%` }}
    />
  </div>
));
Progress.displayName = "Progress";

// ─────────────────────────────────────────────────────────────
// ALERT (shadcn/ui Alert)
// ─────────────────────────────────────────────────────────────
export const alertVariants = cva(
  "relative w-full rounded-2xl border p-4 text-xs [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-white text-stone-900 border-stone-200/80 shadow-sm",
        destructive: "border-red-200 bg-red-50/70 text-red-900",
        success: "border-green-200 bg-[#DCFCE7]/50 text-green-900",
        warning: "border-amber-200 bg-amber-50/70 text-amber-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("mb-1 font-bold leading-none tracking-tight text-xs", className)} {...props} />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-xs text-stone-600 [&_p]:leading-relaxed", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

// ─────────────────────────────────────────────────────────────
// CHECKBOX (shadcn/ui Checkbox)
// ─────────────────────────────────────────────────────────────
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, onChange, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={(e) => {
          onChange?.(e);
          onCheckedChange?.(e.target.checked);
        }}
        className={cn(
          "h-4 w-4 rounded-md border border-stone-300 text-[#22C55E] focus:ring-[#22C55E] focus:ring-offset-0 accent-[#22C55E] cursor-pointer transition-all",
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

// ─────────────────────────────────────────────────────────────
// SELECT (shadcn styled Native Select)
// ─────────────────────────────────────────────────────────────
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative inline-block w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-9 w-full appearance-none rounded-xl border border-stone-200 bg-white px-3 py-1 pr-8 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:border-[#22C55E] focus-visible:ring-2 focus-visible:ring-[#22C55E]/15 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer font-medium text-stone-700",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-[10px]">
          ▼
        </span>
      </div>
    );
  }
);
Select.displayName = "Select";

// ─────────────────────────────────────────────────────────────
// BREADCRUMB (shadcn/ui Breadcrumb)
// ─────────────────────────────────────────────────────────────
export function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" className={cn("flex items-center text-xs text-stone-500", className)} {...props} />;
}
export function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return <ol className={cn("flex flex-wrap items-center gap-1.5 break-words", className)} {...props} />;
}
export function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}
export function BreadcrumbLink({ className, ...props }: React.ComponentProps<"a">) {
  return <a className={cn("transition-colors hover:text-stone-900 cursor-pointer font-medium", className)} {...props} />;
}
export function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return <span aria-current="page" className={cn("font-bold text-stone-900", className)} {...props} />;
}
export function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li aria-hidden="true" className={cn("text-stone-400 select-none text-[10px]", className)} {...props}>
      {children || "/"}
    </li>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGINATION (shadcn/ui Pagination)
// ─────────────────────────────────────────────────────────────
export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
}
export function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-row items-center gap-1", className)} {...props} />;
}
export function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn("", className)} {...props} />;
}
export function PaginationLink({
  isActive,
  size = "icon",
  className,
  ...props
}: ButtonProps & { isActive?: boolean }) {
  return (
    <Button
      variant={isActive ? "dark" : "outline"}
      size={size}
      className={cn("h-8 w-8 text-xs font-bold rounded-lg", isActive && "bg-stone-900 text-white", className)}
      {...props}
    />
  );
}
export function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" size="sm" className={cn("gap-1 h-8 px-2.5 text-xs font-medium", className)} {...props}>
      <span>‹</span> Previous
    </Button>
  );
}
export function PaginationNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="outline" size="sm" className={cn("gap-1 h-8 px-2.5 text-xs font-medium", className)} {...props}>
      Next <span>›</span>
    </Button>
  );
}

// ─────────────────────────────────────────────────────────────
// TOOLTIP (shadcn/ui Tooltip)
// ─────────────────────────────────────────────────────────────
export function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center z-50 animate-fade">
        <div className="rounded-md bg-stone-900 px-2.5 py-1 text-[11px] font-medium text-white shadow-md whitespace-nowrap">
          {text}
        </div>
        <div className="w-1.5 h-1.5 bg-stone-900 rotate-45 -mt-0.5" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ACCORDION (shadcn/ui Accordion)
// ─────────────────────────────────────────────────────────────
export function Accordion({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("divide-y divide-stone-200/80 rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-sm", className)}>{children}</div>;
}
export function AccordionItem({ title, children, defaultOpen = false }: { title: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="py-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-xs font-bold text-stone-800 hover:text-stone-950 transition-colors text-left bg-white hover:bg-stone-50/50"
      >
        <span>{title}</span>
        <span className={cn("text-xs text-stone-400 transition-transform duration-200", open && "rotate-180")}>▾</span>
      </button>
      {open && <div className="px-5 pb-4 pt-1 text-xs text-stone-600 bg-stone-50/30 animate-fade border-t border-stone-100">{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// WINNER STATUS BADGE
// ─────────────────────────────────────────────────────────────
export function WinnerStatusBadge({ status }: { status: "Pending" | "Verified" | "Approved" | "Paid" | "Rejected" | string }) {
  return <StatusBadge status={status} />;
}

// ─────────────────────────────────────────────────────────────
// BACKWARD COMPATIBLE HELPERS (StatCard, TableCard, Field, Toggle)
// ─────────────────────────────────────────────────────────────
export function StatCard({
  icon,
  label,
  value,
  change,
  changeUp,
}: {
  icon: string | React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeUp?: boolean;
}) {
  return (
    <Card className="p-4 hover:border-stone-300 transition-all">
      <div className="flex items-center justify-between mb-2">
        <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-sm font-bold">
          {icon}
        </div>
        {change && (
          <Badge variant={changeUp ? "green" : "red"}>
            {changeUp ? "↑" : "↓"} {change}
          </Badge>
        )}
      </div>
      <div className="text-[11px] text-stone-500 font-medium mb-0.5">{label}</div>
      <div className="text-xl font-black text-stone-900 tracking-tight">{value}</div>
    </Card>
  );
}

export function TableCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-center justify-between border-b border-stone-100 py-3.5 px-4 space-y-0">
        <CardTitle>{title}</CardTitle>
        {action}
      </CardHeader>
      {children}
    </Card>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-bold text-stone-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return <Switch checked={checked} onCheckedChange={onChange} />;
}

export const inputCls = "w-full px-3 py-2 rounded-xl border border-stone-200 text-xs bg-white outline-none focus:border-[#22C55E]";
export const selectCls = `${inputCls} cursor-pointer`;
