import { useRef, useState } from 'react';
import { feedback } from '../data/questionnaire';
import {
  getHumanFeedback,
  getTechnologicalFeedback,
  type Scores,
} from '../lib/scoring';
import { exportResultsAsPng } from '../lib/exportPng';
import { exportResultsAsPdf } from '../lib/exportPdf';
import ScoreCard from './ScoreCard';
import NorthStarBars from './NorthStarBars';
import NorthStarRadar from './NorthStarRadar';
import FeedbackCard from './FeedbackCard';
import ExportCard from './ExportCard';
import ExportActions from './ExportActions';
import RainbowBar from './RainbowBar';

type ResultsScreenProps = {
  scores: Scores;
  onRestart: () => void;
};

export default function ResultsScreen({ scores, onRestart }: ResultsScreenProps) {
  const [busy, setBusy] = useState(false);
  const pngRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const techFeedback = getTechnologicalFeedback(scores.technological);
  const humanFeedback = getHumanFeedback(scores.human);

  const handlePng = async () => {
    if (!pngRef.current || busy) return;
    setBusy(true);
    try {
      await exportResultsAsPng(pngRef.current);
    } catch (error) {
      console.error('PNG export failed', error);
      alert('אירעה תקלה ביצירת התמונה. נא לנסות שוב.');
    } finally {
      setBusy(false);
    }
  };

  const handlePdf = async () => {
    if (!pdfRef.current || busy) return;
    setBusy(true);
    try {
      await exportResultsAsPdf(pdfRef.current);
    } catch (error) {
      console.error('PDF export failed', error);
      alert('אירעה תקלה ביצירת ה-PDF. נא לנסות שוב.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="shell">
      {/* סרגל פעולות עליון */}
      <div className="card">
        <div className="card__body results-toolbar">
          <button type="button" className="btn btn--ghost" onClick={onRestart}>
            <span className="arrow" aria-hidden="true">
              ↻
            </span>
            מילוי מחדש
          </button>
          <div className="actions">
            <ExportActions onDownloadPdf={handlePdf} onDownloadPng={handlePng} busy={busy} />
          </div>
        </div>
        <RainbowBar />
      </div>

      {/* כרטיס התוצאות הראשי */}
      <div className="card">
        <div className="card__body">
          <p className="eyebrow">התוצאות שלך</p>
          <h1 className="title-lg" style={{ marginBottom: 18 }}>
            מנהל/ת בעידן ה-<span className="accent-ai">AI</span>
          </h1>

          {/* אזור 1: שני ממדי העל */}
          <div className="score-grid">
            <ScoreCard label="כישורים אנושיים" value={scores.human} variant="human" />
            <ScoreCard
              label="כישורים טכנולוגיים"
              value={scores.technological}
              variant="tech"
            />
          </div>

          {/* אזור 2: מפת כוכב הצפון – רדאר (דסקטופ) + עמודות אופקי (ראשי) */}
          <div style={{ marginTop: 28 }}>
            <h2 className="section-title">מפת כוכב הצפון</h2>
            <div className="radar-desktop-only">
              <NorthStarRadar northStar={scores.northStar} />
            </div>
            <NorthStarBars northStar={scores.northStar} />
          </div>

          {/* אזור 3: משובים */}
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FeedbackCard
              variant="tech"
              title={feedback.technological.title}
              label={techFeedback.label}
              text={techFeedback.text}
            />
            <FeedbackCard
              variant="human"
              title={feedback.human.title}
              label={humanFeedback.label}
              text={humanFeedback.text}
            />
          </div>

          {/* פעולות תחתונות */}
          <div className="results-footer" style={{ marginTop: 28 }}>
            <ExportActions
              onDownloadPdf={handlePdf}
              onDownloadPng={handlePng}
              busy={busy}
              showRestart
              onRestart={onRestart}
            />
          </div>
        </div>
        <RainbowBar />
      </div>

      {/* כרטיסי ייצוא מחוץ למסך – בגודל קבוע, בלתי תלויים ברוחב המסך */}
      <div className="export-stage" aria-hidden="true">
        <ExportCard
          ref={pngRef}
          mode="png"
          scores={scores}
          technologicalFeedback={techFeedback}
          humanFeedback={humanFeedback}
        />
        <ExportCard
          ref={pdfRef}
          mode="pdf"
          scores={scores}
          technologicalFeedback={techFeedback}
          humanFeedback={humanFeedback}
        />
      </div>
    </div>
  );
}
