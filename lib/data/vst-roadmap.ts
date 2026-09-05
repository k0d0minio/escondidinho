/**
 * Internal roadmap: turning the "Paleta Musical" browser playground into a
 * DAW plugin (VST3 / AU / CLAP). English only, not translated, not indexed —
 * this is an engineering document for the team, not client-facing copy.
 * Rendered at /lab/vst-roadmap (any locale prefix works).
 */

export type Inventory = {
  tab: string;
  what: string;
  /** Where the code ends up in the plugin. */
  fate: "Stays in JS" | "Moves to C++" | "Both" | "New";
  note: string;
};

export type Phase = {
  id: string;
  title: string;
  effort: string;
  goal: string;
  work: string[];
  doneWhen: string;
  human: string;
};

export type Alternative = {
  name: string;
  pitch: string;
  verdict: string;
  pick: "Recommended" | "Spike first" | "Only if" | "No";
};

export type Split = { area: string; claude: string; you: string };

export type Risk = { risk: string; mitigation: string };

export const summary = {
  answer:
    "Keep the HTML as the plugin's interface. Wrap it in a JUCE 8 WebView plugin, move only timing and sound into C++, and ship it as a MIDI-generating instrument that any synth or drum rack in the DAW can play.",
  shape: [
    "The plugin is a MIDI instrument with a built-in preview synth. It emits notes on its MIDI output and plays them itself when nothing is routed.",
    "The UI is the existing page, byte-for-byte where possible, loaded from the plugin binary into a native WebView (WKWebView on macOS, WebView2 on Windows, WebKitGTK on Linux).",
    "A small C++ core owns the clock, follows host tempo and transport, plays note-event patterns sample-accurately, and forwards note-on/off from the palette.",
    "The seam already exists in the concept: the MIDI export path turns any rhythm plus chord line into a flat list of note events. That list becomes the contract between JavaScript and C++.",
    "One JavaScript codebase serves two shells: the phone-friendly web page and the plugin window.",
  ],
} as const;

export const inventory: Inventory[] = [
  {
    tab: "Paleta",
    what: "12-note grid, scale and chord modes, brightness slider, scale finder, chord detection from selected notes.",
    fate: "Stays in JS",
    note: "Only the three sound calls (playNote, playChord, playStrum) change: they post note events to native when the bridge is present.",
  },
  {
    tab: "Progressões",
    what: "Around 100 progressions by style, roman-numeral resolution, 12 rhythm engines, timeline builder, substitutions, next-chord suggestions, inversions, MIDI download.",
    fate: "Both",
    note: "Theory and the builder stay in JS. Rhythm engines are re-expressed as event generators (the MIDI export code already does this) and the loop player moves to C++.",
  },
  {
    tab: "Infinito",
    what: "Endless weighted chord stream per style with tension control and BPM.",
    fate: "Both",
    note: "Generation stays in JS one bar ahead; playback goes through the same C++ loop player. BPM comes from the host when it is playing.",
  },
  {
    tab: "Acordes",
    what: "Chord finder from a set of notes.",
    fate: "Stays in JS",
    note: "Pure functions, no audio. Untouched.",
  },
  {
    tab: "Harmonia",
    what: "Circle-of-fifths wheel with dominant and relative arrows.",
    fate: "Stays in JS",
    note: "Untouched apart from the sound calls.",
  },
  {
    tab: "Analisar",
    what: "Audio file to chroma via OfflineAudioContext FFT, key detection (Krumhansl and Temperley profiles), chord detection, onset detection, piano-roll capture, microphone capture, MIDI export.",
    fate: "Stays in JS",
    note: "OfflineAudioContext works inside the WebView, so file analysis needs only a native file picker hook. Microphone capture is replaced later by the plugin's audio input.",
  },
  {
    tab: "Beat lane",
    what: "Kick, snare and hat patterns per style on General MIDI notes 36, 38 and 42.",
    fate: "New",
    note: "The concept has chord rhythms but no drum grid. This is the one genuinely new feature and it is what makes the plugin a beat tool as well as a harmony tool.",
  },
];

