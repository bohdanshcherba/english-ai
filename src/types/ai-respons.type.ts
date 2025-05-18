export type AIResponse = {
  score: number;
  feedback: string;
  correctAnswer: string;
  nextTask: {
    ukrainian: string;
    expectedEnglish: string;
  };
};
