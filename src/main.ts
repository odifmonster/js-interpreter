import type { Stream } from "../include/stream.js";
import type { Token } from "../include/lexer/lexTypes.js";

import { readerFromFile } from "../include/reader.js";
import { mkTokenStream } from "../include/lexer/lexer.js";

function printTokStream(s: Stream<Token>): void {
  while (!s.isEmpty()) {
    console.log(s.head());
    s = s.tail();
  }
}

const tstream: Stream<Token> = mkTokenStream(readerFromFile("./src/programs/numberOps.js"));
printTokStream(tstream);