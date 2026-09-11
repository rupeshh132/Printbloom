import { headers } from "next/headers"

type RateLimitEntry = {
  count: number;
  resetTime: number; 
};

// Global map for in-memory IP rate limiting
const rateLimitMap = new Map<string, RateLimitEntry>();

const LIMIT = 10;
const WINDOW_MS = 60 * 1000; // 1 minute

export async function getIP(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return headersList.get("x-real-ip") || "unknown-ip";
}

export function checkRateLimit(ip: string, endpoint: string): { success: boolean } {
  const key = `${endpoint}:${ip}`;
  const now = Date.now();

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + WINDOW_MS });
    return { success: true };
  }

  if (entry.count >= LIMIT) {
    return { success: false };
  }

  entry.count += 1;
  return { success: true };
}
