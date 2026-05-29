import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { checkAdminLoginRedirect } from "@/actions/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  await checkAdminLoginRedirect();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-4 py-12">
      <Suspense
        fallback={
          <div className="card-elevated h-48 w-full max-w-sm animate-pulse" />
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
