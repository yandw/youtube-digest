/**
 * Caption Track selection and timedtext parsing.
 *
 * Pure logic with no browser dependencies, so it can be tested in Node and
 * loaded by the service worker with importScripts.
 */
var YTD_CAPTIONS = (() => {
  function languageRank(languageCode) {
    const code = String(languageCode || "").toLowerCase();
    if (code === "zh" || code.startsWith("zh-")) return 0;
    if (code === "en" || code.startsWith("en-")) return 1;
    return 2;
  }

  function selectCaptionTrack(tracks) {
    if (!Array.isArray(tracks) || tracks.length === 0) return null;
    const native = tracks.filter((t) => t.kind !== "asr");
    const auto = tracks.filter((t) => t.kind === "asr");
    const sorted = [
      ...native.sort(
        (a, b) => languageRank(a.languageCode) - languageRank(b.languageCode),
      ),
      ...auto.sort(
        (a, b) => languageRank(a.languageCode) - languageRank(b.languageCode),
      ),
    ];
    return sorted[0] || null;
  }

  function parseTimedtextJson3(json3, languageCode) {
    const events = json3?.events || [];
    const transcript = [];
    let transcriptTextPlain = "";
    let transcriptTextTimestamped = "";

    for (const event of events) {
      const segments = event.segs || [];
      // ">>" is the speaker-change marker in YouTube auto-captions.
      const text = segments
        .map((s) => s.utf8 || "")
        .join("")
        .replace(/>> ?/g, "")
        .trim();
      if (!text) continue;

      const startSeconds = Math.floor((event.tStartMs || 0) / 1000);
      const minutes = Math.floor(startSeconds / 60);
      const seconds = startSeconds % 60;
      const timestamp = `${minutes}:${String(seconds).padStart(2, "0")}`;

      transcript.push({
        text,
        start: startSeconds,
        duration: Math.floor((event.dDurationMs || 0) / 1000),
        language: languageCode,
      });

      transcriptTextPlain += text + " ";
      transcriptTextTimestamped += `[${timestamp}] ${text}\n`;
    }

    return {
      transcript,
      transcriptTextPlain: transcriptTextPlain.trim(),
      transcriptTextTimestamped: transcriptTextTimestamped.trim(),
    };
  }

  return { selectCaptionTrack, parseTimedtextJson3 };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = YTD_CAPTIONS;
}
