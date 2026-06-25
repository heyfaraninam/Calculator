let cur = '0', prev = '', op = '', fresh = false, evaled = false, sciMode = false;
let history = [];

const RES = document.getElementById('result');
const EXPR = document.getElementById('expr');
const DISP = document.getElementById('display');
const HLIST = document.getElementById('hist-list');
const HEMPTY = document.getElementById('hist-empty');
const BADGE = document.getElementById('mode-badge');

function render(anim) {
  const l = cur.length;
  let cls = 'result-line' + (l > 14 ? ' xs' : l > 9 ? ' sm' : '');
  RES.className = cls;
  if (anim) {
    RES.classList.remove('flip');
    void RES.offsetWidth;
    RES.classList.add('flip');
  }
  RES.textContent = cur;
}

function ripple(btn, e) {
  if (!btn || !e) return;
  const r = document.createElement('span');
  r.className = 'rpl';
  const rc = btn.getBoundingClientRect();
  const s = Math.max(rc.width, rc.height) * 1.6;
  r.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - rc.left - s/2}px;top:${e.clientY - rc.top - s/2}px`;
  btn.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
}

document.querySelectorAll('.btn').forEach(b => b.addEventListener('pointerdown', e => ripple(b, e)));

function calcNum(d) {
  if (evaled) { cur = d; evaled = false; fresh = false; }
  else if (fresh) { cur = d; fresh = false; }
  else { cur = cur === '0' ? d : (cur.length < 15 ? cur + d : cur); }
  render(true);
}

function calcDot() {
  if (fresh) { cur = '0.'; fresh = false; }
  else if (!cur.includes('.')) cur += '.';
  render(true);
}

function calcOp(o) {
  if (op && !fresh) compute(false);
  prev = cur; op = o; fresh = true; evaled = false;
  EXPR.textContent = prev + ' ' + o;
  render(false);
}

function compute(final) {
  const a = parseFloat(prev), b = parseFloat(cur);
  let res;
  if (op === '+') res = a + b;
  else if (op === '−') res = a - b;
  else if (op === '×') res = a * b;
  else if (op === '÷') {
    if (b === 0) {
      cur = 'Error'; op = ''; prev = ''; fresh = false; evaled = true;
      EXPR.textContent = 'Cannot divide by zero';
      DISP.classList.remove('shake'); void DISP.offsetWidth; DISP.classList.add('shake');
      render(false); return;
    }
    res = a / b;
  }
  const str = String(parseFloat(res.toPrecision(12)));
  const exprStr = prev + ' ' + op + ' ' + cur + ' =';
  addHistory(exprStr, str);
  EXPR.textContent = exprStr;
  cur = str; op = ''; prev = ''; fresh = false; evaled = true;
  RES.classList.remove('pop', 'glow-accent'); void RES.offsetWidth;
  render(false);
  RES.classList.add('pop', 'glow-accent');
  setTimeout(() => RES.classList.remove('glow-accent'), 1200);
}

function calcEqual() { if (!op) return; compute(true); }
function calcAC() { cur = '0'; prev = ''; op = ''; fresh = false; evaled = false; EXPR.textContent = ''; render(true); }
function calcToggleSign() { if (cur === '0' || cur === 'Error') return; cur = cur.startsWith('-') ? cur.slice(1) : '-' + cur; render(true); }
function calcPct() { cur = String(parseFloat((parseFloat(cur) / 100).toPrecision(12))); evaled = false; fresh = false; render(true); }

/* ── SCIENTIFIC ── */
function calcSci(fn) {
  const v = parseFloat(cur);
  let res, label;
  if (fn === 'sin') { res = Math.sin(v * Math.PI / 180); label = 'sin(' + cur + ')'; }
  else if (fn === 'cos') { res = Math.cos(v * Math.PI / 180); label = 'cos(' + cur + ')'; }
  else if (fn === 'tan') { res = Math.tan(v * Math.PI / 180); label = 'tan(' + cur + ')'; }
  else if (fn === 'log') { if (v <= 0) { cur = 'Error'; render(false); return; } res = Math.log10(v); label = 'log(' + cur + ')'; }
  else if (fn === 'sqrt') { if (v < 0) { cur = 'Error'; render(false); return; } res = Math.sqrt(v); label = '√(' + cur + ')'; }
  else if (fn === 'sq') { res = v * v; label = '(' + cur + ')²'; }
  else if (fn === 'inv') { if (v === 0) { cur = 'Error'; render(false); return; } res = 1 / v; label = '1/(' + cur + ')'; }
  else if (fn === 'pi') { cur = String(Math.PI); evaled = true; render(true); return; }
  const str = String(parseFloat(res.toPrecision(10)));
  addHistory(label + ' =', str);
  EXPR.textContent = label + ' =';
  cur = str; evaled = true;
  RES.classList.remove('pop', 'glow-accent'); void RES.offsetWidth;
  render(false);
  RES.classList.add('pop', 'glow-accent');
  setTimeout(() => RES.classList.remove('glow-accent'), 1200);
}

function toggleSci() {
  sciMode = !sciMode;
  document.getElementById('sci-row').classList.toggle('hidden', !sciMode);
  BADGE.textContent = sciMode ? 'SCIENTIFIC' : 'STANDARD';
}

/* ── HISTORY ── */
function addHistory(expr, result) {
  history.unshift({ expr, result });
  if (history.length > 20) history.pop();
  renderHistory();
}

function renderHistory() {
  HEMPTY.style.display = history.length ? 'none' : 'block';
  const items = HLIST.querySelectorAll('.history-item');
  items.forEach(i => i.remove());
  history.forEach(h => {
    const el = document.createElement('div');
    el.className = 'history-item';
    el.innerHTML = `<div class="hist-expr">${h.expr}</div><div class="hist-result">${h.result}</div>`;
    el.onclick = () => { cur = h.result; evaled = true; fresh = false; render(true); };
    HLIST.appendChild(el);
  });
}

function clearHistory() { history = []; renderHistory(); }

/* ── THEMES ── */
function setTheme(name, dot) {
  document.body.className = 'theme-' + name;
  document.querySelectorAll('.theme-dot').forEach(d => d.classList.remove('active'));
  dot.classList.add('active');
}

/* ── KEYBOARD ── */
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') calcNum(e.key);
  else if (e.key === '.') calcDot();
  else if (e.key === '+') calcOp('+');
  else if (e.key === '-') calcOp('−');
  else if (e.key === '*') calcOp('×');
  else if (e.key === '/') { e.preventDefault(); calcOp('÷'); }
  else if (e.key === 'Enter' || e.key === '=') calcEqual();
  else if (e.key === 'Escape') calcAC();
  else if (e.key === 'Backspace') { if (cur.length > 1 && !evaled) cur = cur.slice(0, -1); else cur = '0'; render(true); }
});

render(false);