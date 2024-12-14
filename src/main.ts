import type { Expression } from "../include/parser/parseTypes.js";

import { parseFile } from "../include/parser/parser.js";

const progAST: Expression = parseFile("./src/programs/assignOps.js") as Expression;

console.log(JSON.stringify(progAST, undefined, 2));
