import { northStarOrder } from '../data/questionnaire';
import type { Scores } from '../lib/scoring';

type NorthStarRadarProps = {
  northStar: Scores['northStar'];
};

const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = 120;

// חמש פינות, החל מהקודקוד העליון ובכיוון השעון.
function pointAt(angleDeg: number, radius: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
}

/**
 * גרף רדאר (מחומש) לחמשת הממדים – תצוגה משלימה לדסקטופ בלבד.
 * אינו צורת ההצגה היחידה: גרף העמודות האופקי הוא הראשי.
 */
export default function NorthStarRadar({ northStar }: NorthStarRadarProps) {
  const count = northStarOrder.length;
  const angles = northStarOrder.map((_, i) => (360 / count) * i);

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = northStarOrder.map((item, i) => {
    const ratio = northStar[item.dimension] / 100;
    return pointAt(angles[i], RADIUS * ratio);
  });

  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <div className="radar-wrap">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="גרף רדאר של חמשת ממדי כוכב הצפון"
      >
        {/* רשת מחומשת */}
        {gridLevels.map((level) => {
          const path =
            angles
              .map((a, i) => {
                const p = pointAt(a, RADIUS * level);
                return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
              })
              .join(' ') + ' Z';
          return (
            <path
              key={level}
              d={path}
              fill="none"
              stroke="#dcdbe8"
              strokeWidth={1}
            />
          );
        })}

        {/* צירים */}
        {angles.map((a, i) => {
          const p = pointAt(a, RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={p.x}
              y2={p.y}
              stroke="#e4e3ee"
              strokeWidth={1}
            />
          );
        })}

        {/* מצולע הנתונים */}
        <path
          d={dataPath}
          fill="rgba(207, 63, 125, 0.14)"
          stroke="#cf3f7d"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />

        {/* נקודות צבעוניות בקודקודים */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={6}
            fill={northStarOrder[i].color}
            stroke="#fff"
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>
  );
}
