import type { Expression } from "../include/parser/parseTypes.js";
import type { State } from "./interpret.js";

import { parseString, parseFile } from "../include/parser/parser.js";
import { interpExpression, PARENT_KEY } from "./interpret.js";

function parse(val: string): Expression {
  let ast: Expression;

  if (val.slice(-3) === ".js") {
    ast = parseFile(val) as Expression;
  } else {
    ast = parseString(val) as Expression;
  }

  return ast;
}

describe("getVarValue", () => {
  it("throws an error when a variable is inaccessible or undefined", () => {
    const state: State = { var1: { kind: "undefined" } };
    const ast1 = parse("x");
    const ast2 = parse("var1");

    expect(() => interpExpression(state, ast1)).toThrow("SemanticError: Unknown identifier 'x'.");
    expect(() => interpExpression(state, ast2)).toThrow("SemanticError: Variable 'var1' referenced before assignment.");
  });

  it("retrieves the correct value from the program state", () => {
    const state: State = {
      [PARENT_KEY]: { x: 4, y: { kind: "undefined" } },
      y: 10,
    };

    const ast1 = parse("x");
    const ast2 = parse("y");
    expect(interpExpression(state, ast1)).toEqual(4);
    expect(interpExpression(state, ast2)).toEqual(10);
  });
});

describe("interpNumBinop", () => {
  it("correctly interprets an expression with constants", () => {
    const ast = parse("(5+2)**2");
    console.log(interpExpression({}, ast));
    expect(interpExpression({}, ast)).toEqual(49);
  });

  it("correctly interprets an expression with variables", () => {
    const state: State = {
      [PARENT_KEY]: { var1: 5, var2: { kind: "undefined" } },
      var2: 3,
      x: 4,
      y: 2,
    };
    const ast = parse("(var1**y)*x-var2");
    expect(interpExpression(state, ast)).toEqual(97);
  });
});

describe("interpUnop", () => {
  it("throws the correct type error when necessary", () => {
    const state: State = { x: true };
    expect(() => interpExpression(state, parse("+x"))).toThrow("SemanticError: 'POS' operation invalid for type 'boolean'.")
  });

  it("correctly evaluates unary operator expressions", () => {
    expect(interpExpression({}, parse("-(6**2)"))).toEqual(-36);
    expect(interpExpression({}, parse("!(6 > 5)"))).toEqual(false);
  });
});

describe("interpBinop", () => {
  it("throws the correct type error when necessary", () => {
    expect(() => interpExpression({}, parse("5 + true"))).toThrow("SemanticError: 'ADD' operation invalid for types 'number' and 'boolean'.")
  });

  it("does short-circuit evaluation", () => {
    expect(interpExpression({}, parse("true || ((x ** 2 >= 36 || +y < 0) && (z - (z % 2)) / 2 == -someVar)"))).toEqual(true);
  });

  it("correctly evaluates all non-assignment operations", () => {
    const state: State = {
      x: 2, y: -6, z: -7, someVar: -3
    };
    expect(interpExpression(state, parse("(x ** 2 >= 36 || +y < 0) && (z - (z % 2)) / 2 == -someVar"))).toEqual(false);
  });
});