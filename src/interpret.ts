import type { Expression } from "../include/parser/parseTypes.js";

export const PARENT_KEY = Symbol("[[PARENT]]");
export type VarValue = number | { kind: "undefined" };
export type State = { [key: string]: VarValue; [PARENT_KEY]?: State; };

function getVarScope(state: State, name: string): State {
  if (!(PARENT_KEY in state) || name in state) return state;
  return getVarScope(state[PARENT_KEY], name);
}

function getVarValue(state: State, name: string): number {
  const varScope = getVarScope(state, name);
  if (!(name in varScope)) throw new Error(`SemanticError: Unknown identifier '${name}'.`);
  const varVal = varScope[name];
  if (typeof varVal === "object")
    throw new Error(`SemanticError: Variable '${name}' referenced before assignment.`);
  return varVal;
}

function interpNumBinop(state: State, numBinop: Expression): number {
  if (numBinop.kind !== "binop")
    throw new Error("This should never happen.");

  const lval = interpExpression(state, numBinop.left);
  const rval = interpExpression(state, numBinop.right);

  switch (numBinop.op) {
    case "EXPN": return lval ** rval;
    case "MULT": return lval * rval;
    case "DIV": return lval / rval;
    case "MOD": return lval % rval;
    case "ADD": return lval + rval;
    case "SUB": return lval - rval;
  }
}

export function interpExpression(state: State, exp: Expression): number {
  switch (exp.kind) {
    case "number":
      return exp.value;
    case "ident":
      return getVarValue(state, exp.name);
    case "binop":
      return interpNumBinop(state, exp);
  }
}