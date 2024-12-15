import type { Statement } from "../include/parser/parseTypes.js";

import { parseFile } from "../include/parser/parser.js";
import { interpProgram } from "./interpret.js";

const progAST: Statement[] = parseFile("./src/programs/firstFunctions.js") as Statement[];

interpProgram(progAST);