import { sourceContent } from '../data/questionnaire';
import RainbowBar from './RainbowBar';

type InstructionsScreenProps = {
  onContinue: () => void;
};

// בכיוון RTL טבעי: 1 בקצה הימני ו-5 בקצה השמאלי – זהה לסולם שבמסכי השאלות ולעיצוב.
const SCALE = [1, 2, 3, 4, 5];

export default function InstructionsScreen({ onContinue }: InstructionsScreenProps) {
  return (
    <div className="shell">
      <div className="card">
        <div className="card__body instructions-card">
          <p className="eyebrow" style={{ textAlign: 'center' }}>
            לפני שמתחילים
          </p>

          <p className="instructions-text">{sourceContent.scaleInstruction}</p>

          <div className="scale-preview" aria-hidden="true">
            {SCALE.map((number) => (
              <div key={number} className="scale-bubble">
                {number}
              </div>
            ))}
          </div>

          <div className="scale-line">
            <div className="rainbow-bar rainbow-bar--rounded" />
          </div>

          <button type="button" className="btn btn--primary" onClick={onContinue}>
            הבנתי, אפשר להתחיל
          </button>
        </div>
        <RainbowBar />
      </div>
    </div>
  );
}
