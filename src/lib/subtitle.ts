import type { SubtitleEntry } from "@/types/index";

/**
 * Parse SRT subtitle file content into subtitle entries.
 */
export function parseSRT(content: string): SubtitleEntry[] {
  const entries: SubtitleEntry[] = [];
  const blocks = content.trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;

    const timeLine = lines[1];
    const match = timeLine.match(
      /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/
    );
    if (!match) continue;

    const start =
      parseInt(match[1]) * 3600000 +
      parseInt(match[2]) * 60000 +
      parseInt(match[3]) * 1000 +
      parseInt(match[4]);

    const end =
      parseInt(match[5]) * 3600000 +
      parseInt(match[6]) * 60000 +
      parseInt(match[7]) * 1000 +
      parseInt(match[8]);

    const content = lines.slice(2).join(" ").replace(/<[^>]*>/g, "").trim();

    entries.push({ start, end, content });
  }

  return entries;
}

/**
 * Parse VTT subtitle file content into subtitle entries.
 */
export function parseVTT(content: string): SubtitleEntry[] {
  const entries: SubtitleEntry[] = [];
  // Remove WEBVTT header
  const body = content.replace(/WEBVTT[^\n]*\n\n/, "");
  const blocks = body.trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 2) continue;

    // First line might be an index number
    const timeLine = lines.length >= 3 && /^\d+$/.test(lines[0]) ? lines[1] : lines[0];
    const match = timeLine.match(
      /(\d{2}):(\d{2}):(\d{2})\.(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2})\.(\d{3})/
    );
    if (!match) continue;

    const start =
      parseInt(match[1]) * 3600000 +
      parseInt(match[2]) * 60000 +
      parseInt(match[3]) * 1000 +
      parseInt(match[4]);

    const end =
      parseInt(match[5]) * 3600000 +
      parseInt(match[6]) * 60000 +
      parseInt(match[7]) * 1000 +
      parseInt(match[8]);

    const contentStart = lines.length >= 3 && /^\d+$/.test(lines[0]) ? 2 : 1;
    const content = lines.slice(contentStart).join(" ").replace(/<[^>]*>/g, "").trim();

    entries.push({ start, end, content });
  }

  return entries;
}

/**
 * Get the current subtitle index based on video time.
 */
export function getCurrentSubtitleIndex(
  subtitles: SubtitleEntry[],
  currentTime: number
): number {
  const timeMs = currentTime * 1000;
  for (let i = 0; i < subtitles.length; i++) {
    if (timeMs >= subtitles[i].start && timeMs <= subtitles[i].end) {
      return i;
    }
  }
  // Return the last subtitle that ended before current time
  for (let i = subtitles.length - 1; i >= 0; i--) {
    if (timeMs >= subtitles[i].end) {
      return i;
    }
  }
  return 0;
}
