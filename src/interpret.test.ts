import type { Statement } from "../include/parser/parseTypes.js";
import type { State } from "./interpret.js";

import { parseFile } from "../include/parser/parser.js";
import { interpProgram } from "./interpret.js";

describe("interpProgram", () => {
  it("can handle conditional branching", () => {
    const prog = parseFile("./src/programs/basicProgram.js") as Statement[];
    const targetState: State = {
      n: { initKind: "let", value: 1 },
      res: { initKind: "let", value: 3628800 }
    };

    expect(interpProgram(prog)).toEqual(targetState);
  });

  it("throws errors on reassignments of constants", () => {
    const prog = parseFile("./src/programs/letAndConst.js") as Statement[];
    expect(() => interpProgram(prog)).toThrow("SemanticError: Cannot modify constant 'y'.");
  });

  it("does block scoping", () => {
    const prog = parseFile("./src/programs/blockScoping.js") as Statement[];
    expect(interpProgram(prog)).toEqual({
      x: { initKind: "let", value: 500 },
      y: { initKind: "let", value: true }
    });
  });
});