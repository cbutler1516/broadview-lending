import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard";
import { requireAdminSession } from "@/lib/admin/session";
import { fetchAnalyticsSnapshot } from "@/lib/analytics/queries";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  await requireAdminSession();
  const snapshot = await fetchAnalyticsSnapshot();

  return (
    <AdminShell active="analytics">
      <AnalyticsDashboard {...snapshot} />
    </AdminShell>
  );
}
