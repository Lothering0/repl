// Control
globalThis.panic = (message) => {
  throw new Error(message);
};

globalThis.$ = (fn) => (x) => fn(x);

globalThis.infix = (a) => (fn) => (b) => fn(a)(b);

globalThis.flip = (fn) => (a) => (b) => fn(b)(a);

globalThis.compose = (fns) => (x) => fns.reduceRight((prev, fn) => fn(prev), x);

globalThis.curry =
  (fn) =>
  (...xs) =>
    fn.bind(null, ...xs);

// Arrays
globalThis.head = (arr) => arr[0];

globalThis.last = (arr) => arr[arr.length - 1];

const initAux = (arr) => (index) => (finalArr) =>
  arr.length - 1 === index ? finalArr : initAux(arr)(index + 1)((finalArr.push(arr[index]), finalArr));

globalThis.init = (arr) => initAux(arr)(0)([]);

const tailAux = (arr) => (index) => (finalArr) =>
  index === 0 ? finalArr : tailAux(arr)(index - 1)((finalArr.unshift(arr[index]), finalArr));

globalThis.tail = (arr) => tailAux(arr)(arr.length - 1)([]);

globalThis.map = (fn) => (arr) => arr.length ? [fn(head(arr)), ...map(fn)(tail(arr))] : [];

globalThis.filter = (fn) => (xs) => xs.length ? [...(fn(head(xs)) ? [head(xs)] : []), ...filter(fn)(tail(xs))] : [];

globalThis.foldl = (fn) => (x) => (arr) => arr.reduce((prev, curr) => fn(prev)(curr), x);

globalThis.foldr = (fn) => (x) => (arr) => arr.reduceRight((prev, curr) => fn(curr)(prev), x);

const zipWithAux = (fn) => (arr1) => (arr2) => (index) => (finalArr) =>
  [arr1.length, arr2.length].includes(index)
    ? finalArr
    : ((aux = zipWithAux(fn)(arr1)(arr2)(index + 1)),
      [typeof arr1[index], typeof arr2[index]].includes("undefined")
        ? aux(finalArr)
        : aux((finalArr.push(fn(arr1[index])(arr2[index])), finalArr)));

globalThis.zipWith = (fn) => (arr1) => (arr2) => zipWithAux(fn)(arr1)(arr2)(0)([]);

globalThis.list = (x) => Object.freeze([x]);

globalThis.List = {
  unit: list,
  join: (xs) => (xs.length ? [...head(xs), ...List.join(tail(xs))] : []),
};

globalThis.guard = (cases) => last(cases.find(([predicate]) => predicate()))();

globalThis.OTHERWISE = true;

globalThis.listN = (x) => (y) =>
  [
    x,
    ...globalThis.guard([
      [() => x > y, () => listN(x - 1)(y)],
      [() => x < y, () => listN(x + 1)(y)],
      [() => OTHERWISE, () => []],
    ]),
  ];

// Booleans
globalThis.not = (x) => !x;

globalThis.equals = (x) => (y) => x === y;

globalThis.more = (x) => (y) => x > y;

globalThis.less = (x) => (y) => x < y;

globalThis.moreOrEquals = (x) => (y) => x >= y;

globalThis.lessOrEquals = (x) => (y) => x <= y;

// Math
globalThis.add = (a) => (b) => a + b;

globalThis.multiply = (a) => (b) => a * b;

globalThis.subtract = (a) => (b) => a - b;

globalThis.divide = (a) => (b) => a / b;

// Strings
globalThis.toUpper = (string) => string.toUpperCase();

globalThis.toLower = (string) => string.toLowerCase();

globalThis.reverse = (a) => (typeof a === "string" ? a.split("").reverse().join("") : a.reverse());
