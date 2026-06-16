import { useMemo, useState } from 'react';
import { questions } from './data/questionnaire';
import { calculateScores, type Answers } from './lib/scoring';
import IntroScreen from './components/IntroScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultsScreen from './components/ResultsScreen';

type Stage = 'intro' | 'questions' | 'results';

export default function App() {
  const [stage, setStage] = useState<Stage>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const allAnswered = useMemo(
    () => questions.every((question) => answers[question.id] !== undefined),
    [answers],
  );

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
    } else if (allAnswered) {
      setStage('results');
    }
  };

  const handleBack = () => {
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRestart = () => {
    setAnswers({});
    setIndex(0);
    setStage('intro');
  };

  const scores = useMemo(() => (allAnswered ? calculateScores(answers) : null), [
    allAnswered,
    answers,
  ]);

  return (
    <div className="app">
      {stage === 'intro' && <IntroScreen onStart={() => setStage('questions')} />}

      {stage === 'questions' && (
        <QuestionScreen
          index={index}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}

      {stage === 'results' && scores && (
        <ResultsScreen scores={scores} onRestart={handleRestart} />
      )}
    </div>
  );
}
