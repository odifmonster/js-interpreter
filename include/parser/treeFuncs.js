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

export function mkAugBinop(op) {
  return { kind: "augbinop", op: op, left: empty, right: empty };
}

export function mkAugUnop(op) {
  return { kind: "augunop", op: op, child: empty };
}

export function mkBlock(res) {
  return { kind: "block", body: res[1] };
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

export function buildPostUnopTree(res) {
  const first = res.shift();
  return res.reduce((acc, e) => {
    e.child = acc;
    return e;
  }, first);
}

export function buildStmt(res) {
  return { kind: "exp", exp: res[0] };
}

export function buildInitVarStmt(res) {
  return {
    kind: res[0],
    name: res[1],
    value: res[3]
  };
}

export function buildIfStmt(res) {
  const stmt = {
    kind: "if", test: res[2], truePart: res[4], falsePart: empty
  };
  if (res.length === 7) stmt.falsePart = res[6];
  return stmt;
}

export function buildWhileStmt(res) {
  return {
    kind: "while", test: res[2], body: res[4]
  };
}