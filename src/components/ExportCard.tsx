import { forwardRef } from 'react';
import { feedback, northStarOrder } from '../data/questionnaire';
import type { Scores } from '../lib/scoring';

type ExportCardProps = {
  scores: Scores;
  technologicalFeedback: { label: string; text: string };
  humanFeedback: { label: string; text: string };
  mode: 'pdf' | 'png';
};

function renderTitle(size: number) {
  // בכרטיס הייצוא מציגים את שם השאלון (החלק שלפני המקף), בנוסח המקורי.
  return (
    <h1 className="export-title" style={{ margin: 0, lineHeight: 1.1, fontSize: size }}>
      {'מנהל/ת בעידן ה-'}
      <span className="accent-ai">AI</span>
    </h1>
  );
}

function ScoreBlock({
  label,
  value,
  variant,
  scale,
}: {
  label: string;
  value: number;
  variant: 'tech' | 'human';
  scale: number;
}) {
  const bg =
    variant === 'tech'
      ? 'linear-gradient(150deg, #2a3aa0, #20296f)'
      : 'linear-gradient(150deg, #d2477f, #b63a70)';
  return (
    <div
      style={{
        background: bg,
        color: '#fff',
        borderRadius: 18 * scale,
        padding: `${24 * scale}px ${26 * scale}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: 12 * scale,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 20 * scale, opacity: 0.92 }}>{label}</span>
      <span style={{ fontWeight: 900, fontSize: 58 * scale, lineHeight: 1 }}>
        {value}
        <span style={{ fontSize: 24 * scale, fontWeight: 800 }}>%</span>
      </span>
      <div
        style={{
          height: 10 * scale,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.28)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.95)',
          }}
        />
      </div>
    </div>
  );
}

function Bars({ northStar, scale }: { northStar: Scores['northStar']; scale: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 * scale }}>
      {northStarOrder.map(({ dimension, color }) => {
        const value = northStar[dimension];
        return (
          <div
            key={dimension}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              alignItems: 'center',
              gap: 16 * scale,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10 * scale,
                fontWeight: 600,
                fontSize: 19 * scale,
                minWidth: 168 * scale,
              }}
            >
              <span
                style={{
                  width: 12 * scale,
                  height: 12 * scale,
                  borderRadius: 999,
                  background: color,
                  flex: '0 0 auto',
                }}
              />
              {dimension}
            </div>
            <div
              style={{
                height: 14 * scale,
                borderRadius: 999,
                background: '#e9e8f0',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${value}%`,
                  height: '100%',
                  borderRadius: 999,
                  background: color,
                }}
              />
            </div>
            <div style={{ fontWeight: 800, fontSize: 19 * scale, minWidth: 52 * scale, textAlign: 'left' }}>
              {value}%
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * ExportCard – רכיב ייעודי לייצוא, בגודל קבוע ובלתי תלוי במסך המשתמש/ת.
 * PNG: 1080×1350 (כרטיס ויזואלי – ציוני על + כוכב הצפון).
 * PDF: רוחב A4 הכולל גם את המשובים המקוריים המלאים.
 */
const ExportCard = forwardRef<HTMLDivElement, ExportCardProps>(function ExportCard(
  { scores, technologicalFeedback, humanFeedback, mode },
  ref,
) {
  const isPng = mode === 'png';
  const scale = isPng ? 1 : 0.74;

  return (
    <div ref={ref} className={`export-card export-card--${mode}`}>
      <div className="export-head">
        <div>
          <p className="eyebrow" style={{ marginBottom: 8 }}>
            שאלון רפלקציה עצמית
          </p>
          {renderTitle(isPng ? 56 : 40)}
        </div>
      </div>

      <div className="export-scores">
        {/* בהתאם לעיצוב: כישורים אנושיים (ורוד) מימין, טכנולוגיים (נייבי) משמאל */}
        <ScoreBlock
          label="כישורים אנושיים"
          value={scores.human}
          variant="human"
          scale={scale}
        />
        <ScoreBlock
          label="כישורים טכנולוגיים"
          value={scores.technological}
          variant="tech"
          scale={scale}
        />
      </div>

      <div>
        <h2 className="export-section-title">מפת כוכב הצפון</h2>
        <Bars northStar={scores.northStar} scale={scale} />
      </div>

      {!isPng && (
        <div className="export-feedback">
          <div className="feedback-card feedback-card--tech">
            <div className="feedback-head">
              <h3>{feedback.technological.title}</h3>
              <span className="feedback-badge">{technologicalFeedback.label}</span>
            </div>
            <p className="feedback-text">{technologicalFeedback.text}</p>
          </div>
          <div className="feedback-card feedback-card--human">
            <div className="feedback-head">
              <h3>{feedback.human.title}</h3>
              <span className="feedback-badge">{humanFeedback.label}</span>
            </div>
            <p className="feedback-text">{humanFeedback.text}</p>
          </div>
        </div>
      )}

      <div className="export-rainbow" />
    </div>
  );
});

export default ExportCard;
