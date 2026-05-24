import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">学习中心</h1>
        <Link href="/dashboard/import">
          <Button>导入视频</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>导入新视频</CardTitle>
            <CardDescription>拖入视频文件或粘贴 YouTube/B站链接</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/import">
              <Button className="w-full">开始导入</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>我的生词本</CardTitle>
            <CardDescription>收藏的单词和复习进度</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/vocabulary">
              <Button variant="outline" className="w-full">查看词库</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>复习</CardTitle>
            <CardDescription>基于记忆曲线的智能复习</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/review">
              <Button variant="outline" className="w-full">开始复习</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent videos placeholder */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">最近学习</h2>
        <div className="text-muted-foreground text-center py-12 border rounded-lg">
          还没有视频记录，点击上方「导入视频」开始学习
        </div>
      </div>
    </div>
  );
}
