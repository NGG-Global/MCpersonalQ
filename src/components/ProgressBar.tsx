type ProgressBarProps = {
  current: number; // 1-based
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div>
      <div className="progress-head">
        <span className="pct">{percent}%</span>
        <span className="count">
          שאלה {current} מתוך {total}
        </span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`שאלה ${current} מתוך ${total}`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
