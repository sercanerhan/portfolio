// Precomputes the dotted world map used by the hero and the LaaS showcase (run once; output is committed).
import fs from 'node:fs'
import DottedMap from 'dotted-map'

const map = new DottedMap({ height: 64, grid: 'diagonal' })

// Places that appear in the CV: home base, Delivery Hero regions, Arute presales, EU CitySDK cities.
const pins = {
  istanbul: [41.01, 28.98],
  berlin: [52.52, 13.4],
  dubai: [25.2, 55.27],
  singapore: [1.35, 103.82],
  buenosAires: [-34.6, -58.38],
  lisbon: [38.72, -9.14],
  barcelona: [41.39, 2.17],
  rome: [41.9, 12.5],
  bangkok: [13.76, 100.5],
  karachi: [24.86, 67.0],
  newYork: [40.71, -74.0],
}
const pinXY = {}
for (const [name, [lat, lng]] of Object.entries(pins)) {
  const p = map.getPin({ lat, lng })
  pinXY[name] = { x: +p.x.toFixed(2), y: +p.y.toFixed(2) }
}

// Rough region buckets for the logistics showcase (by longitude/latitude, deliberately coarse).
function region({ lat, lng }) {
  if (lng < -30) return lat < 15 ? 'latam' : 'na'
  if (lng >= -30 && lng < 45 && lat > 35 && lat < 72) return 'eu'
  if (lng >= -20 && lng < 63 && lat <= 35 && lat > 10) return 'mena'
  if (lng >= 63 && lat < 43 && lat > -50) return 'apac'
  return 'other'
}

// getPoints() only returns x/y, so invert the projection by sampling getPin along each axis.
const lngSamples = [], latSamples = []
for (let lng = -179; lng <= 179; lng += 1) lngSamples.push([map.getPin({ lat: 0, lng }).x, lng])
for (let lat = -85; lat <= 85; lat += 1) latSamples.push([map.getPin({ lat, lng: 0 }).y, lat])
const nearest = (samples, v) => samples.reduce((a, b) => (Math.abs(b[0] - v) < Math.abs(a[0] - v) ? b : a))[1]

const points = map.getPoints().map((p) => {
  const geo = { lat: nearest(latSamples, p.y), lng: nearest(lngSamples, p.x) }
  return [+p.x.toFixed(2), +p.y.toFixed(2), region(geo)]
})
const { width, height } = map.image ?? {}
const xs = points.map((p) => p[0]), ys = points.map((p) => p[1])
const out = {
  width: width ?? Math.ceil(Math.max(...xs)) + 1,
  height: height ?? Math.ceil(Math.max(...ys)) + 1,
  points,
  pins: pinXY,
}
fs.writeFileSync('src/data/worldmap.json', JSON.stringify(out))
console.log(`worldmap: ${points.length} points, ${out.width}x${out.height}`)
