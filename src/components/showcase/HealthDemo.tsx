import { AnimatePresence, motion } from 'motion/react'
import { CalendarCheck, FileText, Mic, PhoneOff, Stethoscope, Users, Video } from 'lucide-react'
import { useState } from 'react'
import { Browser, DemoNote, Phone } from './DeviceFrame'

const slots = ['09:30', '10:15', '11:00', '14:30', '15:45', '16:30']
const queue = [
  { t: '09:00', n: 'Patient A.', k: 'Check-up', s: 'done' },
  { t: '09:30', n: 'Patient B.', k: 'Video consult', s: 'live' },
  { t: '10:15', n: 'Patient C.', k: 'Follow-up', s: 'next' },
  { t: '11:00', n: 'Patient D.', k: 'Lab review', s: 'next' },
  { t: '14:30', n: 'Patient E.', k: 'Video consult', s: 'next' },
]

export function HealthDemo() {
  const [side, setSide] = useState<'b2c' | 'b2b'>('b2c')
  return (
    <div>
      <div role="tablist" aria-label="Product side" className="mb-5 inline-flex rounded-xl border border-line p-1 text-sm">
        {(['b2c', 'b2b'] as const).map((s) => (
          <button key={s} role="tab" aria-selected={side === s} onClick={() => setSide(s)} className="relative rounded-lg px-4 py-1.5">
            {side === s && <motion.span layoutId="health-pill" className="absolute inset-0 rounded-lg bg-white/[0.08]" />}
            <span className="relative">{s === 'b2c' ? 'Patient app (B2C)' : 'Clinic workspace (B2B)'}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={side} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
          {side === 'b2c' ? <PatientApp /> : <ClinicDashboard />}
        </motion.div>
      </AnimatePresence>
      <DemoNote>Illustrative recreation · not the production UI · no real patient data</DemoNote>
    </div>
  )
}

function PatientApp() {
  const [step, setStep] = useState(0)
  const [slot, setSlot] = useState<string | null>(null)
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <Phone>
        <div className="flex h-full flex-col px-4 pt-10 pb-4 text-[12px]">
          {step === 0 && (
            <>
              <p className="text-white/50">Good morning</p>
              <p className="text-[15px] font-semibold">Book a consultation</p>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 p-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-400/20"><Stethoscope size={16} className="text-cyan-300" /></span>
                <div><p className="font-medium">General practitioner</p><p className="text-white/50">Video · 20 min</p></div>
              </div>
              <p className="mt-4 mb-2 text-white/50">Today</p>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((s) => (
                  <button key={s} onClick={() => setSlot(s)} className={`rounded-lg border py-2 transition ${slot === s ? 'border-cyan-300 bg-cyan-400/15' : 'border-white/10'}`}>{s}</button>
                ))}
              </div>
              <button disabled={!slot} onClick={() => setStep(1)} className="mt-auto rounded-xl bg-cyan-400 py-2.5 font-semibold text-black disabled:opacity-40">{slot ? `Confirm ${slot}` : 'Pick a time'}</button>
            </>
          )}
          {step === 1 && (
            <>
              <div className="relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/30 via-cyan-500/10 to-transparent">
                <div className="absolute inset-0 grid place-items-center"><span className="grid h-20 w-20 place-items-center rounded-full bg-white/10"><Stethoscope size={30} /></span></div>
                <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px]"><span className="h-1.5 w-1.5 rounded-full bg-red-400" /> 04:12</span>
                <div className="absolute right-3 bottom-3 h-20 w-14 rounded-lg border border-white/20 bg-white/10" />
              </div>
              <div className="mt-4 flex justify-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Mic size={16} /></span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10"><Video size={16} /></span>
                <button onClick={() => setStep(2)} aria-label="End call" className="grid h-10 w-10 place-items-center rounded-full bg-red-500"><PhoneOff size={16} /></button>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <CalendarCheck className="text-cyan-300" />
              <p className="mt-3 text-[15px] font-semibold">Consultation complete</p>
              <div className="mt-4 rounded-xl border border-white/10 p-3">
                <p className="flex items-center gap-2 font-medium"><FileText size={14} /> e-Prescription</p>
                <p className="mt-1 text-white/50">Sent to your pharmacy · code 7F3K</p>
              </div>
              <div className="mt-2 rounded-xl border border-white/10 p-3">
                <p className="font-medium">How was your visit?</p>
                <p className="mt-1 text-lg">★★★★★</p>
              </div>
              <button onClick={() => { setStep(0); setSlot(null) }} className="mt-auto rounded-xl border border-white/15 py-2.5">Done</button>
            </>
          )}
        </div>
      </Phone>
      <ol className="w-full flex-1 space-y-2 text-sm">
        {['Pick a slot and confirm', 'Video consultation', 'e-Prescription + feedback'].map((s, i) => (
          <li key={s} className={`rounded-lg border px-3 py-2 ${step === i ? 'border-cyan-300/40 bg-cyan-400/[0.06] text-fg' : 'border-line text-muted'}`}><span className="mr-2 font-mono text-xs">0{i + 1}</span>{s}</li>
        ))}
        <li className="pt-3 text-muted">Research-led fixes to journeys like this one drove <span className="text-fg">+70% CSAT</span> and <span className="text-fg">+142% engagement</span>.</li>
      </ol>
    </div>
  )
}

function ClinicDashboard() {
  const [sel, setSel] = useState(1)
  return (
    <Browser url="clinic.example/today">
      <div className="grid gap-0 text-[12px] sm:grid-cols-[1.3fr_1fr]">
        <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
          <div className="mb-3 flex items-center justify-between"><p className="font-semibold">Today’s schedule</p><span className="flex items-center gap-1 text-white/50"><Users size={13} /> 5 patients</span></div>
          <div className="space-y-1.5">
            {queue.map((q, i) => (
              <button key={q.t} onClick={() => setSel(i)} className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition ${sel === i ? 'border-indigo-300/50 bg-indigo-400/10' : 'border-white/[0.07] hover:bg-white/[0.03]'}`}>
                <span className="font-mono text-white/50">{q.t}</span>
                <span className="flex-1">{q.n}</span>
                <span className="text-white/50">{q.k}</span>
                <span className={`h-2 w-2 rounded-full ${q.s === 'done' ? 'bg-emerald-400' : q.s === 'live' ? 'bg-red-400' : 'bg-white/20'}`} />
              </button>
            ))}
          </div>
        </div>
        <div className="p-4">
          <p className="text-white/50">Selected</p>
          <p className="text-[15px] font-semibold">{queue[sel].n}</p>
          <p className="text-white/50">{queue[sel].k} · {queue[sel].t}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[['Utilisation', '86%'], ['No-shows', '3%'], ['Avg wait', '6 min'], ['Video share', '41%']].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-white/10 p-2.5"><p className="text-white/50">{l}</p><p className="text-[15px] font-semibold">{v}</p></div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-white/40">Sample figures for illustration</p>
        </div>
      </div>
    </Browser>
  )
}
