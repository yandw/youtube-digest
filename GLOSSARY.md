# YouTube Digest

A Chrome side panel that turns a YouTube video into a learning resource: a timestamped transcript, bilingual translation, AI overview, and notes.

## Language

**Transcript**:
The timestamped text of what is said in a video, shown in the side panel and used as input for every AI feature. Sourced from a Caption Track.
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

**Auto-translated Caption**:
A Caption Track translated by YouTube from another Caption Track into a selected target language.
_Avoid_: Auto-generated Caption, machine caption

**Caption Selection**:
The rule that tries Caption Tracks in this order: Simplified Chinese, Traditional Chinese, Auto-translated Chinese, English, then Auto-translated English. Direct Chinese includes YouTube's regional codes, such as `zh-CN` for Simplified Chinese and `zh-TW` for Traditional Chinese. Within a direct language group, any Native Caption outranks every Auto-generated Caption.
_Avoid_: Track priority, language fallback

**No-Caption Video**:
A video with no Caption Track at all.
_Avoid_: Uncaptioned video, empty transcript

**AI Provider**:
The external chat-completion service used for Overview, Translation, Explain, and note cleanup. Configured with its own base URL, API key, and model.
_Avoid_: LLM provider, model provider

**Display Mode**:
The shared Original, Chinese, or bilingual setting that controls how Transcript, Overview, and Notes are shown.
_Avoid_: Language mode, translation mode
