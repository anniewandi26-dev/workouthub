# WorkoutHub · Fitness Media

West & Asia fitness media library (React + Vite + TypeScript).

## 正式公网（源站，可直接打开）

**https://anniewandi26-dev.github.io/workouthub/**

仓库：https://github.com/anniewandi26-dev/workouthub

## 关于 gmworkout.com

`www.gmworkout.com` 目前在 Cloudflare 上放的是「跳转页」，而 GitHub 若再绑定该域名，会互相跳转形成**死循环**，浏览器就会出现**白屏**。

正确做法（二选一）：

1. **推荐**：在 Cloudflare DNS 把 `gmworkout.com` / `www` 指到 GitHub Pages（不要再用跳转 HTML），地址栏会稳定显示 `https://gmworkout.com/`  
2. 或者继续用源站链接：`https://anniewandi26-dev.github.io/workouthub/`

## 桌面 HTML

```bash
npm run sync:html
```

- `docs/` → GitHub Pages  
- 桌面 `WorkoutHub.html` → 打开源站  
- 桌面 `WorkoutHub-html/` → 完整静态包  

## Local

```bash
npm install
npm run dev
```

http://localhost:5173/
