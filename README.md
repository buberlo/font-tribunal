# Font Tribunal

> Upload a website screenshot and the tribunal fines fonts for contrast crimes and orphaned headings.

A local tool analyzes web screenshots and DOM exports to judge typography, then produces a courtroom report with fines, citations, and suggested replacements. It can also simulate accessibility failures by re-rendering with the offending font sizes.

## Features
- Drop a screenshot or URL for typography metrics including contrast, line height, and paragraph width.
- Assign fines to headings, body copy, and button labels using a readable accessibility rubric.
- Generate a courtroom report with citations and replacement font recommendations.
- Compare a before and after mockup where fines are resolved by suggested CSS changes.

## Stack
- Node.js
- Puppeteer
- OpenCV

## Getting started
```
npm install && npm run dev
```

---
*Farmed 🚜 by [Appshaker](https://github.com/buberlo) — shaken into existence.*
