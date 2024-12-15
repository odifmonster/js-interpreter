import type {
  Statement, Expression,
  Unop, Binop, AugUnop, AugBinop
} from "../include/parser/parseTypes.js";

// TYPES AND CONSTANTS

export const PARENT_KEY = Symbol("[[PARENT]]");
const FUNC_KEY = Symbol("[[FUNC]]");

type ExpValue = number | boolean
    | { kind: "func"; pScope: State; params: string[]; body: Statement[]; }
    | { kind: "null"; };

export type VarValue = {
  initKind: "let" | "const";
  value: ExpValue | { kind: "initialized" } | { kind: "undefined" };
};

export type State = { [key: string]: VarValue; [PARENT_KEY]?: State; [FUNC_KEY]?: boolean; };

// ERROR MESSAGES

const getVarType: (val: ExpValue) => string =
  val => typeof val === "object" ? val.kind : typeof val;

const unopBadType: (op: Unop | AugUnop, val: ExpValue) => Error = (op, val) =>
  new Error(`SemanticError: '${op}' operation invalid for type '${getVarType(val)}'.`);

const binopBadType: (op: Binop | AugBinop, v1: ExpValue, v2: ExpValue) => Error = (op, v1, v2) =>
  new Error(`SemanticError: '${op}' operation invalid for types '${getVarType(v1)}' and '${getVarType(v2)}'.`);

const opRequiresLVal: (op: AugUnop | AugBinop) => Error = (op) =>
  new Error(`SemanticError: '${op}' operation requires assignable expression.`);

const modifiedConst: (name: string) => Error = name =>
  new Error(`SemanticError: Cannot modify constant '${name}'.`);

// SCOPING AND PROGRAM STATE FUNCTIONS

/**
 * Gets the immediate state/scope containing the target variable. Returns the global scope
 * on failure.
 * @param state The current state from which to start searching
 * @param name The name of the variable
 * @returns The scope containing the variable or the global scope if not found
 */
function getVarScope(state: State, name: string): State {
  if (!(PARENT_KEY in state) || name in state) return state;
  return getVarScope(state[PARENT_KEY], name);
}

/**
 * Gets the value of the target variable from the program state.
 * @param state The current program state
 * @param name The name of the variable
 * @returns The value stored in the target variable.
 * @throws An error if the variable is not accessible from the current state
 * or if it has not been assigned a value.
 */
function getVarValue(state: State, name: string): ExpValue {
  const varScope = getVarScope(state, name);
  if (!(name in varScope)) throw new Error(`SemanticError: Unknown identifier '${name}'.`);
  const varVal = varScope[name].value;
  if (typeof varVal === "object" && (varVal.kind === "undefined" || varVal.kind === "initialized"))
    throw new Error(`SemanticError: Variable '${name}' referenced before assignment.`);
  return varVal;
}

/**
 * Checks whether the program is currently inside a function execution context.
 * @param state The current program state
 * @returns true if the program is inside a function call and false otherwise.
 */
function isInFunction(state: State): boolean {
  if (!(PARENT_KEY in state)) return false;
  if (FUNC_KEY in state) return true;
  return isInFunction(state[PARENT_KEY]);
}

// Interpret unary operator expressions for numbers
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

// Interpret unary operator expressions that update a value in memory
function interpAugUnop(state: State, exp: Expression): ExpValue {
  if (exp.kind !== "augunop") throw new Error(); // Incorrect use of this function
  if (exp.child.kind !== "ident") // throw an error if the left side does not refer to
    throw opRequiresLVal(exp.op); // a location in memory

  const varScope = getVarScope(state, exp.child.name);
  const startVal = interpExpression(state, exp.child);
  if (typeof startVal !== "number") throw unopBadType(exp.op, startVal); // these operators are only valid for numbers
  if (varScope[exp.child.name].initKind === "const") throw modifiedConst(exp.child.name);

  switch (exp.op) {
    case "POSTINC":
      varScope[exp.child.name].value = startVal + 1;
      return startVal;
    case "POSTDEC":
      varScope[exp.child.name].value = startVal - 1;
      return startVal;
    case "PREINC":
      return varScope[exp.child.name].value = startVal + 1;
    case "PREDEC":
      return varScope[exp.child.name].value = startVal - 1;
  }
}

