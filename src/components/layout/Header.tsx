import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-lg">
            WordView
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition">
              学习
            </Link>
            <Link href="/dashboard/vocabulary" className="text-muted-foreground hover:text-foreground transition">
              词库
            </Link>
            <Link href="/dashboard/review" className="text-muted-foreground hover:text-foreground transition">
              复习
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/import"
            className="text-sm text-muted-foreground hover:text-foreground transition"
          >
            导入视频
          </Link>
        </div>
      </div>
    </header>
  );
}
