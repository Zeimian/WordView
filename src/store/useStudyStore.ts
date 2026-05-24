import { create } from "zustand";
import type { SubtitleEntry } from "@/types/index";

interface StudyState {
  currentVideoId: string | null;
  currentSubtitleIndex: number;
  isPlaying: boolean;
  subtitles: SubtitleEntry[];
  selectedWord: string | null;

  setCurrentVideoId: (id: string) => void;
  setCurrentSubtitleIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setSubtitles: (subtitles: SubtitleEntry[]) => void;
  setSelectedWord: (word: string | null) => void;
}

export const useStudyStore = create<StudyState>((set) => ({
  currentVideoId: null,
  currentSubtitleIndex: 0,
  isPlaying: false,
  subtitles: [],
  selectedWord: null,

  setCurrentVideoId: (id) => set({ currentVideoId: id }),
  setCurrentSubtitleIndex: (index) => set({ currentSubtitleIndex: index }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setSubtitles: (subtitles) => set({ subtitles }),
  setSelectedWord: (word) => set({ selectedWord: word }),
}));
