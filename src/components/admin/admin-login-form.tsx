"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { loginAdmin, type AdminLoginState } from "@/actions/admin-auth";
import { brand } from "@/lib/brand/config";

const initialState: AdminLoginState = { success: false };

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(loginAdmin, initialState);
  const configError = searchParams.get("error") === "not_configured";
  const nextPath = searchParams.get("next") ?? "";

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="card-elevated p-6 md:p-8">
        <p className="text-sm font-medium text-brand">{brand.companyName}</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Admin Login</h1>
        <p className="mt-2 text-sm text-muted">
          Sign in to view leads and analytics. This area is not public.
        </p>

        {(configError || state.error) && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {configError
              ? "Admin password is not configured. Set ADMIN_PASSWORD in the environment."
              : state.error}
          </p>
        )}

        <form action={formAction} className="mt-6 space-y-4">
          {nextPath && <input type="hidden" name="next" value={nextPath} />}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="Admin password"
              className="input-field"
            />
          </div>
          <button type="submit" disabled={isPending} className="btn-primary w-full">
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
