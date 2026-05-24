"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Demo data
const demoWords = [
  { word: "relationship", definition: "关系", phonetic: "/rɪˈleɪʃənʃɪp/", difficulty: "B1", mastery: 3 },
  { word: "absolutely", definition: "绝对地", phonetic: "/ˈæbsəluːtli/", difficulty: "B1", mastery: 2 },
  { word: "vocabulary", definition: "词汇", phonetic: "/vəˈkæbjəleri/", difficulty: "B1", mastery: 4 },
  { word: "context", definition: "语境，上下文", phonetic: "/ˈkɑːntekst/", difficulty: "B2", mastery: 1 },
  { word: "attention", definition: "注意力", phonetic: "/əˈtenʃən/", difficulty: "A2", mastery: 5 },
  { word: "useful", definition: "有用的", phonetic: "/ˈjuːsfl/", difficulty: "A2", mastery: 5 },
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

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = demoWords.filter((w) => {
    const matchSearch = w.word.toLowerCase().includes(search.toLowerCase()) ||
      w.definition.includes(search);
    const matchFilter = filter === "all" || w.difficulty === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">生词本</h1>
        <span className="text-muted-foreground">{demoWords.length} 个单词</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="py-3">
            <CardDescription>总计</CardDescription>
            <CardTitle className="text-2xl">{demoWords.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardDescription>已掌握</CardDescription>
            <CardTitle className="text-2xl text-green-600">
              {demoWords.filter((w) => w.mastery >= 4).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardDescription>学习中</CardDescription>
            <CardTitle className="text-2xl text-yellow-600">
              {demoWords.filter((w) => w.mastery >= 1 && w.mastery < 4).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardDescription>新词</CardDescription>
            <CardTitle className="text-2xl text-red-600">
              {demoWords.filter((w) => w.mastery === 0).length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search and filter */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="搜索单词或释义..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          {["all", "A1", "A2", "B1", "B2", "C1", "C2"].map((d) => (
            <Button
              key={d}
              variant={filter === d ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(d)}
            >
              {d === "all" ? "全部" : d}
            </Button>
          ))}
        </div>
      </div>

      {/* Word list */}
      <ScrollArea className="h-[400px]">
        <div className="space-y-2">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-lg">{item.word}</span>
                  <Badge className={`${getDifficultyColor(item.difficulty)} text-white`}>
                    {item.difficulty}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">{item.phonetic}</span>
              </div>
              <div className="text-right">
                <div className="font-medium">{item.definition}</div>
                <div className="text-sm text-muted-foreground">
                  掌握度: {"★".repeat(item.mastery)}{"☆".repeat(5 - item.mastery)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