export const phases: Phase[] = [
  {
    id: "0",
    title: "Carve the seam",
    effort: "1 to 2 days",
    goal: "Separate what the plugin needs from what the browser needs, without changing behaviour.",
    work: [
      "Split the single file into modules: theory (scales, chords, progressions, resolveRoman, suggestions), patterns (each rhythm as a pure function returning note events), ui (DOM), audio-web (oscillators), audio-native (bridge stub).",
      "Define the Pattern contract: { ppqPerBar, loopBars, events: [{ ppq, note, velocity, durationPpq }] }. The existing MIDI writer becomes a consumer of it.",
      "Add unit tests for theory and patterns under Node. They run in CI with no browser.",
      "Rebuild the single-file page from the modules so the phone version keeps working.",
    ],
    doneWhen:
      "The web page behaves exactly as before and every rhythm engine has a test that checks its event list for one bar.",
    human:
      "Nothing. This is pure JavaScript refactoring Claude Code can complete and verify alone.",
  },
  {
    id: "1",
    title: "Plugin shell with the page inside",
    effort: "1 day",
    goal: "A VST3, AU and Standalone build whose window shows the existing UI.",
    work: [
      "New repository with CMake and JUCE 8 fetched at configure time. juce_add_plugin with IS_SYNTH, NEEDS_MIDI_INPUT, NEEDS_MIDI_OUTPUT and NEEDS_WEB_BROWSER set.",
      "Editor is a juce::WebBrowserComponent with native integration on, serving the bundled HTML, CSS and JS through a resource provider from BinaryData.",
      "Processor is a pass-through that reports host tempo and position each block.",
      "GitHub Actions matrix: macOS universal, Windows, Linux. Artifacts uploaded per build.",
    ],
    doneWhen:
      "The Standalone app opens, shows all six tabs, and the audio-unlock overlay is skipped in native mode.",
    human:
      "Open the Standalone and confirm the page renders. Windows needs the WebView2 Evergreen runtime, which Windows 11 already ships.",
  },
  {
    id: "2",
    title: "Sound through the DAW",
    effort: "2 to 3 days",
    goal: "Tapping the palette is heard through the host, not through the system speaker.",
    work: [
      "Bridge: JS posts { type: noteOn | noteOff, note, velocity } via the JUCE frontend helper; C++ receives on the message thread and pushes into a lock-free FIFO drained in processBlock.",
      "Every event goes to the MIDI output buffer and to a built-in juce::Synthesiser with one simple oscillator voice and an ADSR, so the plugin makes sound before anything is routed.",
      "Kill Web Audio in native mode. Sound must never leak around the host.",
      "Visual feedback (flashNote, chord bar) stays in JS and fires immediately on tap, before the audio round trip.",
    ],
    doneWhen:
      "In Ableton, Logic and Reaper a palette tap plays the internal synth and, when routed, an external synth on another track, with latency at or below the audio buffer size.",
    human:
      "Listen and judge feel. Set up the MIDI routing per DAW once and write it down.",
  },
  {
    id: "3",
    title: "Host-locked sequencing",
    effort: "3 to 5 days",
    goal: "Progressions and Infinito lock to the DAW grid and keep working when the transport is stopped.",
    work: [
      "C++ loop player: holds the current Pattern, converts ppq to samples using AudioPlayHead position and tempo, emits note-on/off in the right sample of each block, runs a free clock when the host is stopped.",
      "JS sends a fresh Pattern whenever the timeline, rhythm, swing, inversion or octave changes. Swaps happen at the bar boundary so edits mid-play never glitch.",
      "C++ emits a step event back to JS each beat; JS uses it to light the playing chord and note pills as today.",
      "Infinito keeps its generator in JS and feeds the next bar into the queue one bar ahead.",
      "Plugin state save and restore is the serialised JS state object. Presets are the same JSON.",
    ],
    doneWhen:
      "Recording the plugin's MIDI output onto a track in the DAW gives a clip that sits exactly on the grid and matches the downloaded MIDI file from the web version.",
    human: "Grid check by ear and by eye in the DAW's piano roll.",
  },
  {
    id: "4",
    title: "Getting ideas out",
    effort: "3 to 5 days",
    goal: "The brainstorming payoff: melodies and beats leave the plugin as clips.",
    work: [
      "Drag to DAW: the existing MIDI writer produces the bytes in JS, native writes a temp file and starts an external file drag, so the clip lands on any track.",
      "Melody capture: a rolling buffer of palette taps with timestamps, quantised to the grid, exported the same way.",
      "Beat lane: a per-style drum pattern (kick, snare, hat) rendered as a second Pattern on a fixed channel, with the same drag-out path.",
      "Chord lane and beat lane can be dragged out separately or as one file with two tracks.",
    ],
    doneWhen:
      "Dragging from the plugin window onto a track creates a MIDI clip in Ableton, Logic and Reaper.",
    human:
      "Verify drag-drop in each DAW, since drop handling differs between hosts.",
  },
  {
    id: "5",
    title: "Analysis inside the plugin",
    effort: "2 to 4 days",
    goal: "Analisar works on files and on what is playing in the session.",
    work: [
      "Native file picker hooked to the existing file input. The analysis pipeline itself is untouched.",
      "Replace microphone capture with the plugin's audio input bus: C++ downsamples a few seconds of input and posts a Float32 chunk to JS.",
      "Detected chords feed the timeline with one click, closing the loop between analysing a reference and building on it.",
    ],
    doneWhen:
      "Dropping a song file onto the plugin shows the same key and chord results as the web version.",
    human:
      "Optional phase. Skip it if the first four already deliver the workflow.",
  },
  {
    id: "6",
    title: "Ship",
    effort: "2 to 3 days plus waiting on certificates",
    goal: "Installable builds other people can trust.",
    work: [
      "pluginval at strictness 5 in CI for every format.",
      "CLAP via clap-juce-extensions. AAX is out of scope; it needs Pro Tools SDK and PACE signing.",
      "macOS code signing and notarisation, Windows Authenticode, pkg and Inno Setup installers.",
      "Licence choice: JUCE free tier or GPLv3. VST3 SDK under GPLv3 or Steinberg's agreement.",
    ],
    doneWhen:
      "A tagged release publishes signed installers and pluginval passes on all three platforms.",
    human:
      "Apple Developer and Windows signing accounts, the secrets in CI, and the licence decision.",
  },
];

