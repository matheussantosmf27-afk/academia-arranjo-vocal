import { describe, expect, it } from "vitest";
import { normalizeSupabaseUrl } from "../url";

describe("normalizeSupabaseUrl", () => {
  it.each([
    ["https://abc.supabase.co", "https://abc.supabase.co"],
    ["https://abc.supabase.co/", "https://abc.supabase.co"],
    ["  abc.supabase.co  ", "https://abc.supabase.co"],
    ['"https://abc.supabase.co"', "https://abc.supabase.co"],
    ["http://127.0.0.1:54321", "http://127.0.0.1:54321"],
  ])("%s → %s", (raw, expected) => expect(normalizeSupabaseUrl(raw)).toBe(expected));

  it.each([undefined, "", "   ", "ftp://x.co", "https://exa mple.com", "sb_publishable_xxx/abc"])("rejeita %s", (raw) => {
    expect(normalizeSupabaseUrl(raw)).toBeNull();
  });
});
