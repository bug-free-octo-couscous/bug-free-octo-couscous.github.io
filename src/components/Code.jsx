import { BD, CM, IV, KW, MU, SURF2, TX, TY, mono } from '../theme.js';

const KEYWORDS = new Set([
  'lambda_', 'function', 'def', 'check', 'PI', 'SIGMA', 'Path',
  'Equiv', 'Glue', 'glue', 'unglue', 'transport', 'hcomp', 'ua', 'equivFwd',
  'mkEquiv', 'fst', 'snd', 'pair', 'TIntervalTy', 'and', 'or', 'not_',
]);

function tokenize(src) {
  const res = [];
  let i = 0;

  while (i < src.length) {
    if (src[i] === '-' && src[i + 1] === '-') {
      let j = src.indexOf('\n', i);
      if (j < 0) j = src.length;
      res.push({ t: src.slice(i, j), c: CM });
      i = j;
      continue;
    }

    if (/\s/.test(src[i])) {
      let j = i;
      while (j < src.length && /\s/.test(src[j])) j++;
      res.push({ t: src.slice(i, j), c: TX });
      i = j;
      continue;
    }

    if (src[i] === '{') {
      const j = src.indexOf('}', i);
      if (j >= 0) { res.push({ t: src.slice(i, j + 1), c: IV }); i = j + 1; continue; }
    }

    if (src[i] === '@') { res.push({ t: '@', c: IV }); i++; continue; }

    if (/[a-zA-Z_]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_']/.test(src[j])) j++;
      const w = src.slice(i, j);
      res.push({ t: w, c: KEYWORDS.has(w) ? KW : /^U\d+$/.test(w) ? TY : TX });
      i = j;
      continue;
    }

    if ((src[i] === '0' || src[i] === '1') &&
        (i + 1 >= src.length || !/[a-zA-Z0-9_]/.test(src[i + 1]))) {
      res.push({ t: src[i], c: IV });
      i++;
      continue;
    }

    res.push({ t: src[i], c: MU });
    i++;
  }

  return res;
}

export function Code({ children, compact = false }) {
  const tokens = tokenize(children);
  return (
    <pre style={{
      background: SURF2,
      border: `1px solid ${BD}`,
      borderRadius: 10,
      padding: compact ? '10px 16px' : '18px 22px',
      fontFamily: mono, fontSize: 13, lineHeight: 1.8,
      overflowX: 'auto', margin: '14px 0', color: TX, whiteSpace: 'pre',
      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {tokens.map((tk, i) => (
        <span key={i} style={{ color: tk.c }}>{tk.t}</span>
      ))}
    </pre>
  );
}