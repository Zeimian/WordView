"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useStudyStore } from "@/store/useStudyStore";
import { getCurrentSubtitleIndex } from "@/lib/subtitle";
import { speak } from "@/lib/speech";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Demo subtitle data (will be replaced with real data from API)
const demoSubtitles = [
  { start: 0, end: 3000, content: "Hey, welcome to Friends." },
  { start: 3000, end: 6000, content: "I'm not great at relationships." },
  { start: 6000, end: 9000, content: "But I absolutely love this show." },
  { start: 9000, end: 12000, content: "Let's learn some English together." },
  { start: 12000, end: 15000, content: "The vocabulary here is really useful." },
  { start: 15000, end: 18000, content: "Pay attention to how they use words in context." },
];

// Demo vocabulary from the subtitles
const demoVocabulary = [
  { word: "relationship", definition: "关系", phonetic: "/rɪˈleɪʃənʃɪp/", difficulty: "B1" as const, frequency: 2 },
  { word: "absolutely", definition: "绝对地", phonetic: "/ˈæbsəluːtli/", difficulty: "B1" as const, frequency: 1 },
  { word: "vocabulary", definition: "词汇", phonetic: "/vəˈkæbjəleri/", difficulty: "B1" as const, frequency: 1 },
  { word: "context", definition: "语境，上下文", phonetic: "/ˈkɑːntekst/", difficulty: "B2" as const, frequency: 1 },
  { word: "attention", definition: "注意力", phonetic: "/əˈtenʃən/", difficulty: "A2" as const, frequency: 1 },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "A1": return "bg-green-500";
    case "A2": return "bg-lime-500";
    case "B1": return "bg-yellow-500";
    case "B2": return "bg-orange-500";
    case "C1": return "bg-red-500";
    case "C2": return "bg-red-700";
    default: return "bg-gray-500";
  }
}

export default function StudyPage({ params }: { params: Promise<{ videoId: string }> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWord, setSelectedWordState] = useState<string | null>(null);
  const { subtitles, setSubtitles } = useStudyStore();

  useEffect(() => {
    // Load demo subtitles
    setSubtitles(demoSubtitles);
  }, [setSubtitles]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handlePlay = useCallback(() => setIsPlaying(true), []);
  const handlePause = useCallback(() => setIsPlaying(false), []);

  const currentSubtitleIndex = getCurrentSubtitleIndex(subtitles, currentTime);
  const currentSubtitle = subtitles[currentSubtitleIndex];

  const handleWordClick = (word: string) => {
    setSelectedWordState(word);
    speak(word);
  };

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
  };

  const handleSubtitleClick = (start: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = start / 1000;
      videoRef.current.play();
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left: Video + Subtitle Area */}
      <div className="flex-1 flex flex-col border-r">
        {/* Video Player */}
        <div className="bg-black aspect-video relative">
          <video
            ref={videoRef}
            className="w-full h-full"
            onTimeUpdate={handleTimeUpdate}
            onPlay={handlePlay}
            onPause={handlePause}
            controls
          >
            {/* Demo video placeholder - replace with real source */}
            <source src="" type="video/mp4" />
          </video>
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Button size="lg" onClick={handleTogglePlay}>
                ▶ 播放
              </Button>
            </div>
          )}
        </div>

        {/* Current Subtitle Display */}
        <div className="p-4 bg-background border-t">
          <div className="text-center text-lg min-h-[3rem] flex items-center justify-center">
            {currentSubtitle ? (
              <div className="flex flex-wrap justify-center gap-1">
                {currentSubtitle.content.split(" ").map((word: string, i: number) => {
                  const cleanWord = word.replace(/[^a-zA-Z'-]/g, "");
                  if (!cleanWord) return <span key={i}>{word} </span>;
                  return (
                    <span key={i}>
                      <button
                        className="hover:bg-primary/10 rounded px-0.5 transition cursor-pointer"
                        onClick={() => handleWordClick(cleanWord.toLowerCase())}
                      >
                        {word}
                      </button>
                      {i < currentSubtitle.content.split(" ").length - 1 ? " " : ""}
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className="text-muted-foreground">暂无字幕</span>
            )}
          </div>
        </div>

        {/* Subtitle List */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {subtitles.map((sub, i) => (
                <button
                  key={i}
                  className={`w-full text-left px-4 py-3 rounded-lg transition ${
                    i === currentSubtitleIndex
                      ? "bg-primary/10 border border-primary/30"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleSubtitleClick(sub.start)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-16">
                      {new Date(sub.start).toISOString().slice(14, 19)}
                    </span>
                    <span className="text-sm">{sub.content}</span>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Right: Vocabulary Panel */}
      <div className="w-80 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Friends S1E01</h2>
          <p className="text-sm text-muted-foreground">6 个词汇</p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {demoVocabulary.map((item, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg border cursor-pointer transition ${
                  selectedWord === item.word
                    ? "border-primary bg-primary/5"
                    : "hover:border-primary/50"
                }`}
                onClick={() => handleWordClick(item.word)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{item.word}</span>
                  <Badge className={`${getDifficultyColor(item.difficulty)} text-white`}>
                    {item.difficulty}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">{item.phonetic}</div>
                <div className="text-sm mt-1">{item.definition}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full">
            收藏到生词本
          </Button>
        </div>
      </div>
    </div>
  );
}
