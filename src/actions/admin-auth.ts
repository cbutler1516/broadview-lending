"use server";

import { redirect } from "next/navigation";
import {
  createSessionToken,
  isAdminConfigured,
  setAdminSessionCookie,
  clearAdminSessionCookie,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/admin/session";

export type AdminLoginState = {
  success: boolean;
  error?: string;
};

export async function loginAdmin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  if (!isAdminConfigured()) {
    return {
      success: false,
      error: "Admin access is not configured. Set ADMIN_PASSWORD in the environment.",
    };
  }

  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return { success: false, error: "Invalid password." };
  }

  const token = createSessionToken();
  if (!token) {
    return { success: false, error: "Unable to create session." };
  }

  await setAdminSessionCookie(token);

  const next = String(formData.get("next") ?? "");
  if (next.startsWith("/admin") && next !== "/admin/login") {
    redirect(next);
  }

  redirect("/admin/leads");
}

export async function logoutAdmin() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

export async function checkAdminLoginRedirect() {
  if (await isAdminAuthenticated()) {
    redirect("/admin/leads");
  }
}
