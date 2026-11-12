import { FormEvent, useRef, useState } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HlsVideo } from "@/components/HlsVideo";
import { LogoMark } from "@/components/LogoMark";
import { Navbar } from "@/components/Navbar";
import { features, platforms } from "@/mock/content";

const HERO_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";
const MISSION_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";
const SOLUTION_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

const missionOne = "We're building a space where curiosity meets clarity — where readers find depth, writers find reach, and every newsletter becomes a conversation worth having.".split(" ");
const missionTwo = "A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved.".split(" ");

function RevealWord({ word, index, total, progress, highlighted = false }: { word: string; index: number; total: number; progress: MotionValue<number>; highlighted?: boolean }) {
  const start = index / total;
  const opacity = useTransform(progress, [start * 0.88, Math.min(start * 0.88 + 0.12, 1)], [0.15, 1]);
  return <motion.span style={{ opacity }} className={highlighted ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]"}>{word}{" "}</motion.span>;
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Enter a valid email address to continue.");
      return;
    }
    setMessage("You're on the list. Welcome to Mindloop.");
    setEmail("");
  }

  return (
    <div className="w-full max-w-xl">
      <form onSubmit={submit} noValidate className="liquid-glass flex w-full flex-col gap-2 rounded-3xl p-2 sm:flex-row sm:rounded-full" aria-describedby="email-message">
        <label htmlFor="hero-email" className="sr-only">Email address</label>
        <input id="hero-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email address" className="min-h-12 min-w-0 flex-1 bg-transparent px-5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground sm:rounded-full" />
        <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="min-h-12 rounded-full bg-foreground px-8 text-xs font-bold tracking-[0.12em] text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background">
          SUBSCRIBE
        </motion.button>
      </form>
      <p id="email-message" aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-muted-foreground">{message}</p>
    </div>
  );
}

