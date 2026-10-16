// Writes honest build stats for the "How this site was built" section.
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
const src = walk('src').filter((f) => /\.(tsx?|css)$/.test(f))
const linesOfCode = src.reduce((n, f) => n + fs.readFileSync(f, 'utf8').split('\n').filter((l) => l.trim()).length, 0)
const components = src.filter((f) => f.endsWith('.tsx') && f.includes('components')).length
const demos = fs.readdirSync('src/components/showcase').filter((f) => f.endsWith('Demo.tsx') || f === 'GlobalLaunchMap.tsx').length
const images = fs.existsSync('public/images') ? fs.readdirSync('public/images').filter((f) => f.endsWith('.webp')).length : 0
const realDir = 'public/images/real'
const realShots = fs.existsSync(realDir) ? fs.readdirSync(realDir).filter((f) => f.endsWith('.webp')).map((f) => f.replace(/\.webp$/, '')) : []
let commits = 0
try { commits = Number(execSync('git rev-list --count HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()) } catch {}

const stats = { linesOfCode, components, demos, images, commits, realShots, repo: 'https://github.com/sercanerhan/portfolio' }
fs.writeFileSync('src/data/buildStats.json', JSON.stringify(stats, null, 2) + '\n')
console.log('build stats', stats)
