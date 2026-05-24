"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Demo flashcard data
const flashcards = [
  { word: "relationship", definition: "关系", phonetic: "/rɪˈleɪʃənʃɪp/" },
  { word: "context", definition: "语境，上下文", phonetic: "/ˈkɑːntekst/" },
  { word: "absolutely", definition: "绝对地", phonetic: "/ˈæbsəluːtli/" },
];

export default function ReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = (known: boolean) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }, 200);
  };

  if (flashcards.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-24">
          <h1 className="text-2xl font-bold mb-4">暂无需要复习的单词</h1>
          <p className="text-muted-foreground">
            先在学习页面收藏一些生词，然后回到这里复习
          </p>
        </div>
      </div>
    );
  }

  const card = flashcards[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-2">复习</h1>
      <p className="text-muted-foreground mb-8">
        {currentIndex + 1} / {flashcards.length}
      </p>

      {/* Flashcard */}
      <Card className="mb-8 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <CardHeader className="text-center py-12">
          {!isFlipped ? (
            <>
              <CardTitle className="text-3xl">{card.word}</CardTitle>
              <CardDescription className="text-lg">{card.phonetic}</CardDescription>
              <p className="text-sm text-muted-foreground mt-4">
                点击翻转查看释义
              </p>
            </>
          ) : (
            <>
              <CardTitle className="text-2xl">{card.definition}</CardTitle>
              <CardDescription className="text-lg mt-2">{card.word}</CardDescription>
              <CardDescription>{card.phonetic}</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent className="pb-6 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={(e) => { e.stopPropagation(); handleNext(false); }}
          >
            不认识
          </Button>
          <Button
            onClick={(e) => { e.stopPropagation(); handleNext(true); }}
          >
            认识
          </Button>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="flex justify-center gap-2">
        {flashcards.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
