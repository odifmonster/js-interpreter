import type { Expression } from "../include/parser/parseTypes.js";
import type { State } from "./interpret.js";

import { parseString, parseFile } from "../include/parser/parser.js";
import { interpExpression, PARENT_KEY } from "./interpret.js";

type Parsable = { kind: "string"; value: string; }
    | { kind: "file"; path: string; }

function parse(val: Parsable): Expression {
  let ast: Expression;

  if (val.kind == "string") {
    ast = parseString(val.value) as Expression;
  } else {
    ast = parseFile(val.path) as Expression;
  }

  return ast;
}

describe("getVarValue", () => {
  it("throws an error when a variable is inaccessible or undefined", () => {
    const state: State = { var1: { kind: "undefined" } };
    const ast1 = parse({ kind: "string", value: "x+5" });
    const ast2 = parse({ kind: "string", value: "var1**2" });

    expect(() => interpExpression(state, ast1)).toThrow("SemanticError: Unknown identifier 'x'.");
    expect(() => interpExpression(state, ast2)).toThrow("SemanticError: Variable 'var1' referenced before assignment.");
  });

  it("retrieves the correct value from the program state", () => {
    const state: State = {
      [PARENT_KEY]: { x: 4, y: { kind: "undefined" } },
      y: 10
    };

    const ast1 = parse({ kind: "string", value: "x" });
    const ast2 = parse({ kind: "string", value: "y" });
    expect(interpExpression(state, ast1)).toEqual(4);
    expect(interpExpression(state, ast2)).toEqual(10);
  });
});

describe("interpNumBinop", () => {
  it("correctly interprets an expression with constants", () => {
    const ast = parse({ kind: "string", value: "(5+2)**2" });
    console.log(interpExpression({}, ast));
    expect(interpExpression({}, ast)).toEqual(49);
  });

  it("correctly interprets an expression with variables", () => {
    const state: State = {
      [PARENT_KEY]: { var1: 5, var2: { kind: "undefined" } },
      var2: 3, x: 4, y: 2
    };
    const ast = parse({ kind: "string", value: "(var1**y)*x-var2" });
    expect(interpExpression(state, ast)).toEqual(97);
  });
});