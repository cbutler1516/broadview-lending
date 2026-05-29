import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/admin-shell";
import { LeadInbox } from "@/components/admin/lead-inbox";
import { requireAdminSession } from "@/lib/admin/session";
import { fetchLeads } from "@/lib/leads/queries";

export const metadata: Metadata = {
  title: "Lead Inbox",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  await requireAdminSession();
  const { leads, error, configured } = await fetchLeads();

  return (
    <AdminShell active="leads">
      <LeadInbox leads={leads} error={error} configured={configured} />
    </AdminShell>
  );
}
