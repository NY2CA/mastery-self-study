/**
 * Calendly popup integration · helper utility
 * ─────────────────────────────────────────────────────────────────────
 * The Calendly widget script is loaded globally in _document.tsx. By the
 * time any of these handlers fire client-side, `window.Calendly` is
 * available with the `initPopupWidget` method.
 *
 * The Calendly URL is configurable via the NEXT_PUBLIC_CALENDLY_URL env
 * var. Set it in Netlify Site configuration → Environment variables and
 * trigger a redeploy (NEXT_PUBLIC_* vars are baked into the static bundle
 * at build time — they don't hot-reload).
 *
 * Fallback: if the widget script hasn't loaded (slow connection, ad
 * blocker, JS disabled), the click navigates to the /inquire-about-live
 * form page so the lead never falls through the cracks.
 */

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        parentElement?: Element;
        prefill?: { name?: string; email?: string };
      }) => void;
    };
  }
}

// Wave SS-3 · default points at the verified Calendly slug for Mastery Live
// strategy calls. Override via NEXT_PUBLIC_CALENDLY_URL on Netlify if you
// ever add a separate Self-Study-specific booking page; otherwise the
// hardcoded fallback is correct.
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  'https://calendly.com/mastery-live-strategy-call';

/**
 * Opens the Calendly popup widget at the configured URL. Use as an onClick
 * handler on any "Inquire about Mastery Live" CTA. Calls e.preventDefault()
 * so the underlying link / button doesn't navigate.
 */
export function openCalendly(e?: React.MouseEvent): void {
  if (e) e.preventDefault();
  if (typeof window === 'undefined') return;

  if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else {
    // Widget script didn't load (slow network, ad blocker, etc.) —
    // fall back to the form page so the lead is captured either way.
    window.location.href = '/inquire-about-live';
  }
}
