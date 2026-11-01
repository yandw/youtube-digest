# YouTube Digest

A Chrome side panel that turns a YouTube video into a learning resource: a timestamped transcript, bilingual translation, AI overview, and notes.

## Language

**Transcript**:
The timestamped text of what is said in a video, shown in the side panel and used as input for every AI feature. Sourced from either a Caption Track or, for a No-Caption Video, Speech Transcription.
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
A video with no Caption Track at all. Its Transcript, if any, comes from Speech Transcription instead.
_Avoid_: Uncaptioned video, empty transcript

**Speech Transcription**:
The process of generating a Transcript for a No-Caption Video by recording its playing audio and sending it to a Speech Transcription Provider. It runs only while the side panel is open and progresses alongside playback, so the Transcript fills in gradually rather than appearing all at once.
_Avoid_: Audio transcription, voice-to-text, STT

**Speech Transcription Provider**:
The external service that turns recorded audio into text for Speech Transcription. Configured with its own base URL, API key, and model, independent of the AI Provider used for Overview, Translation, and Notes.
_Avoid_: STT provider, Whisper, Groq (the default provider, not the concept)

**AI Provider**:
The external chat-completion service used for Overview, Translation, Explain, and note cleanup. Configured with its own base URL, API key, and model, independent of the Speech Transcription Provider.
_Avoid_: LLM provider, model provider

**Display Mode**:
The shared Original, Chinese, or bilingual setting that controls how Transcript, Overview, and Notes are shown.
_Avoid_: Language mode, translation mode
