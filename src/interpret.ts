import type { Expression, Unop, Binop } from "../include/parser/parseTypes.js";

export const PARENT_KEY = Symbol("[[PARENT]]");
type ExpValue = number | boolean;
export type VarValue = ExpValue | { kind: "undefined" };
export type State = { [key: string]: VarValue; [PARENT_KEY]?: State };

const unopBadType: (op: Unop, val: ExpValue) => Error = (op, val) =>
  new Error(`SemanticError: '${op}' operation invalid for type '${typeof val}'.`);

const binopBadType: (op: Binop, v1: ExpValue, v2: ExpValue) => Error = (op, v1, v2) =>
  new Error(`SemanticError: '${op}' operation invalid for types '${typeof v1}' and '${typeof v2}'.`);

function getVarScope(state: State, name: string): State {
  if (!(PARENT_KEY in state) || name in state) return state;
  return getVarScope(state[PARENT_KEY], name);
}

function getVarValue(state: State, name: string): ExpValue {
  const varScope = getVarScope(state, name);
  if (!(name in varScope)) throw new Error(`SemanticError: Unknown identifier '${name}'.`);
  const varVal = varScope[name];
  if (typeof varVal === "object") throw new Error(`SemanticError: Variable '${name}' referenced before assignment.`);
  return varVal;
}

function interpNumUnop(op: Unop, val: ExpValue): number {
  if (typeof val !== "number") throw unopBadType(op, val);

  switch (op) {
    case "POS":
      return +val;
    case "NEG":
      return -val;
    default:
      throw new Error();
  }
}

function interpUnop(state: State, unop: Expression): ExpValue {
  if (unop.kind !== "unop") throw new Error();

  const val = interpExpression(state, unop.child);

  switch (unop.op) {
    case "BITNOT":
      return ~val;
    case "LOGNOT":
      return !val;
    default:
      return interpNumUnop(unop.op, val);
  }
}

function interpNumBinop(binop: Binop, lval: ExpValue, rval: ExpValue): ExpValue {
  if (!(typeof lval === "number" && typeof rval === "number")) throw binopBadType(binop, lval, rval);

  switch (binop) {
    case "EXPN":
      return lval ** rval;
    case "MULT":
      return lval * rval;
    case "DIV":
      return lval / rval;
    case "MOD":
      return lval % rval;
    case "ADD":
      return lval + rval;
    case "SUB":
      return lval - rval;
    case "LSHIFT":
      return lval << rval;
    case "RSHIFT":
      return lval >> rval;
    case "LT":
      return lval < rval;
    case "LTEQ":
      return lval <= rval;
    case "GT":
      return lval > rval;
    case "GTEQ":
      return lval >= rval;
    case "BITAND":
      return lval & rval;
    case "BITXOR":
      return lval ^ rval;
    case "BITOR":
      return lval | rval;
    default:
      throw new Error();
  }
}

function interpBinop(state: State, binop: Expression): ExpValue {
  if (binop.kind !== "binop") throw new Error();

  const lval = interpExpression(state, binop.left);
  if ((lval && binop.op === "LOGOR") || (!lval && binop.op === "LOGAND"))
    return lval;

  const rval = interpExpression(state, binop.right);
  switch (binop.op) {
    case "ISEQ":
      return lval === rval;
    case "NOTEQ":
      return lval !== rval;
    case "LOGAND":
      return lval && rval;
    case "LOGOR":
      return lval || rval;
    default:
      return interpNumBinop(binop.op, lval, rval);
  }
}

export function interpExpression(state: State, exp: Expression): ExpValue {
  switch (exp.kind) {
    case "number":
    case "boolean":
      return exp.value;
    case "ident":
      return getVarValue(state, exp.name);
    case "unop":
      return interpUnop(state, exp);
    case "binop":
      return interpBinop(state, exp);
  }
}
