import { northStarOrder } from '../data/questionnaire';
import type { Scores } from '../lib/scoring';

type NorthStarBarsProps = {
  northStar: Scores['northStar'];
};

/**
 * גרף עמודות אופקי לחמשת ממדי כוכב הצפון.
 * זו צורת ההצגה הראשית (קריאה במובייל, ב-PDF וב-PNG).
 */
export default function NorthStarBars({ northStar }: NorthStarBarsProps) {
  return (
    <div className="northstar">
      {northStarOrder.map(({ dimension, color }) => {
        const value = northStar[dimension];
        return (
          <div className="ns-row" key={dimension}>
            <div className="ns-label">
              <span className="ns-dot" style={{ background: color }} aria-hidden="true" />
              {dimension}
            </div>
            <div className="ns-track">
              <div
                className="ns-fill"
                style={{ width: `${value}%`, background: color }}
              />
            </div>
            <div className="ns-pct">{value}%</div>
          </div>
        );
      })}
    </div>
  );
}
