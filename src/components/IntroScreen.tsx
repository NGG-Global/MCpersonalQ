import { sourceContent } from '../data/questionnaire';
import RainbowBar from './RainbowBar';

type IntroScreenProps = {
  onStart: () => void;
};

// כותרת השאלון מודגשת כך ש-"AI" מופיע בצבע ההדגשה, בהתאם לעיצוב.
function renderTitle() {
  const [before, after] = sourceContent.title.split('AI');
  return (
    <h1 className="title-xl">
      {before}
      <span className="accent-ai">AI</span>
      {after}
    </h1>
  );
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="shell shell--wide">
      <div className="card">
        <div className="intro-grid">
          <div className="intro-left">
            <p className="eyebrow">{sourceContent.introTitle}</p>
            {sourceContent.introParagraphs.map((paragraph, index) => (
              <p key={index} className="muted">
                {paragraph}
              </p>
            ))}

            <button
              type="button"
              className="btn btn--primary"
              style={{ marginTop: '10px' }}
              onClick={onStart}
            >
              <span className="arrow" aria-hidden="true">
                ←
              </span>
              התחלת השאלון
            </button>
          </div>

          <div className="intro-right">
            {renderTitle()}
            <p className="subtitle">שאלון רפלקציה עצמית</p>

            <p className="eyebrow" style={{ color: '#aeb4ec', marginBottom: 0 }}>
              {sourceContent.importantTitle}
            </p>
            <ul className="important">
              {sourceContent.importantItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <RainbowBar />
      </div>
    </div>
  );
}
