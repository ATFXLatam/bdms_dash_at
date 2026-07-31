import type { ComponentProps } from 'react'
import type { ClerkProvider } from '@clerk/react'

// Derive the appearance type from ClerkProvider itself so we don't depend on the
// transitive @clerk/types package (absent in pnpm's isolated node_modules on CI).
type Appearance = NonNullable<ComponentProps<typeof ClerkProvider>['appearance']>

// Bind Clerk's widget to the app design tokens. Values are CSS variable
// references, so they resolve against the live `.dark` / light cascade on <html>
// — the login card follows the theme with no per-theme branching here.
export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: 'var(--highlight)',
    colorBackground: 'var(--card)',
    colorText: 'var(--foreground)',
    colorTextSecondary: 'var(--muted-foreground)',
    colorInputBackground: 'var(--background)',
    colorInputText: 'var(--foreground)',
    colorNeutral: 'var(--foreground)',
    colorDanger: 'var(--destructive)',
    borderRadius: 'var(--radius)',
  },
  elements: {
    card: 'bg-card text-foreground border border-border shadow-sm',
    // Clerk renders a second "footer" surface below the card; keep it on-theme.
    footer: 'bg-card',
    formFieldInput: 'bg-background border-border',
  },
}
