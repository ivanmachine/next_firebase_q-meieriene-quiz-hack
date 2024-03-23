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
  hash: string;
  question: string;
  answers: string[];
  answer: null | string;
};