export const alternatives: Alternative[] = [
  {
    name: "Web MIDI spike",
    pitch:
      "Add Web MIDI output to the existing page. Create a virtual MIDI port (IAC on macOS, loopMIDI on Windows) and the DAW receives the notes today. No plugin code at all.",
    verdict:
      "Half a day. Proves whether the workflow is worth the plugin before writing any C++. Timing is loose and there is no host sync or drag-out, so it does not replace the plugin.",
    pick: "Spike first",
  },
  {
    name: "JUCE 8 WebView plugin",
    pitch:
      "C++ audio core, native WebView UI, official JS bridge, exports VST3, AU, Standalone and CLAP from one CMake project.",
    verdict:
      "Keeps the interface as it is, smallest C++ surface, the most documented path and the one Claude Code knows best.",
    pick: "Recommended",
  },
  {
    name: "Max for Live device",
    pitch:
      "The jweb object hosts the HTML inside a Live device. MIDI out and transport sync come from Max objects.",
    verdict:
      "Fastest full prototype if the only DAW is Ableton Live Suite. Locked to Ableton, so not the end state.",
    pick: "Only if",
  },
  {
    name: "iPlug2 or Cmajor with web UI",
    pitch: "Both frameworks also drive an HTML interface from a plugin.",
    verdict:
      "Viable but smaller communities and fewer worked examples. No advantage over JUCE for this project.",
    pick: "No",
  },
  {
    name: "Rewrite the UI in native JUCE components",
    pitch: "Classic plugin approach, no WebView.",
    verdict:
      "Loses the exact feel of the playground and multiplies the work by roughly five. Avoid.",
    pick: "No",
  },
];

