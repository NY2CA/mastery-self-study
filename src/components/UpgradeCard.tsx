import Link from 'next/link';
import Card from '@/components/Card';
import { openCalendly } from '@/lib/calendly';

/**
 * UpgradeCard · the post-Module-1 trigger.
 *
 * Renders a gold-accented card on the Self-Study dashboard once the buyer
 * has finished their first module (Submarket Intelligence). The card is
 * the only place the Self-Study skin uses gold prominently — by design,
 * it carries the upgrade signal.
 *
 * Behavior contract:
 *   - Visibility is decided by the parent (`isComplete('submarket')`).
 *   - Dismissal logic — "Not right now (hide for 30 days)" — also lives in
 *     the parent so this component stays presentational.
 *   - The "Inquire about Live" link routes to /inquire-about-live (Wave SS-3
 *     wires the Netlify Function handler that notifies Lou).
 *
 * Visual: navy-soft gradient background, gold border, gold-bright eyebrow
 * and CTA, navy-on-gold button styling. Mirrors the gold/navy aesthetic of
 * the Live coaching-call card so the upgrade target reads visually as
 * "the Live tier."
 */
interface UpgradeCardProps {
  firstName: string;
  onDismiss?: () => void;
  /** Show a smaller version (e.g. inside a sidebar). Default false. */
  compact?: boolean;
}

export default function UpgradeCard({ firstName, onDismiss, compact }: UpgradeCardProps) {
  return (
    <Card
      variant="offer"
      style={{
        background: 'linear-gradient(135deg, var(--navy-soft) 0%, #1f315a 100%)',
        border: '1px solid var(--gold)',
        color: 'var(--cream)',
        position: 'relative',
        padding: compact ? 32 : undefined,
      }}
    >
      <div className="flex flex-col gap-3">
        <span
          className="eyebrow"
          style={{ color: 'var(--gold-bright)', fontSize: 11, letterSpacing: '0.16em' }}
        >
          Your next step
        </span>
        <h3
          className="font-display"
          style={{
            fontSize: compact ? 22 : 26,
            color: 'var(--gold-bright)',
            margin: '4px 0',
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          You finished your first module — well done, {firstName}.
        </h3>
        <p style={{ color: 'rgba(250, 247, 242, 0.78)', maxWidth: 540, margin: 0 }}>
          Mastery Self-Study is the operator&rsquo;s execution toolkit. Mastery Live adds{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--gold-bright)' }}>Diva and Lou</em>{' '}
          alongside, working through your actual deals — monthly coaching, an AI tutor trained
          on the Mastery curriculum, and the full 12-module curriculum including{' '}
          <strong>Capital Raising, PPM &amp; Legal, Asset Management, and Exit.</strong>
        </p>
        <p style={{ color: 'rgba(250, 247, 242, 0.92)', margin: '4px 0 12px', fontSize: 15 }}>
          <strong>Upgrade now and your $1,997 credits toward Live tuition.</strong>
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/inquire-about-live"
            onClick={openCalendly}
            className="btn-primary"
            style={{
              background: 'var(--gold)',
              borderColor: 'var(--gold)',
              color: 'var(--navy)',
              whiteSpace: 'nowrap',
            }}
          >
            Inquire about Live
          </Link>
          {onDismiss && (
            <button
              onClick={onDismiss}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(250, 247, 242, 0.55)',
                fontFamily:
                  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 11,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '8px 4px',
              }}
              type="button"
            >
              Not right now (hide for 30 days)
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
