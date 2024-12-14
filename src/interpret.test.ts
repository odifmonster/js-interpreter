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

describe("interpAugUnop", () => {
  it("throws the correct errors", () => {
    const state: State = {
      x: true, y: 5, z: { kind: "undefined" }
    };
    
    const exps = ["++(y*3)", "x--", "++z**2"];
    const errors = [
      "'PREINC' operation requires assignable expression.",
      "'POSTDEC' operation invalid for type 'boolean'.",
      "Variable 'z' referenced before assignment."
    ];

    [0, 1, 2].forEach(i =>
      expect(() => interpExpression(state, parse(exps[i]))).toThrow("SemanticError: " + errors[i])
    );
  });

  it("returns and updates in the correct order", () => {
    const state: State = { x: 5 };
    expect(interpExpression(state, parse("x++"))).toEqual(5);
    expect(state["x"]).toEqual(6);
    expect(interpExpression(state, parse("--x"))).toEqual(5);
    expect(state["x"]).toEqual(5);
  });
});

describe("interpAugBinop", () => {
  it("throws the correct errors", () => {
    const state: State = {
      x: true, y: 5, z: { kind: "undefined" }
    };

    const exps = ["val = false", "false = x", "x = z", "y += x"];
    const errors = [
      "Unknown identifier 'val'.",
      "'ASSIGN' operation requires assignable expression.",
      "Variable 'z' referenced before assignment.",
      "'AUGADD' operation invalid for types 'number' and 'boolean'."
    ];

    [0, 1, 2, 3].forEach(i =>
      expect(() => interpExpression(state, parse(exps[i]))).toThrow("SemanticError: " + errors[i])
    );
  });

  it("correctly updates the program state", () => {
    const state: State = { val: 3, x: 1, y: 2 };
    const endState: State = { val: 12, x: 2, y: 3 };

    expect(interpExpression(state, parse("val *= x++ + ++y"))).toEqual(12);
    expect(state).toEqual(endState);
  });
});