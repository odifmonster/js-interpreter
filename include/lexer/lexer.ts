import type { Stream } from "../stream.js";
import type { Reader } from "../reader.js";
import type {
  LexerState, Token, TransVal
} from "./lexTypes.js";

import { snode, sempty } from "../stream.js";
import { OTHER } from "./lexTypes.js";
import { DELTA_FUNC } from "./lexDelta.js";

function getNextToken(src: Reader, state: LexerState, value: string): Token {
  const subDelta = DELTA_FUNC[state];

  let c: string | undefined = undefined;
  if (!src.isEnded()) c = src.read();

  let transVal: TransVal;
  if (c !== undefined && c in subDelta) transVal = subDelta[c];
  else transVal = subDelta[OTHER];

  c = c === undefined ? "" : c;
  if (transVal.consume) value = value + c;

  if ("retVal" in transVal) {
    if (transVal.retVal === "ERROR")
      throw new Error("LexicalError: Something bad happened.");
    if (!(transVal.consume || src.isEnded())) src.seek(-1, "CUR");
    return { kind: transVal.retVal, value: value };
  } else if ("nextState" in transVal) {
    return getNextToken(src, transVal.nextState, value);
  } else {
    throw new Error("FATAL: Encountered bad transition function value.");
  }
}

export function mkTokenStream(src: Reader): Stream<Token> {
  function mkTokenStream2(last: Token): Stream<Token> {
    if (src.isEnded()) return snode(last, () => sempty());
    return snode(last, () => mkTokenStream2(getNextToken(src, "tok", "")));
  }

  return mkTokenStream2({ kind: "START", value: "SOS" });
}