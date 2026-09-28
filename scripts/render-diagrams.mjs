import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { Resvg } from '@resvg/resvg-js'

const findSvg = directory => fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
  const file = path.join(directory, entry.name)
  return entry.isDirectory() ? findSvg(file) : entry.name.endsWith('.svg') ? [file] : []
})
const files = findSvg('chapters').sort()
const directory = path.join(os.tmpdir(), 'hot100-diagram-review')
fs.mkdirSync(directory, { recursive: true })
for (const file of files) {
  const rendered = new Resvg(fs.readFileSync(file, 'utf8'), { font: { loadSystemFonts: true } }).render()
  const destination = path.join(directory, path.relative('chapters', file).replace(/[\\/]/g, '__').replace(/\.svg$/, '.png'))
  fs.writeFileSync(destination, rendered.asPng())
  console.log(destination)
}
