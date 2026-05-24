import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">WordView</CardTitle>
        <CardDescription>微信登录，开始学习英语</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full" size="lg">
          微信登录
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          登录后即可使用视频导入、字幕学习、生词本等功能
        </p>
      </CardContent>
    </Card>
  );
}