export const split: Split[] = [
  {
    area: "JavaScript refactor, tests, bridge code",
    claude: "All of it, verified by Node tests in CI.",
    you: "Nothing.",
  },
  {
    area: "C++ core, CMake, JUCE setup, CI matrix",
    claude:
      "All of it. Builds compile in GitHub Actions on all three platforms.",
    you: "Nothing, beyond enabling Actions on the repo.",
  },
  {
    area: "Running the plugin in a DAW",
    claude:
      "Cannot. The cloud sandbox has no DAW and no audio device. A local Claude Code session on a Mac can build and launch the Standalone and run pluginval.",
    you: "Load it, play it, judge the feel, report what is off.",
  },
  {
    area: "Listening",
    claude:
      "Cannot judge groove, latency feel or whether a voicing sounds right.",
    you: "The ears. Every phase ends with your listening pass.",
  },
  {
    area: "Signing and notarisation",
    claude: "Writes the pipeline.",
    you: "Owns the developer accounts and puts the secrets in CI.",
  },
  {
    area: "Licences",
    claude: "Explains the options.",
    you: "Chooses JUCE tier and VST3 SDK terms.",
  },
];

export const risks: Risk[] = [
  {
    risk: "Web Audio keeps playing in the plugin and bypasses the host.",
    mitigation:
      "Native mode replaces the audio module at load. A console assertion fires if an AudioContext is created while the bridge exists.",
  },
  {
    risk: "Timing drift from JavaScript timers.",
    mitigation:
      "No scheduling in JS once phase 3 lands. JS only edits patterns; the audio thread owns time.",
  },
  {
    risk: "Thread safety between the WebView message thread and the audio thread.",
    mitigation:
      "One lock-free FIFO for note events, one atomic pointer swap for the Pattern, nothing else shared.",
  },
  {
    risk: "MIDI output routing differs per DAW.",
    mitigation:
      "Logic needs the AU MIDI-effect type, Ableton routes from the plugin track, Reaper needs the MIDI output enabled in the FX chain. Document each once in phase 2.",
  },
  {
    risk: "WebView availability on Windows.",
    mitigation:
      "Ship with WebView2 static linking and point the installer at the Evergreen runtime installer.",
  },
  {
    risk: "The concept is mobile-first; the plugin is desktop.",
    mitigation:
      "Keep the web shell alive from the same modules. The phone version stays the sketchpad, the plugin is the studio.",
  },
];

export const kickoff = {
  layout: [
    "paleta/            shared JavaScript: theory/, patterns/, ui/, audio-web.js, audio-native.js, tests/",
    "web/               builds the single-file page from paleta/ for the phone",
    "plugin/            CMakeLists.txt, Source/PluginProcessor.*, Source/PluginEditor.*, Source/LoopPlayer.*, Source/PreviewSynth.*",
    ".github/workflows/ node tests, CMake matrix build, pluginval, release",
  ],
  prompts: [
    "Split the single HTML file into ES modules under paleta/ without changing behaviour. Extract every rhythm engine into a pure function that returns note events for one bar in ppq. Add Node tests that snapshot each engine's events for C major, 90 bpm.",
    "Scaffold a JUCE 8 CMake plugin named Paleta with VST3, AU and Standalone formats, MIDI in and out, IS_SYNTH on, WebView editor serving the files in paleta/ from BinaryData. Add a GitHub Actions matrix that builds all three platforms and uploads artifacts.",
    "Implement the note bridge: audio-native.js posts noteOn and noteOff to a native function; the processor drains a lock-free FIFO in processBlock, writes to the MIDI output and to a juce::Synthesiser preview voice.",
    "Implement LoopPlayer: accept a Pattern as JSON from JS, swap it at the next bar boundary, follow AudioPlayHead position and tempo, free-run when stopped, emit a step event to JS each beat.",
  ],
} as const;
