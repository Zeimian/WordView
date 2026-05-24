import type { SubtitleEntry } from "@/types/index";

// Common English stop words to filter out during vocabulary extraction
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "shall", "can", "need", "dare", "ought",
  "used", "to", "of", "in", "for", "on", "with", "at", "by", "from",
  "as", "into", "through", "during", "before", "after", "above", "below",
  "between", "under", "again", "further", "then", "once", "here", "there",
  "when", "where", "why", "how", "all", "each", "few", "more", "most",
  "other", "some", "such", "no", "nor", "not", "only", "own", "same",
  "so", "than", "too", "very", "just", "don", "now", "i", "me", "my",
  "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
  "yourself", "yourselves", "he", "him", "his", "himself", "she", "her",
  "hers", "herself", "it", "its", "itself", "they", "them", "their",
  "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
  "these", "those", "am", "but", "if", "or", "because", "until", "while",
  "and", "about", "against", "over", "out", "up", "down", "off",
]);

/**
 * Extract words from subtitles, count frequency, and return sorted list.
 */
export function extractWords(subtitles: SubtitleEntry[]): Map<string, number> {
  const wordCount = new Map<string, number>();

  for (const subtitle of subtitles) {
    const words = subtitle.content
      .toLowerCase()
      .replace(/[^a-z\s'-]/g, "")
      .split(/\s+/)
      .map((w) => w.replace(/^['-]+|['-]+$/g, ""))
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

    for (const word of words) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  }

  // Sort by frequency descending
  return new Map(
    [...wordCount.entries()].sort((a, b) => b[1] - a[1])
  );
}
