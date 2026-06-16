import { useState } from 'react';
import { questions } from '../data/questionnaire';
import type { Answers } from '../lib/scoring';
import ProgressBar from './ProgressBar';
import RatingScale from './RatingScale';
import RainbowBar from './RainbowBar';

type QuestionScreenProps = {
  index: number; // 0-based
  answers: Answers;
  onAnswer: (questionId: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function QuestionScreen({
  index,
  answers,
  onAnswer,
  onNext,
  onBack,
}: QuestionScreenProps) {
  const [showValidation, setShowValidation] = useState(false);

  const question = questions[index];
  const total = questions.length;
  const value = answers[question.id];
  const isLast = index === total - 1;
  const isFirst = index === 0;

  const handleSelect = (selected: number) => {
    setShowValidation(false);
    onAnswer(question.id, selected);
  };

  const handleNext = () => {
    if (value === undefined) {
      setShowValidation(true);
      return;
    }
    setShowValidation(false);
    onNext();
  };

  const handleBack = () => {
    setShowValidation(false);
    onBack();
  };

  return (
    <div className="shell">
      <div className="card">
        <div className="card__body">
          <ProgressBar current={index + 1} total={total} />

          <div className="question-card" style={{ marginTop: '22px' }}>
            {/* בשלב המענה מוצג רק נוסח ההיגד, ללא הקטגוריות הפנימיות. */}
            <p className="question-text">{question.text}</p>
            <RatingScale value={value} onChange={handleSelect} />
          </div>

          {showValidation && (
            <div className="validation" role="alert">
              <span aria-hidden="true">ⓘ</span>
              כדי להמשיך, יש לבחור דירוג.
            </div>
          )}

          <div className="nav-row">
            <button
              type="button"
              className={`btn btn--primary${value === undefined ? ' btn--locked' : ''}`}
              onClick={handleNext}
              aria-disabled={value === undefined}
            >
              <span className="arrow" aria-hidden="true">
                →
              </span>
              {isLast ? 'הצגת תוצאות' : 'הבא'}
            </button>

            {!isFirst && (
              <button type="button" className="btn btn--ghost" onClick={handleBack}>
                חזרה
                <span className="arrow" aria-hidden="true">
                  ←
                </span>
              </button>
            )}
          </div>
        </div>
        <RainbowBar />
      </div>
    </div>
  );
}
