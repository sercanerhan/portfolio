import { Bot, Code2, ImageIcon, Rocket, Route, Sparkles } from 'lucide-react'
import { person } from '../data/profile'
import stats from '../data/buildStats.json'
import { GithubIcon } from './BrandIcons'
import { Reveal, SectionHeader } from './Reveal'

const timeline = [
  { Icon: Sparkles, title: 'Brief', text: 'A CV PDF and a short brief: a portfolio that shows the whole career — and, quietly, proves I can build with AI.' },
  { Icon: Route, title: 'Plan with Claude Code', text: 'Claude read the CV, asked four product questions (name, design, stack, privacy), and wrote a plan I approved and corrected.' },
  { Icon: Code2, title: 'Vibe-code the product', text: 'React + Motion components, a hand-rolled route optimizer, a dotted world map precomputed at build time, a ⌘K palette.' },
  { Icon: ImageIcon, title: 'Generate the art with Codex', text: 'Case-study covers created through the Codex CLI’s image model on my existing subscription — no API keys.' },
  { Icon: Rocket, title: 'Ship', text: 'A GitHub Actions workflow builds and deploys to GitHub Pages on every push.' },
]

const prompts = [
  'I’d be happy with something cool, such as motion design…',
  'Do not say “open to opportunities”. This is the showcase of my whole experience.',
  'It would be great to show some interactive images & showcases of the products I worked on.',
]

export function BuiltWith() {
  const facts = [
    { v: stats.components, l: 'React components' },
    { v: stats.linesOfCode.toLocaleString('en'), l: 'lines of TypeScript' },
    { v: stats.demos, l: 'playable demos' },
    { v: stats.images, l: 'AI-generated images' },
  ]
  return (
    <section id="built" className="relative py-24 sm:py-32">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(99_102_241/0.08),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="How this site was built" title={<>This portfolio is <span className="text-gradient">a product too.</span></>} intro="I lead AI product teams — so I built this the way I expect my teams to work: a clear brief, an AI pair that plans before it codes, and a human who makes the calls." />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="relative space-y-6 border-l border-line pl-8">
            {timeline.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="relative">
                  <span className="absolute top-0 -left-[49px] grid h-8 w-8 place-items-center rounded-full border border-line-strong bg-surface"><Icon size={14} className="text-accent-2" /></span>
                  <p className="font-display text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-pretty text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="space-y-4">
            <Reveal className="card p-5">
              <p className="eyebrow flex items-center gap-2"><Bot size={13} /> Real prompts from the session (lightly edited)</p>
              <div className="mt-4 space-y-3">
                {prompts.map((p) => (
                  <p key={p} className="rounded-xl rounded-tl-sm border border-line bg-white/[0.03] px-4 py-3 text-sm text-fg/90">{p}</p>
                ))}
              </div>
            </Reveal>
            <Reveal className="grid grid-cols-2 gap-3" delay={0.1}>
              {facts.map((f) => (
                <div key={f.l} className="card p-4">
                  <p className="font-display text-2xl font-semibold">{f.v}</p>
                  <p className="mt-1 font-mono text-[11px] text-subtle">{f.l}</p>
                </div>
              ))}
            </Reveal>
            <Reveal className="flex flex-wrap items-center gap-2 text-xs text-muted" delay={0.15}>
              {['Claude Code', 'Codex CLI', 'React 19', 'Motion', 'Tailwind CSS 4', 'Vite', 'GitHub Pages'].map((t) => (
                <span key={t} className="rounded-md border border-line px-2 py-1 font-mono">{t}</span>
              ))}
              <a href={stats.repo || person.github} target="_blank" rel="noopener" className="ml-auto inline-flex items-center gap-2 rounded-lg border border-line-strong px-3 py-1.5 text-fg hover:bg-white/[0.06]"><GithubIcon size={14} /> View source</a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
