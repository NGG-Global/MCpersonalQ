import { sourceContent } from '../data/questionnaire';

type IntroScreenProps = {
  onStart: () => void;
};

// בכיוון RTL טבעי: 1 בקצה הימני ו-5 בקצה השמאלי – זהה לסולם שבמסכי השאלות.
const SCALE = [1, 2, 3, 4, 5];

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
          {/* הכותרת מוצגת ראשונה – למעלה במובייל, ובצד ימין בדסקטופ */}
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

          <div className="intro-left">
            <p className="eyebrow">{sourceContent.introTitle}</p>
            {sourceContent.introParagraphs.map((paragraph, index) => (
              <p key={index} className="muted">
                {paragraph}
              </p>
            ))}

            {/* ההסבר על אופן הדירוג מוצג כאן בעמוד הבית */}
            <div className="intro-scale">
              <p className="intro-scale__text">{sourceContent.scaleInstruction}</p>
              <div className="scale-preview" aria-hidden="true">
                {SCALE.map((number) => (
                  <div key={number} className="scale-bubble scale-bubble--sm">
                    {number}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn btn--primary"
              style={{ marginTop: '4px' }}
              onClick={onStart}
            >
              <span className="arrow" aria-hidden="true">
                ←
              </span>
              התחלת השאלון
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
