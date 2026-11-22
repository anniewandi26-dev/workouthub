/**
 * Build site → docs/ (GitHub Pages source) + Desktop portable folder + Desktop launcher HTML.
 * Launcher opens the public site so double-click always shows the live synced page.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import os from 'node:os'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const PUBLIC_URL = 'https://gmworkout.com/'
const desktop = path.join(os.homedir(), 'Desktop')
const docsDir = path.join(root, 'docs')
const portableDir = path.join(desktop, 'WorkoutHub-html')
const launcherPath = path.join(desktop, 'WorkoutHub.html')

console.log('Building…')
execSync('npm run build', { cwd: root, stdio: 'inherit' })

const dist = path.join(root, 'dist')
if (!fs.existsSync(dist)) {
  console.error('dist/ missing after build')
  process.exit(1)
}

function rimraf(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true })
}

function copyDir(src, dest) {
  rimraf(dest)
  fs.cpSync(src, dest, { recursive: true })
}

copyDir(dist, docsDir)
copyDir(dist, portableDir)

// Double-click opens the live public page (always in sync after deploy).
const launcher = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WorkoutHub · Fitness Media</title>
  <style>
    html, body { margin:0; height:100%; background:#07111f; overflow:hidden; }
    iframe { position:fixed; inset:0; width:100%; height:100%; border:0; }
    .fallback {
      position:fixed; inset:0; display:none; place-items:center; padding:1.5rem;
      color:#fff; font-family:"Segoe UI",system-ui,sans-serif; text-align:center;
      background:#07111f;
    }
    .fallback a {
      display:inline-grid; place-items:center; min-height:3rem; padding:0 1.4rem;
      margin-top:1rem; border-radius:999px; background:#c8f000; color:#07111f;
      font-weight:800; text-decoration:none;
    }
  </style>
</head>
<body>
  <iframe
    id="app"
    title="WorkoutHub"
    src="${PUBLIC_URL}"
    allow="autoplay; clipboard-read; clipboard-write"
  ></iframe>
  <div class="fallback" id="fallback">
    <div>
      <p>无法嵌入加载时，请直接打开公网页面：</p>
      <a href="${PUBLIC_URL}">打开 WorkoutHub</a>
    </div>
  </div>
  <script>
    // Prefer top-level navigation so Safari gate / hash routes work fully.
    location.replace(${JSON.stringify(PUBLIC_URL)});
  </script>
</body>
</html>
`

fs.writeFileSync(launcherPath, launcher, 'utf8')

console.log('Synced:')
console.log(' - docs/ (GitHub Pages)')
console.log(' -', portableDir)
console.log(' -', launcherPath)
console.log('Public:', PUBLIC_URL)
