<div align="center">

# ✦ CALC

### A beautiful, glassmorphic calculator — built with pure HTML, CSS & JavaScript.

<br/>

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=for-the-badge)

<br/>

> Frosted glass panels · 3D press buttons · 4 animated themes · Scientific mode · Calculation history

<br/>

</div>

---

## ✦ Features

### 🎨 Four Animated Themes
Switch between four handcrafted colour palettes — each with its own glowing orbs, glass tints, and accent colours. Themes transition smoothly across the entire UI.

| Theme | Palette |
|-------|---------|
| **Dusk** | Purple · Cyan · Magenta |
| **Forest** | Neon Green · Lime · Gold |
| **Ember** | Orange · Yellow · Red |
| **Arctic** | Ice Blue · Teal · Yellow |

### 🔲 3D Press Buttons
Every button has a real raised shadow beneath it that physically compresses on press — like clicking a mechanical key.

### 🧪 Scientific Mode
Toggle the `SCI` button in the display to reveal a full row of scientific functions:
`sin` · `cos` · `tan` · `log` · `√` · `x²` · `1/x` · `π`

### 📋 Calculation History
Every result is logged in a live history panel. Click any past entry to instantly load it back into the calculator. Supports up to 20 entries with a one-click clear.

### ⌨️ Full Keyboard Support
| Key | Action |
|-----|--------|
| `0–9` | Input digit |
| `+` `-` `*` `/` | Operators |
| `Enter` or `=` | Evaluate |
| `.` | Decimal point |
| `Backspace` | Delete last digit |
| `Escape` | Clear (AC) |

### ✨ Animations & Polish
- Floating background orbs that breathe and drift
- Frosted glass panels with live backdrop blur
- Ripple effect on every button press
- Digit flip animation on input
- Spring-bounce pop + accent glow on result
- Error shake on division by zero
- Smooth 0.8s theme crossfade

---

## ✦ Getting Started

No build step. No dependencies. No npm. Just open a file.

```bash
git clone https://github.com/heyfaraninam/Calculator.git
cd calc
open index.html
```

Or simply download the three files and open `index.html` in any modern browser.

---

## ✦ File Structure

```
calc/
├── index.html     # Markup & layout
├── styles.css     # Themes, glass, animations, 3D buttons
└── app.js         # Calculator logic, history, theme switcher
```

The project is intentionally zero-dependency — no frameworks, no bundlers, no config files. Just three clean files that work anywhere.

---

## ✦ Browser Support

Works in all modern browsers that support `backdrop-filter`.

| Browser | Support |
|---------|---------|
| Chrome 76+ | ✅ Full |
| Firefox 103+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 79+ | ✅ Full |

---

## ✦ Customising

### Adding a new theme
In `styles.css`, add a new `body.theme-yourname { ... }` block with these CSS variables:

```css
body.theme-yourname {
  --bg1: #000;
  --bg2: #111;
  --bg3: #222;
  --glass-bg: rgba(255,255,255,0.08);
  --glass-border: rgba(255,255,255,0.18);
  --glass-shadow: rgba(0,0,0,0.4);
  --accent: #ff0;
  --accent2: #0ff;
  --accent3: #f0f;
  --text: #fff;
  --text-dim: rgba(255,255,255,0.4);
  --btn-num-top: #1a1a1a;
  --btn-num-bot: #0d0d0d;
  --btn-op-top: #1a1a00;
  --btn-op-bot: #0d0d00;
  --btn-eq-top: #ff0;
  --btn-eq-bot: #aa0;
  --btn-fn-top: #001a1a;
  --btn-fn-bot: #000d0d;
  --btn-clear-top: #1a0000;
  --btn-clear-bot: #0d0000;
  --orb1: #ff0;
  --orb2: #0ff;
  --orb3: #f0f;
  --history-bg: rgba(255,255,0,0.06);
}
```

Then add a dot in `index.html`:
```html
<div class="theme-dot yourname" onclick="setTheme('yourname',this)" title="Your Theme"></div>
```

---

## ✦ License

MIT — free to use, modify, and ship.

---

<div align="center">

Made with care · pure HTML · CSS · JS

</div>
