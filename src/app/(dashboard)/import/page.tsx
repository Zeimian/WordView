"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { parseSRT, parseVTT } from "@/lib/subtitle";
import { extractWords } from "@/lib/vocabulary";

export default function ImportPage() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleDrop = useCallback(
    (e: React.DragEvent, type: "video" | "subtitle") => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (type === "video") setVideoFile(file);
      else setSubtitleFile(file);
    },
    []
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "video" | "subtitle"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === "video") setVideoFile(file);
      else setSubtitleFile(file);
    }
  };

  const processFiles = async () => {
    setIsProcessing(true);
    try {
      if (subtitleFile) {
        const content = await subtitleFile.text();
        const ext = subtitleFile.name.split(".").pop()?.toLowerCase();
        const subtitles = ext === "vtt" ? parseVTT(content) : parseSRT(content);

        const words = extractWords(subtitles);
        setWordCount(words.size);
      }
      // Video processing (upload to server) would happen here
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">导入视频</h1>

      {/* URL Import */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>粘贴视频链接</CardTitle>
          <CardDescription>支持 YouTube / B站 视频链接</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <Button disabled={!videoUrl}>解析</Button>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>上传文件</CardTitle>
          <CardDescription>拖拽或选择视频和字幕文件</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Video drop zone */}
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center"
            onDrop={(e) => handleDrop(e, "video")}
            onDragOver={handleDragOver}
          >
            {videoFile ? (
              <p className="text-green-600 font-medium">
                已选择: {videoFile.name}
              </p>
            ) : (
              <div>
                <p className="text-muted-foreground mb-2">
                  拖拽视频文件到此处
                </p>
                <p className="text-sm text-muted-foreground">
                  支持 MP4 / MKV / WEBM
                </p>
                <input
                  type="file"
                  accept=".mp4,.mkv,.webm"
                  className="hidden"
                  id="video-upload"
                  onChange={(e) => handleFileInput(e, "video")}
                />
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => document.getElementById("video-upload")?.click()}
                >
                  选择文件
                </Button>
              </div>
            )}
          </div>

          {/* Subtitle drop zone */}
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center"
            onDrop={(e) => handleDrop(e, "subtitle")}
            onDragOver={handleDragOver}
          >
            {subtitleFile ? (
              <p className="text-green-600 font-medium">
                已选择: {subtitleFile.name}
              </p>
            ) : (
              <div>
                <p className="text-muted-foreground mb-2">
                  拖拽字幕文件到此处（可选）
                </p>
                <p className="text-sm text-muted-foreground">
                  支持 SRT / VTT
                </p>
                <input
                  type="file"
                  accept=".srt,.vtt"
                  className="hidden"
                  id="subtitle-upload"
                  onChange={(e) => handleFileInput(e, "subtitle")}
                />
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => document.getElementById("subtitle-upload")?.click()}
                >
                  选择文件
                </Button>
              </div>
            )}
          </div>

          {subtitleFile && wordCount > 0 && (
            <p className="text-sm text-muted-foreground">
              从字幕中提取到 <strong>{wordCount}</strong> 个词汇
            </p>
          )}

          <Button
            className="w-full"
            disabled={!videoFile && !videoUrl}
            onClick={processFiles}
          >
            {isProcessing ? "处理中..." : "开始学习"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
