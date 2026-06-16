type FeedbackCardProps = {
  title: string;
  label: string;
  text: string;
  variant: 'tech' | 'human';
};

/**
 * כרטיס משוב – מציג את כותרת המשוב, תווית טווח הציון והטקסט המקורי המלא.
 */
export default function FeedbackCard({ title, label, text, variant }: FeedbackCardProps) {
  return (
    <div className={`feedback-card feedback-card--${variant}`}>
      <div className="feedback-head">
        <h3>{title}</h3>
        <span className="feedback-badge">{label}</span>
      </div>
      <p className="feedback-text">{text}</p>
    </div>
  );
}
