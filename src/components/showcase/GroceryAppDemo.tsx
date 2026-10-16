import { AnimatePresence, motion } from 'motion/react'
import { Apple, Bike, Carrot, ChevronLeft, ChevronRight, CreditCard, Croissant, Milk, ShoppingBasket, Store } from 'lucide-react'
import { useState } from 'react'
import { DemoNote, Phone } from './DeviceFrame'

const products = [
  { name: 'Fresh produce', price: 42, Icon: Carrot, tint: 'from-emerald-400/30' },
  { name: 'Bakery', price: 18, Icon: Croissant, tint: 'from-amber-400/30' },
  { name: 'Dairy', price: 35, Icon: Milk, tint: 'from-sky-400/30' },
  { name: 'Fruit', price: 29, Icon: Apple, tint: 'from-rose-400/30' },
]
const steps = ['Browse', 'Basket', 'Checkout', 'Track']

export function GroceryAppDemo() {
  const [step, setStep] = useState(0)
  const [basket, setBasket] = useState<Record<string, number>>({ 'Fresh produce': 1, Bakery: 2 })
  const items = products.filter((p) => basket[p.name])
  const total = items.reduce((s, p) => s + p.price * basket[p.name], 0)
  const count = Object.values(basket).reduce((a, b) => a + b, 0)
  const go = (d: number) => setStep((s) => Math.min(3, Math.max(0, s + d)))

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
      <div>
        <Phone>
          <div className="flex h-full flex-col pt-9 text-[12px]">
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="flex items-center gap-1.5 font-semibold"><Store size={14} className="text-emerald-400" /> Corner Market</span>
              <span className="relative"><ShoppingBasket size={16} />{count > 0 && <span className="absolute -top-1.5 -right-2 rounded-full bg-emerald-400 px-1 text-[9px] font-bold text-black">{count}</span>}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="flex-1 overflow-hidden px-4">
                {step === 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {products.map(({ name, price, Icon, tint }) => (
                      <button key={name} onClick={() => setBasket((b) => ({ ...b, [name]: (b[name] ?? 0) + 1 }))} className={`rounded-xl border border-white/10 bg-gradient-to-br ${tint} to-transparent p-2.5 text-left active:scale-95`}>
                        <Icon size={22} />
                        <p className="mt-6 leading-tight">{name}</p>
                        <p className="text-white/50">₺{price}</p>
                        <span className="mt-1 inline-block rounded-md bg-white/10 px-1.5 text-[10px]">+ add</span>
                      </button>
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div className="space-y-2">
                    {items.length === 0 && <p className="text-white/50">Basket is empty. Go back and add something.</p>}
                    {items.map((p) => (
                      <div key={p.name} className="flex items-center justify-between rounded-xl border border-white/10 p-2.5">
                        <span>{p.name}</span>
                        <span className="flex items-center gap-2">
                          <button aria-label={`Remove one ${p.name}`} onClick={() => setBasket((b) => ({ ...b, [p.name]: b[p.name] - 1 }))} className="rounded bg-white/10 px-1.5">−</button>
                          {basket[p.name]}
                          <button aria-label={`Add one ${p.name}`} onClick={() => setBasket((b) => ({ ...b, [p.name]: b[p.name] + 1 }))} className="rounded bg-white/10 px-1.5">+</button>
                        </span>
                      </div>
                    ))}
                    <p className="pt-2 text-right font-semibold">Total ₺{total}</p>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-2">
                    <div className="rounded-xl border border-white/10 p-3"><p className="text-white/50">Deliver to</p><p>Home · 30–45 min slot</p></div>
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3"><CreditCard size={16} /> Card •••• 4242</div>
                    <div className="rounded-xl border border-white/10 p-3"><p className="flex justify-between"><span>Items</span><span>₺{total}</span></p><p className="flex justify-between text-white/50"><span>Delivery</span><span>₺0</span></p></div>
                  </div>
                )}
                {step === 3 && (
                  <div>
                    <svg viewBox="0 0 200 150" className="w-full rounded-xl border border-white/10 bg-[#0b0b0e]">
                      <path id="courier" d="M 20 130 C 60 120, 50 70, 100 70 S 150 30, 180 22" fill="none" stroke="rgb(52 211 153 / 0.6)" strokeWidth="3" strokeDasharray="4 5" />
                      <rect x="12" y="122" width="16" height="16" rx="3" fill="#34d399" />
                      <circle cx="180" cy="22" r="7" fill="#fff" />
                      <circle r="6" fill="#34d399"><animateMotion dur="5s" repeatCount="indefinite"><mpath href="#courier" /></animateMotion></circle>
                    </svg>
                    <p className="mt-3 flex items-center gap-2 font-semibold"><Bike size={15} className="text-emerald-400" /> Courier on the way</p>
                    <p className="text-white/50">Optimized route · arriving in ~12 min</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            <div className="p-4">
              <button onClick={() => (step === 3 ? setStep(0) : go(1))} className="w-full rounded-xl bg-emerald-400 py-2.5 font-semibold text-black">
                {['View basket', 'Checkout', `Pay ₺${total}`, 'Order again'][step]}
              </button>
            </div>
          </div>
        </Phone>
        <DemoNote>Illustrative recreation · not the production UI</DemoNote>
      </div>
      <div className="w-full flex-1">
        <div className="flex items-center gap-2">
          <button onClick={() => go(-1)} aria-label="Previous screen" className="rounded-lg border border-line p-1.5 text-muted hover:text-fg"><ChevronLeft size={16} /></button>
          <button onClick={() => go(1)} aria-label="Next screen" className="rounded-lg border border-line p-1.5 text-muted hover:text-fg"><ChevronRight size={16} /></button>
        </div>
        <ol className="mt-4 space-y-2">
          {steps.map((s, i) => (
            <li key={s}>
              <button onClick={() => setStep(i)} className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition ${step === i ? 'border-emerald-400/40 bg-emerald-400/[0.07] text-fg' : 'border-line text-muted'}`}>
                <span className="font-mono text-xs">0{i + 1}</span> {s}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-6 rounded-xl border border-line p-4">
          <p className="eyebrow">Timeline</p>
          <div className="relative mt-4 h-1.5 rounded-full bg-white/[0.06]">
            <motion.div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-400 to-accent-2" initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-subtle"><span>03.2020 joined</span><span>07.2021 acquired</span></div>
          <p className="mt-3 text-sm text-muted">16 months from building the product org to a 100% exit to Delivery Hero.</p>
        </div>
      </div>
    </div>
  )
}
