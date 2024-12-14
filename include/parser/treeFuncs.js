/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const empty = { kind: "empty" };

export function mkNumber(x) {
  return { kind: "number", value: x };
}

export function mkIdent(name) {
  return { kind: "ident", name: name };
}

export const mkEmpty = () => empty;

export function mkBinop(op) {
  return { kind: "binop", operator: op, left: empty, right: empty };
}

export function buildBinopTree(res) {
  const first = res.shift();
  return res.reduce((acc, e, i) => {
    if (i % 2 === 0) {
      e.left = acc;
      return e;
    }
    acc.right = e;
    return acc;
  }, first);
}