export const sections = [
  { id: 'impact', label: 'Impact' },
  { id: 'work', label: 'Case studies' },
  { id: 'showcase', label: 'Products' },
  { id: 'journey', label: 'Journey' },
  { id: 'principles', label: 'Principles' },
  { id: 'contact', label: 'Contact' },
]

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
