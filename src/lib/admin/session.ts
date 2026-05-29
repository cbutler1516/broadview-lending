import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "./constants";

export { ADMIN_COOKIE_NAME };

function getAdminSecret(): string | undefined {
  return process.env.ADMIN_PASSWORD?.trim() || undefined;
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminSecret());
}

export function createSessionToken(): string | null {
  const secret = getAdminSecret();
  if (!secret) return null;

  const payload = Buffer.from(
    JSON.stringify({
      exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
      v: 1,
    }),
  ).toString("base64url");

  return `${payload}.${signPayload(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  const secret = getAdminSecret();
  if (!secret || !token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = signPayload(payload, secret);

  try {
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (sigBuffer.length !== expectedBuffer.length) return false;
    if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;
  } catch {
    return false;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      exp?: number;
    };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const configured = getAdminSecret();
  if (!configured || !password) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(configured);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function getAdminSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const token = await getAdminSessionToken();
  return verifySessionToken(token);
}

export async function requireAdminSession() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
