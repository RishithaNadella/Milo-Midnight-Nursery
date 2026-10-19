let ctx: AudioContext | null = null;
function ac() {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", vol = 0.15) {
  const c = ac();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, c.currentTime + start);
  g.gain.linearRampToValueAtTime(vol, c.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + start + dur);
  o.connect(g).connect(c.destination);
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.05);
}

export function playClack() {
  [0, 0.08, 0.16].forEach((t, i) => tone(300 + i * 80, t, 0.06, "square", 0.05));
  [1568, 2093, 2637].forEach((f, i) => tone(f, 0.25 + i * 0.09, 0.6, "sine", 0.08));
}

export function playLullaby() {
  // Twinkle-ish music box melody
  const notes = [523, 523, 784, 784, 880, 880, 784, 698, 698, 659, 659, 587, 587, 523];
  const lens = [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2];
  let t = 0;
  notes.forEach((f, i) => {
    tone(f * 2, t, 1.2, "sine", 0.1);
    tone(f * 4, t, 0.5, "triangle", 0.02);
    t += lens[i] * 0.32;
  });
}

export function playTest(kind: "chime" | "clack" | "hum") {
  if (kind === "clack") return playClack();
  if (kind === "hum") return [220, 277, 330].forEach((f) => tone(f, 0, 2, "sine", 0.05));
  [1047, 1319, 1568, 2093].forEach((f, i) => tone(f, i * 0.12, 0.8, "sine", 0.08));
}
