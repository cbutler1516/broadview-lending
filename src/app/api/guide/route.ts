import { z } from "zod";
import { generateGuideAnswer, isGuideAiEnabled } from "@/lib/assistant/openai";
import { resourceAnswer, sensitiveMessage } from "@/lib/assistant/resources";

export const runtime = "nodejs";
export const maxDuration = 20;
const schema = z.object({
  message: z.string().trim().min(1).max(800),
  allowAI: z.boolean().optional(),
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(1500) })).max(4).optional(),
}).strict();
const buckets = new Map<string, { count: number; until: number }>();
function limited(key: string, maximum: number) {
  const now = Date.now();
  for (const [id, value] of buckets) if (value.until <= now) buckets.delete(id);
  if (!buckets.has(key) && buckets.size >= 4096) return true;
  const bucket = buckets.get(key) ?? { count: 0, until: now + 60000 };
  bucket.count += 1;
  buckets.set(key, bucket);
  return bucket.count > maximum;
}
function json(body: unknown, status = 200) { return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "60" } : {}) } }); }
export function GET() { return json({ mode: isGuideAiEnabled() ? "ai" : "resources" }); }

async function readLimitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("missing_body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 16000) { await reader.cancel(); throw new Error("large_body"); }
    chunks.push(value);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (request.headers.get("sec-fetch-site") === "cross-site" || (origin && origin !== new URL(request.url).origin)) return json({ error: "Please use the guide on the Broadview website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Use a JSON request." }, 415);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim().slice(0, 64) ?? "unknown";
  if (limited("global", 60) || limited(`ip:${ip}`, 12)) return json({ error: "Please wait a minute, or contact a Broadview advisor." }, 429);
  let body: unknown;
  try { body = await readLimitedBody(request); } catch { return json({ error: "Please send a shorter question." }, 400); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: "Use a question of 800 characters or fewer." }, 400);
  const { message, allowAI, history = [] } = parsed.data;
  const fallback = resourceAnswer(message);
  if (!allowAI || !isGuideAiEnabled() || sensitiveMessage([message, ...history.map((item) => item.content)].join(" "))) return json(fallback);
  try {
    const answer = await generateGuideAnswer(message, history, fallback.resources);
    return json({ ...fallback, mode: "ai", answer });
  } catch {
    // Do not log messages, keys, provider bodies, or client details.
    return json({ ...fallback, notice: "Live AI is unavailable right now. Here are Broadview resources instead." });
  }
}
