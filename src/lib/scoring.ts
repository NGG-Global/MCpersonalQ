import {
  feedback,
  type NorthStarDimension,
} from '../data/questionnaire';

export type Answers = Record<number, number>;

export type Scores = {
  technological: number;
  human: number;
  northStar: Record<NorthStarDimension, number>;
};

const toPercent = (averageOutOfFive: number): number => {
  return Math.round((averageOutOfFive / 5) * 100);
};

export function calculateScores(answers: Answers): Scores {
  const get = (id: number) => answers[id];

  const technologicalAverage = (get(1) + get(3) + get(5) + get(7) + get(9)) / 5;
  const humanAverage = (get(2) + get(4) + get(6) + get(8) + get(10)) / 5;

  return {
    technological: toPercent(technologicalAverage),
    human: toPercent(humanAverage),
    northStar: {
      'לכוון גבוה': toPercent((get(1) + get(2)) / 2),
      'להתחבר לאנשים': toPercent((get(3) + get(4)) / 2),
      'לפעול מתוך שליחות': toPercent((get(5) + get(6)) / 2),
      'לעדכן גרסה': toPercent((get(7) + get(8)) / 2),
      'לבחור לצמוח': toPercent((get(9) + get(10)) / 2),
    },
  };
}

export type ScoreLevel = 'high' | 'medium' | 'low';

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

export type FeedbackEntry = { label: string; text: string };

export function getTechnologicalFeedback(score: number): FeedbackEntry {
  return feedback.technological[getScoreLevel(score)];
}

export function getHumanFeedback(score: number): FeedbackEntry {
  return feedback.human[getScoreLevel(score)];
}
