# YouTube Digest

A Chrome side panel that turns a YouTube video into a learning resource: a timestamped transcript, bilingual translation, AI overview, and notes.

## Language

**Transcript**:
The timestamped text of what is said in a video, shown in the side panel and used as input for every AI feature.
_Avoid_: Subtitles text, script, 逐字稿 (in English docs)

**Caption Track**:
One language version of a video's captions offered by YouTube, either native or auto-generated.
_Avoid_: Subtitle file, subtitle stream

**Native Caption**:
A Caption Track uploaded or approved by the video's creator.
_Avoid_: Manual caption, human caption, original subtitle

**Auto-generated Caption**:
A Caption Track produced by YouTube's speech recognition, labelled "自动生成" in the side panel.
_Avoid_: ASR caption, machine caption

**Caption Selection**:
The rule that picks one Caption Track per video: any Native Caption outranks every Auto-generated Caption, and within each group Chinese outranks English, which outranks other languages.
_Avoid_: Track priority, language fallback

**No-Caption Video**:
A video with no Caption Track at all. It has no Transcript and the side panel says so instead of offering a substitute.
_Avoid_: Uncaptioned video, empty transcript

**Display Mode**:
The shared Original, Chinese, or bilingual setting that controls how Transcript, Overview, and Notes are shown.
_Avoid_: Language mode, translation mode
