import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const packageDir = dirname(dirname(fileURLToPath(import.meta.url)))
const source = await readFile(join(packageDir, 'build', 'sage-icon-arc.svg'), 'utf8')
const png = new Resvg(source, { fitTo: { mode: 'width', value: 256 } }).render().asPng()
await writeFile(join(packageDir, 'build', 'icon-arc.png'), png)
console.log(`generated icon-arc.png (${png.length} bytes)`)
