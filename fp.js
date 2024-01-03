// Control
globalThis.$ = (fn) => (x) => fn(x);

globalThis.infix = (a) => (fn) => (b) => fn(a)(b);

globalThis.flip = (fn) => (a) => (b) => fn(b)(a);

globalThis.compose = (fns) => (x) => fns.reduceRight((prev, fn) => fn(prev), x);

// Arrays
globalThis.list = (x) => [x];

globalThis.map = (fn) => (arr) => arr.map((item) => fn(item));

globalThis.filter = (fn) => (arr) => arr.filter((item) => fn(item));

globalThis.foldl = (fn) => (x) => (arr) => arr.reduce((prev, curr) => fn(prev)(curr), x);

globalThis.foldr = (fn) => (x) => (arr) => arr.reduceRight((prev, curr) => fn(curr)(prev), x);

// Math
globalThis.add = (a) => (b) => a + b;

globalThis.multiply = (a) => (b) => a * b;

globalThis.subtract = (a) => (b) => a - b;

globalThis.divide = (a) => (b) => a / b;
