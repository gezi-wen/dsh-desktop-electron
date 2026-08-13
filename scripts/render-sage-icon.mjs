/**
 * Rasterize the Sage icon (build/sage-icon.svg, designed by 文歌子) into the
 * desktop icons: build/icon.png (256px) and build/tray-icon.png (32px).
 * Runs under plain Node with @resvg/resvg-js, same toolchain as
 * generate-icons.mjs.
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const packageDir = dirname(dirname(fileURLToPath(import.meta.url)))
const source = await readFile(join(packageDir, 'build', 'sage-icon.svg'), 'utf8')

const ICONS = [
  { file: 'icon.png', size: 256 },
  { file: 'tray-icon.png', size: 32 },
]

for (const icon of ICONS) {
  const png = new Resvg(source, { fitTo: { mode: 'width', value: icon.size } }).render().asPng()
  await writeFile(join(packageDir, 'build', icon.file), png)
  console.log(`generated ${icon.file} (${png.length} bytes)`)
}
