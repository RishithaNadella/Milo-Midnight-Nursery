import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import milo from "@/assets/milo.png.asset.json";
import { playClack, playLullaby, playTest } from "@/lib/sounds";
import { Button } from "@/components/ui/button";
import { Cloud, LampDesk, MoonStar, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Milo's Portfolio — Midnight Nursery" },
      { name: "description", content: "Milo, Starlight Quality Inspector: making every twinkle cozy, bright, and never too scary for bedtime." },
      { property: "og:title", content: "Milo's Portfolio — Midnight Nursery" },
      { property: "og:description", content: "Making sure every twinkle is cozy, bright, and never too scary for bedtime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Wish = { id: number; name: string; wish: string; stamp: string };
const STAMPS = ["🌟", "☁️", "🌙", "🧸"];
const SEED: Wish[] = [
  { id: 1, name: "Luna", wish: "Dreams of flying on a marshmallow comet.", stamp: "🌙" },
  { id: 2, name: "Teddy", wish: "A night with zero scary shadows, please!", stamp: "🧸" },
  { id: 3, name: "Pip", wish: "Softer clouds for everyone tonight.", stamp: "☁️" },
];

const INSPECTIONS = [
  { icon: LampDesk, title: "The Midnight Glow Calibration", desc: "Fine-tuning ambient bedroom warmth for optimal sleep conditions.", tag: "LIGHTING" },
  { icon: Cloud, title: "Cloud-Bed Softness Audit", desc: "Testing and certifying fluffy cloud mattresses for maximum coziness.", tag: "COMFORT" },
  { icon: ShieldCheck, title: "Nightmare Prevention and Polish", desc: "Removing scary shadows from beneath beds and polishing bedtime thoughts.", tag: "SAFETY" },
  { icon: MoonStar, title: "Moonbeam Alignment", desc: "Guiding gentle moonlight rays straight through children's bedroom windows.", tag: "OPTICS" },
];

const CHARACTER = [
  { label: "Name", text: 'Milo. The “Skull Baby” nickname is for being adorable, not scary.', icon: "🦴" },
  { label: "What they are", text: "A miniature, impossibly cute baby skeleton with smooth bone-like skin, huge soft eyes, and a cozy sleepy blue nightcap.", icon: "🧸" },
  { label: "What they do", text: "Starlight Quality Inspector at the Midnight Nursery. Ensures every twinkle is soothing and friendly.", icon: "🌟" },
  { label: "Their story", text: "Formed on a quiet midnight when a child's wish met drifting stardust. Now he polishes nightmares into pleasant dreams.", icon: "🌙" },
  { label: "Tagline", text: "“I build the dreams you fall asleep inside.”", icon: "☁️" },
];

function Sky() {
  const stars = useMemo(
    () => Array.from({ length: 70 }, (_, i) => ({ l: (i * 37) % 100, t: (i * 53) % 100, d: (i % 7) * 0.4, s: 1 + (i % 3) })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {stars.map((s, i) => (
        <span key={i} className="animate-twinkle absolute rounded-full bg-foreground" style={{ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
      ))}
      {[12, 48, 82].map((l, i) => (
        <span key={l} className="animate-drift absolute text-3xl opacity-20" style={{ left: `${l}%`, top: `${25 + i * 22}%`, animationDelay: `${i * 2}s` }}>👻</span>
      ))}
    </div>
  );
}

function Index() {
  const [wiggle, setWiggle] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; l: number; d: number }[]>([]);
  const [wishes, setWishes] = useState<Wish[]>(SEED);
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [stamp, setStamp] = useState<string>("🌟");
  const [ok, setOk] = useState(false);
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("milo-wishes");
    if (saved) setWishes(JSON.parse(saved));
    const v = Number(localStorage.getItem("milo-visits") || 1336) + 1;
    localStorage.setItem("milo-visits", String(v));
    setVisits(v);
  }, []);

  const poke = () => {
    playClack();
    setWiggle(false);
    requestAnimationFrame(() => setWiggle(true));
    const batch = Array.from({ length: 28 }, (_, i) => ({ id: Date.now() + i, l: Math.random() * 100, d: Math.random() * 0.6 }));
    setConfetti(batch);
    setTimeout(() => setConfetti([]), 3200);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;
    const next = [{ id: Date.now(), name: name.trim().slice(0, 40), wish: wish.trim().slice(0, 200), stamp }, ...wishes];
    setWishes(next);
    localStorage.setItem("milo-wishes", JSON.stringify(next));
    setName(""); setWish(""); setOk(true);
    setTimeout(() => setOk(false), 3500);
  };

  return (
    <div className="min-h-screen">
      <Sky />
      {confetti.map((c) => (
        <span key={c.id} className="animate-fall pointer-events-none fixed -top-8 z-50 text-2xl text-primary" style={{ left: `${c.l}%`, animationDelay: `${c.d}s` }}>★</span>
      ))}

      <nav aria-label="Main navigation" className="glass sticky top-3 z-40 mx-auto mt-3 flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-2">
          <img src={milo.url} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
          <span className="truncate font-display text-lg font-semibold">Milo's Portfolio</span>
        </a>
        <div className="w-full text-sm sm:w-auto">
          <div className="flex flex-wrap justify-between gap-3 text-muted-foreground sm:gap-5">
            {[["About", "#about"], ["Inspections", "#inspections"], ["Guestbook", "#guestbook"], ["Sound Check", "#sound"]].map(([l, h]) => (
              <a key={h} href={h} className="transition-colors hover:text-primary">{l}</a>
            ))}
          </div>

        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section id="top" className="grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="text-5xl font-bold leading-tight sm:text-6xl">Hi, I'm <span className="text-primary">Milo</span> 🦴✨</h1>
            <p className="mt-4 text-xl text-secondary">Starlight Quality Inspector at the Midnight Nursery</p>
            <blockquote className="glass glow-gold mt-8 border-primary/40 p-6 text-lg italic">
              <span className="mr-2 text-primary">★</span>
              "Making sure every twinkle is cozy, bright, and never too scary for bedtime."
            </blockquote>
          </div>
          <div className="relative">
            <div className="aura absolute inset-0 -z-10" />
            <Button variant="ghost" onClick={poke} onAnimationEnd={() => setWiggle(false)} aria-label="Poke Milo" className={`block h-auto w-full p-0 hover:bg-transparent ${wiggle ? "animate-wiggle" : "animate-drift"}`}>
              <img src={milo.url} alt="Milo, a baby skeleton in a blue nightcap sitting on a cloud" className="glow-gold w-full rounded-[2rem] border border-primary/30" />
            </Button>
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-sm text-primary">CHAPTER ONE</p>
            <h2 className="mt-2 text-center text-4xl font-bold">About Milo</h2>
            <dl className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {CHARACTER.map((point, i) => (
                <div key={point.label} className={`flex gap-4 border-b border-primary/20 py-6 ${i === 4 ? "sm:col-span-2" : ""}`}>
                  <span aria-hidden="true" className="mt-1 text-3xl">{point.icon}</span>
                  <div>
                    <dt className="font-display text-xl font-semibold text-primary">{point.label}</dt>
                    <dd className={`mt-2 leading-relaxed ${i === 4 ? "font-display text-2xl text-foreground" : "text-muted-foreground"}`}>{point.text}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="inspections" className="py-16">
          <h2 className="text-center text-4xl font-bold">Professional Inspections &amp; Projects</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {INSPECTIONS.map((p) => (
              <article key={p.title} className="glass group p-7 transition-transform hover:-translate-y-1">
                <div className="glow-gold grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary"><p.icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} /></div>
                <h3 className="mt-5 text-2xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.desc}</p>
                <span className="mt-5 inline-block rounded-full border border-secondary/50 px-3 py-1 text-xs tracking-widest text-secondary">{p.tag}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="guestbook" className="py-16">
          <h2 className="text-center text-4xl font-bold">The Midnight Nursery Guestbook</h2>
          <div className="mt-6 flex justify-center">
            <div className="glass glow-gold flex items-center gap-3 px-5 py-3">
              <span className="text-sm text-muted-foreground">Visitors</span>
              <div className="flex gap-1 font-mono">
                {String(visits).padStart(6, "0").split("").map((d, i) => (
                  <span key={i} className="rounded bg-background px-2 py-1 text-xl text-primary">{d}</span>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="glass mx-auto mt-8 grid max-w-2xl gap-4 p-6">
            <input aria-label="Your name" required value={name} onChange={(e) => setName(e.target.value)} maxLength={40} placeholder="Your name" className="rounded-xl border bg-background/60 px-4 py-3 outline-none focus:border-primary" />
            <textarea aria-label="Your cozy dream wish" required value={wish} onChange={(e) => setWish(e.target.value)} maxLength={200} rows={3} placeholder="Your cozy dream wish…" className="rounded-xl border bg-background/60 px-4 py-3 outline-none focus:border-primary" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                {STAMPS.map((s) => (
                  <Button variant="ghost" type="button" key={s} aria-pressed={stamp === s} onClick={() => setStamp(s)} aria-label={`Stamp ${s}`} className={`grid h-11 w-11 place-items-center rounded-xl border text-xl transition ${stamp === s ? "border-primary bg-primary/20" : "hover:border-primary/50"}`}>{s}</Button>
                ))}
              </div>
              <Button type="submit" className="glow-gold h-auto rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:scale-105">Tuck in my wish</Button>
            </div>
            {ok && <p role="status" className="text-center text-primary">Milo tucked your wish safely under a cloud! ☁️✨</p>}
          </form>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {wishes.map((w, i) => (
              <div key={w.id} className="rounded-2xl bg-note p-5 text-note-foreground shadow-lg" style={{ transform: `rotate(${((i % 3) - 1) * 1.5}deg)` }}>
                <div className="text-3xl">{w.stamp}</div>
                <p className="mt-2 break-words">{w.wish}</p>
                <p className="mt-3 text-sm font-bold">— {w.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="sound" className="py-16 text-center">
          <h2 className="text-4xl font-bold">Sound Check</h2>
          <p className="mt-2 text-muted-foreground">Milo tests every bedtime sound for maximum coziness.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {([["✨ Twinkle Chime", "chime"], ["🦴 Bone Clack", "clack"], ["🌙 Moon Hum", "hum"]] as const).map(([l, k]) => (
              <Button variant="ghost" key={k} onClick={() => playTest(k)} className="glass h-auto px-6 py-4 text-lg transition hover:border-primary hover:text-primary">{l}</Button>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t py-10 text-center">
        <Button variant="ghost" onClick={playLullaby} className="glass glow-gold h-auto whitespace-normal px-6 py-3 text-lg text-primary transition hover:scale-105">
          Sleeping soundly on a cloud ☁️✨
        </Button>
      </footer>
    </div>
  );
}
