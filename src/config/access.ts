// Post-Clerk gate: any authenticated user whose email is on an allowed domain
// can reach the dashboard. No per-email allowlist.
export const ALLOWED_DOMAINS = ['atfxgm.com'] as const

export function isAllowedDomain(email?: string | null): boolean {
  if (!email) return false
  const normalized = email.trim().toLowerCase()
  const at = normalized.lastIndexOf('@')
  if (at < 0) return false
  const domain = normalized.slice(at + 1)
  return (ALLOWED_DOMAINS as readonly string[]).includes(domain)
}
