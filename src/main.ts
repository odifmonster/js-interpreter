import type { Statement } from "../include/parser/parseTypes.js";

import { parseFile } from "../include/parser/parser.js";

const progAST: Statement[] = parseFile("./src/programs/firstFunction.js") as Statement[];

console.log(JSON.stringify(progAST, undefined, 2));
