type LeaderBoardJSON = {
  items: LeaderBoardPerson[];
};
type LeaderBoardPerson = {
  name: string;
  topScore: number;
};

type MyScoreItem = {
  name: string;
  topScore: number;
  position: number;
};

type MyScoreJSON = {
  items: ScoreItem[];
  position: number;
  score: number;
  topScore: number;
};

type QuizQuestion = {
  question: string;
  answers: string[];
};

type Q_Answer {
  OK: boolean
  correct: string
}