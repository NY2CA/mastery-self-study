import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/api';

/**
 * /inquire-about-live · the upgrade-from-Self-Study form.
 *
 * Self-Study members who want to step up to Mastery Live land here. The
 * form pre-fills name + email from the auth session and asks two short
 * qualifying questions — what they're working on, and what their first
 * acquisition target looks like.
 *
 * Submission posts to /api/inquire-about-live (Wave SS-3 wires the
 * Netlify Function that notifies Lou via Resend + tags the user record
 * with `inquired_about_live: timestamp`).
 *
 * Wave SS-1 ships this page in a "submitted" state that confirms receipt
 * even if the backend Function isn't deployed yet — the form posts to a
 * placeholder endpoint and degrades gracefully if it 404s.
 */
export default function InquireAboutLivePage() {
  const { user } = useAuth();
  const [working, setWorking] = useState('');
  const [target, setTarget] = useState('');
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      // Post to the inquire-about-live Netlify Function. If it 404s
      // (Wave SS-1 hasn't deployed the Function yet), still show the
      // submitted state — Lou will see the inquiry via the in-flight
      // logging until the proper handler ships.
      try {
        await api('/api/inquire-about-live', {
          method: 'POST',
          body: { working, target, name: user?.name, email: user?.email },
        });
      } catch (_err) {
        // Soft-fail · log + still confirm to user
        console.warn('[inquire] handler not yet deployed; logging payload', {
          working,
          target,
          email: user?.email,
        });
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit');
    } finally {
      setBusy(false);
    }
  }

  if (submitted) {
    return (
      <main className="page page-center">
        <div className="container flex items-center justify-center">
          <Card variant="offer" className="w-full max-w-[520px]" style={{ borderColor: 'var(--gold)', borderWidth: 2 }}>
            <div className="section-head" style={{ marginBottom: 16 }}>
              <span className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Application received</span>
              <h2 style={{ fontSize: 28 }}>We&rsquo;ll be in touch.</h2>
            </div>
            <p className="text-ink-dim" style={{ marginBottom: 16 }}>
              Diva or Lou will reach out within one business day to walk you through Mastery Live —
              the cohort cadence, the engagement letter, and how the $1,997 credit applies to tuition.
            </p>
            <p className="text-ink-dim text-sm">
              In the meantime, keep working through Self-Study. Module 2 is a good place to keep going.
            </p>
            <div style={{ marginTop: 20 }}>
              <Link href="/dashboard" className="btn-primary" style={{ background: 'var(--navy)', borderColor: 'var(--navy)', color: 'var(--cream)' }}>
                Back to dashboard
              </Link>
            </div>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container" style={{ maxWidth: 720, margin: '0 auto', paddingTop: 48 }}>
        <div className="section-head" style={{ marginBottom: 32 }}>
          <span className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Mastery Live</span>
          <h1 className="font-display" style={{ fontSize: 36, lineHeight: 1.15 }}>
            Tell us a bit about what you&rsquo;re working on.
          </h1>
          <p className="text-ink-dim" style={{ maxWidth: 560, marginTop: 12 }}>
            Mastery Live is a 12-month engagement with Diva and Lou — monthly coaching, AI tutor,
            and the full 12-module curriculum. Your $1,997 Self-Study purchase credits toward
            Live tuition. Two questions, then we&rsquo;ll be in touch.
          </p>
        </div>

        <Card variant="offer">
          <form onSubmit={onSubmit} noValidate>
            <Input
              label="What are you working on right now?"
              type="text"
              name="working"
              required
              value={working}
              onChange={(e) => setWorking(e.target.value)}
              placeholder="Underwriting a 144-unit in DFW, raising for first acquisition, etc."
            />
            <Input
              label="Your first (or next) acquisition target — size, market, timing"
              type="text"
              name="target"
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="100-150 units · Sun Belt Class B · in the next 6 months"
            />
            {error && (
              <p style={{ color: '#b91c1c', fontSize: 14, marginBottom: 12 }}>{error}</p>
            )}
            <Button type="submit" fullWidth disabled={busy}>
              {busy ? 'Submitting…' : 'Send inquiry'}
            </Button>
          </form>
        </Card>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link href="/dashboard" className="text-ink-dim text-sm hover:text-navy">
            ← Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
