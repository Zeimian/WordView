import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col flex-1 items-center justify-center px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          视频即教材，点词即学
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          导入英文视频 → 自动提取字幕 → 生成分级词汇 → 在真实语境中学习。
          让看视频变成高效学英语的过程。
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard/import">
            <Button size="lg">开始使用</Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline">
              了解更多
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-16 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-center mb-12">核心功能</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-2">字幕同步学习</h3>
            <p className="text-muted-foreground">
              视频播放时实时高亮当前字幕，点击单词即可查看释义和发音。
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-2">分级词汇生成</h3>
            <p className="text-muted-foreground">
              自动从字幕中提取词汇，按 CEFR 标准进行 A1-C2 难度分级。
            </p>
          </div>
          <div className="p-6 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-2">生词本与复习</h3>
            <p className="text-muted-foreground">
              收藏生词，卡片式翻转复习，AI 智能出题巩固记忆。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
