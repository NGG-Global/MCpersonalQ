type RatingScaleProps = {
  value: number | undefined;
  onChange: (value: number) => void;
};

const OPTIONS = [1, 2, 3, 4, 5];

/**
 * סולם דירוג 1–5.
 * הסדר הוויזואלי תואם את העיצוב: 1 מימין ו-5 משמאל (כיוון RTL טבעי),
 * באמצעות flex-direction: row-reverse המוגדר ב-CSS.
 */
export default function RatingScale({ value, onChange }: RatingScaleProps) {
  return (
    <div className="rating" role="radiogroup" aria-label="דירוג בסולם 1 עד 5">
      {OPTIONS.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            className="rating-btn"
            role="radio"
            aria-checked={selected}
            aria-pressed={selected}
            aria-label={`דירוג ${option}`}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
