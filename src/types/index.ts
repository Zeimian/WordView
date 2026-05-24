// Global type definitions for WordView

export interface User {
  id: string;
  name: string | null;
  avatar: string | null;
  phone: string | null;
  vipLevel: number;
  dailyUsage: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  userId: string;
  title: string;
  url: string | null;
  filePath: string | null;
  duration: number;
  subtitleText: string | null;
  language: string;
  createdAt: Date;
}

export interface Vocabulary {
  id: string;
  videoId: string;
  word: string;
  definition: string | null;
  phonetic: string | null;
  difficulty: string; // A1, A2, B1, B2, C1, C2
  frequency: number;
  contextSentence: string | null;
  timestampInVideo: number;
  createdAt: Date;
}

export interface UserWord {
  id: string;
  userId: string;
  wordId: string;
  masteryLevel: number; // 0-5
  lastReviewed: Date | null;
  nextReview: Date | null;
  timesReviewed: number;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  userId: string;
  type: string; // browse, quiz, speaking
  wordsCount: number;
  duration: number;
  score: number | null;
  createdAt: Date;
}

export interface SubtitleEntry {
  start: number; // ms
  end: number; // ms
  content: string;
}
