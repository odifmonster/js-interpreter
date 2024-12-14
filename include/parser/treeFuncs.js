/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const empty = { kind: "empty" };

export function mkNumber(x) {
  return { kind: "number", value: x };
}

export function mkBoolean(p) {
  return { kind: "boolean", value: p };
}

export function mkIdent(name) {
  return { kind: "ident", name: name };
}

export const mkEmpty = () => empty;

export function mkBinop(op) {
  return { kind: "binop", op: op, left: empty, right: empty };
}

export function mkUnop(op) {
  return { kind: "unop", op: op, child: empty };
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

export function buildPreUnopTree(res) {
  res[0].child = res[1];
  return res[0];
}