// interpret unary operators that don't require type checking
function interpUnop(state: State, unop: Expression): ExpValue {
  if (unop.kind !== "unop") throw new Error();

  let val = interpExpression(state, unop.child);
  if (typeof val === "object" && val.kind === "null") val = false;

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

// interpret binary operators that update locations in memory
function interpAugBinop(state: State, exp: Expression): ExpValue {
  if (exp.kind !== "augbinop") throw new Error();
  if (exp.left.kind !== "ident") throw opRequiresLVal(exp.op);

  const varScope = getVarScope(state, exp.left.name);
  const rval = interpExpression(state, exp.right);

  if (!(exp.left.name in varScope)) throw new Error(`SemanticError: Unknown identifier '${exp.left.name}'.`);
  if (varScope[exp.left.name].initKind === "const") throw modifiedConst(exp.left.name);

  if (exp.op === "ASSIGN") { // no type checking for assignment
    return varScope[exp.left.name].value = rval;
  }

  const lval = interpExpression(state, exp.left);
  if (!(typeof lval === "number" && typeof rval === "number"))
    throw binopBadType(exp.op, lval, rval); // all other operators require numbers

  let newVal: number;

  switch (exp.op) {
    case "AUGEXPN":
      newVal = lval ** rval;
      break;
    case "AUGMULT":
      newVal = lval * rval;
      break;
    case "AUGDIV": newVal = lval / rval; break;
    case "AUGMOD": newVal = lval % rval; break;
    case "AUGADD": newVal = lval + rval; break;
    case "AUGSUB": newVal = lval - rval; break;
    case "AUGLSHIFT": newVal = lval << rval; break;
    case "AUGRSHIFT": newVal = lval >> rval; break;
    case "AUGBAND": newVal = lval & rval; break;
    case "AUGBXOR": newVal = lval ^ rval; break;
    case "AUGBOR": newVal = lval | rval; break;
  }

  return varScope[exp.left.name].value = newVal;
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

function interpFuncExp(state: State, exp: Expression): ExpValue {
  if (exp.kind !== "func") throw new Error();

  const prmCounts: Record<string, number> = {};
  exp.params.forEach(prm => {
    if (prm in prmCounts) throw new Error(`SemanticError: Function expression has duplicate parameter '${prm}'.`);
    prmCounts[prm] = 1;
  });

  return {
    kind: "func", pScope: state, params: exp.params, body: exp.body
  };
}

function interpCallExp(state: State, exp: Expression): ExpValue {
  if (exp.kind !== "call") throw new Error();

  if (exp.callee.kind === "ident" && exp.callee.name === "print") { // special case for printing
    const args = exp.args.map(arg => interpExpression(state, arg))
        .map(v => typeof v === "object" ? v.kind === "func" ? "<func>" : "null" : v );
    console.log(...args);
    return { kind: "null" };
  }

  const callee = interpExpression(state, exp.callee);
  if (!(typeof callee === "object" && callee.kind === "func"))
    throw new Error(`SemanticError: Attempted to call a non-function value.`);

  if (callee.params.length !== exp.args.length) {
    const adj = exp.args.length < callee.params.length ? "few" : "many";
    throw new Error(`SemanticError: Call expression has too ${adj} arguments (expected ${callee.params.length}).`);
  }

  const funcState: State = {
    [PARENT_KEY]: callee.pScope, [FUNC_KEY]: true
  };

  exp.args.forEach((arg, i) => {
    const argVal = interpExpression(state, arg);
    funcState[callee.params[i]] = { initKind: "let", value: argVal };
  });
  
  const retVal = interpBlock(funcState, { kind: "block", body: callee.body });

  return retVal === undefined ? { kind: "null" } : retVal;
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
    case "augunop":
      return interpAugUnop(state, exp);
    case "binop":
      return interpBinop(state, exp);
    case "augbinop":
      return interpAugBinop(state, exp);
    case "func":
      return interpFuncExp(state, exp);
    case "call":
      return interpCallExp(state, exp);
  }
}

function interpInitVar(state: State, stmt: Statement): void {
  if (!(stmt.kind === "let" || stmt.kind === "const")) throw new Error();
  if (!(stmt.name in state)) throw new Error();

  const varVal = state[stmt.name].value;
  if (!(typeof varVal === "object" && varVal.kind === "undefined"))
    throw new Error(`SemanticError: Variable '${stmt.name}' already initialized.`);

  state[stmt.name].value = interpExpression(state, stmt.value);
}

function interpBlock(state: State, stmt: Statement): ExpValue | undefined {
  if (stmt.kind !== "block") throw new Error();

  stmt.body.forEach(s => {
    if ((s.kind === "let" || s.kind === "const") && !(s.name in state)) {
      state[s.name] = { initKind: s.kind, value: { kind: "undefined" } };
    }
  }); // initial traversal to 'hoist' all variable declarations

  return stmt.body.reduce((acc: ExpValue | undefined, s) => {
    if (acc === undefined) {
      return interpStatement(state, s);
    }
    return acc; // do not evaluate anything after a return
  }, undefined);
}

function interpWhile(state: State, stmt: Statement): ExpValue | undefined {
  if (stmt.kind !== "while") throw new Error();

  const testVal = interpExpression(state, stmt.test);
  if (testVal) {
    interpStatement(state, stmt.body);
    const retVal = interpWhile(state, stmt);
    if (retVal !== undefined) return retVal; // do not evaluate after return
    return interpWhile(state, stmt);
  }

  return undefined;
}

export function interpStatement(state: State, stmt: Statement): ExpValue | undefined {
  switch (stmt.kind) {
    case "empty":
      return undefined;
    case "exp":
      interpExpression(state, stmt.exp);
      return undefined;
    case "let":
    case "const":
      interpInitVar(state, stmt);
      return undefined;
    case "block":
      return interpBlock({ [PARENT_KEY]: state }, stmt);
    case "if":
      if (interpExpression(state, stmt.test)) {
        return interpStatement(state, stmt.truePart);
      }
      return interpStatement(state, stmt.falsePart);
    case "while":
      return interpWhile(state, stmt);
    case "return":
      if (!isInFunction(state))
        throw new Error(`SemanticError: Cannot return outside of function contexts.`);
      return interpExpression(state, stmt.exp);
  }
}

export function interpProgram(prog: Statement[]): State {
  const globalState: State = {};
  interpBlock(globalState, { kind: "block", body: prog });
  return globalState;
}