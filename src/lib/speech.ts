/**
 * Speak a word using Web Speech API.
 */
export function speak(word: string, lang: string = "en-US"): void {
  if (!window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = lang;
  utterance.rate = 0.8;

  // Prefer American English voice
  const voices = window.speechSynthesis.getVoices();
  const usVoice = voices.find(
    (v) => v.lang === "en-US" && v.localService
  ) || voices.find((v) => v.lang.startsWith("en"));
  if (usVoice) utterance.voice = usVoice;

  window.speechSynthesis.speak(utterance);
}

/**
 * Ensure voices are loaded (browser may not have loaded them yet).
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
  });
}