export function HomePage() {
  const missionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: missionRef, offset: ["start end", "end start"] });
  const allWords = [...missionOne, ...missionTwo];
  const highlights = new Set(["curiosity", "meets", "clarity"]);

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <a href="#main" className="sr-only z-[100] rounded bg-foreground px-4 py-3 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <Navbar />
      <main id="main">
        <section id="home" className="relative grid min-h-dvh place-items-center overflow-hidden px-5 pt-28 md:px-12 md:pt-32">
          <video className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale" src={HERO_VIDEO} autoPlay={!prefersReducedMotion} loop muted playsInline aria-hidden="true" />
          <div className="hero-vignette absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
            <motion.div {...fadeUp(0)} className="mb-8 flex items-center gap-3">
              <div className="flex -space-x-2" aria-hidden="true">
                {[1, 2, 3].map((avatar) => <img key={avatar} src={`/avatar-${avatar}.png`} alt="" className="h-8 w-8 rounded-full border-2 border-background object-cover" />)}
              </div>
              <span className="text-sm text-muted-foreground">7,000+ people already subscribed</span>
            </motion.div>
            <motion.h1 {...fadeUp(0.08)} className="max-w-6xl text-balance text-5xl font-medium leading-[0.92] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-8xl">
              Get <span className="font-serif font-normal italic">Inspired</span> with Us
            </motion.h1>
            <motion.p {...fadeUp(0.16)} className="mb-8 mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[hsl(var(--hero-subtitle))] md:text-lg">
              Join our feed for meaningful updates, news around technology and a shared journey toward depth and direction.
            </motion.p>
            <motion.div {...fadeUp(0.24)} className="flex w-full justify-center"><NewsletterForm /></motion.div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-7xl px-5 pb-9 pt-52 text-center md:px-12 md:pt-64">
          <motion.h2 {...fadeUp(0)} className="mx-auto max-w-5xl text-balance text-5xl font-medium leading-[0.94] tracking-[-0.04em] md:text-7xl lg:text-8xl">
            Search has <span className="font-serif font-normal italic">changed.</span> Have you?
          </motion.h2>
          <motion.p {...fadeUp(0.08)} className="mx-auto mb-24 mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Discovery is becoming a conversation. Mindloop helps thoughtful work remain clear, useful, and visible as the way people search evolves.
          </motion.p>
          <div className="mb-20 grid gap-12 md:grid-cols-3 md:gap-8">
            {platforms.map((platform, index) => (
              <motion.article key={platform.name} {...fadeUp(index * 0.08)} className="flex flex-col items-center">
                <div className="grid h-[200px] w-[200px] place-items-center"><img src={platform.icon} alt="" className="h-full w-full object-contain" /></div>
                <h3 className="mt-5 text-base font-semibold">{platform.name}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{platform.description}</p>
              </motion.article>
            ))}
          </div>
          <motion.p {...fadeUp(0)} className="text-sm text-muted-foreground">If you don't answer the questions, someone else will.</motion.p>
        </section>

        <section ref={missionRef} id="philosophy" className="mx-auto max-w-7xl px-5 pb-32 pt-0 md:px-12 md:pb-44">
          <motion.div {...fadeUp(0)} className="mx-auto aspect-square w-full max-w-[800px] overflow-hidden rounded-full">
            <video className="h-full w-full object-cover grayscale" src={MISSION_VIDEO} autoPlay={!prefersReducedMotion} loop muted playsInline aria-hidden="true" />
          </motion.div>
          <div className="mx-auto mt-20 max-w-5xl">
            <p className="text-pretty text-2xl font-medium leading-[1.14] tracking-[-0.035em] md:text-4xl lg:text-5xl">
              {missionOne.map((word, index) => <RevealWord key={`one-${index}`} word={word} index={index} total={allWords.length} progress={scrollYProgress} highlighted={highlights.has(word.replace(/[.,—]/g, ""))} />)}
            </p>
            <p className="mt-10 text-pretty text-xl font-medium leading-[1.25] tracking-[-0.02em] md:text-2xl lg:text-3xl">
              {missionTwo.map((word, index) => <RevealWord key={`two-${index}`} word={word} index={missionOne.length + index} total={allWords.length} progress={scrollYProgress} />)}
            </p>
          </div>
        </section>

        <section id="use-cases" className="border-t border-border/30 py-32 md:py-44">
          <div className="mx-auto max-w-7xl px-5 md:px-12">
            <motion.p {...fadeUp(0)} className="text-xs font-semibold tracking-[0.3em] text-muted-foreground">SOLUTION</motion.p>
            <motion.h2 {...fadeUp(0.08)} className="mt-5 max-w-4xl text-balance text-4xl font-medium leading-[0.98] tracking-[-0.04em] md:text-6xl">
              The platform for <span className="font-serif font-normal italic">meaningful</span> content
            </motion.h2>
            <motion.div {...fadeUp(0.12)} className="mt-16 aspect-[3/1] min-h-56 overflow-hidden rounded-2xl">
              <video className="h-full w-full object-cover grayscale" src={SOLUTION_VIDEO} autoPlay={!prefersReducedMotion} loop muted playsInline aria-hidden="true" />
            </motion.div>
            <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-border/40 pt-10 sm:grid-cols-2 md:grid-cols-4">
              {features.map((feature, index) => (
                <motion.article key={feature.title} {...fadeUp(index * 0.06)}>
                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-t border-border/30 py-32 md:py-44">
          <HlsVideo />
          <div className="absolute inset-0 z-[1] bg-background/45" />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-5 text-center md:px-12">
            <motion.div {...fadeUp(0)}><LogoMark large /></motion.div>
            <motion.h2 {...fadeUp(0.08)} className="mt-8 font-serif text-5xl font-normal italic leading-none tracking-[-0.03em] md:text-7xl">Start Your Journey</motion.h2>
            <motion.p {...fadeUp(0.14)} className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-foreground/75">Read with intention, publish with clarity, and build conversations worth returning to.</motion.p>
            <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild><a href="#home">Subscribe Now</a></Button>
              <Button variant="glass" asChild><a href="mailto:[REDACTED_EMAIL]">Start Writing <ArrowRight aria-hidden="true" className="ml-2" size={16} /></a></Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-6 px-5 py-12 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-12 xl:px-28">
        <p>© 2026 Mindloop. All rights reserved.</p>
        <nav aria-label="Legal" className="flex flex-wrap gap-6">
          {['Privacy', 'Terms', 'Contact'].map((label) => <a key={label} href={label === 'Contact' ? 'mailto:[REDACTED_EMAIL]' : `#${label.toLowerCase()}`} className="rounded py-2 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">{label}</a>)}
        </nav>
      </footer>
    </div>
  );
}
