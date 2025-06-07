export type AIResponse = {
  score: number;
  feedback: string;
  correctAnswer: string;
  nextTask: {
    ukrainian: string;
    expectedEnglish: string;
  };
};

export type AIQuizResponse = {
  score: number;
  feedback: string;
  correctAnswer: string;
  nextTask: {
    question: string;
    options: string[];
  };
};
