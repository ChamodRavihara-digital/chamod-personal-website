/**
 * Utility functions for Chamod.digital
 * Strict compliance with TODO rule:
 * Any string that starts with "TODO" and any null/undefined value is treated as empty and NOT rendered.
 */

export function isTodo(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.startsWith("TODO") || trimmed === "";
  }
  return false;
}

export function cleanString(value: unknown): string {
  if (isTodo(value)) return "";
  return String(value);
}

export function hasRealContent(value: unknown): boolean {
  return !isTodo(value);
}

export function formatMetricValue(value: string | null | undefined): {
  prefix?: string;
  number?: string;
  suffix?: string;
  full: string;
} {
  if (isTodo(value) || !value) return { full: "" };
  const v = String(value).trim();
  
  // Extract leading + or −
  const signMatch = v.match(/^([+−\-])/);
  const sign = signMatch ? signMatch[1] : "";
  
  // Extract trailing × or % or +
  const suffixMatch = v.match(/([×%+])$/);
  const suffix = suffixMatch ? suffixMatch[1] : "";
  
  // Core number part
  let core = v;
  if (sign) core = core.slice(sign.length);
  if (suffix) core = core.slice(0, -suffix.length);

  return {
    prefix: sign,
    number: core,
    suffix: suffix,
    full: v,
  };
}
