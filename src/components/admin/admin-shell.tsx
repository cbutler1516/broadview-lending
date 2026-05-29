import Link from "next/link";
import { logoutAdmin } from "@/actions/admin-auth";
import { brand } from "@/lib/brand/config";
import { cn } from "@/lib/utils/cn";

type AdminShellProps = {
  children: React.ReactNode;
  active: "leads" | "analytics";
};

const navItems = [
  { href: "/admin/leads", label: "Leads", key: "leads" as const },
  { href: "/admin/analytics", label: "Analytics", key: "analytics" as const },
];

export function AdminShell({ children, active }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-surface">
        <div className="section-container flex min-h-14 flex-wrap items-center justify-between gap-3 py-2 md:py-0">
          <div className="flex flex-wrap items-center gap-3 md:gap-6">
            <Link href="/admin/leads" className="text-sm font-semibold">
              {brand.companyName} Admin
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    active === item.key
                      ? "bg-brand-light font-medium text-brand"
                      : "text-muted hover:bg-surface-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-full border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="section-container py-10 md:py-12">{children}</main>
    </div>
  );
}
