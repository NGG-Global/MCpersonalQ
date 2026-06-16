type ScoreCardProps = {
  label: string;
  value: number; // 0-100
  variant: 'tech' | 'human';
};

/**
 * ResultMetricCard – כרטיס ציון על אחד (כישורים טכנולוגיים / אנושיים).
 */
export default function ScoreCard({ label, value, variant }: ScoreCardProps) {
  return (
    <div className={`score-card score-card--${variant}`}>
      <span className="label">{label}</span>
      <span className="value">
        {value}
        <sup>%</sup>
      </span>
      <div className="bar-track" aria-hidden="true">
        <div className="bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
