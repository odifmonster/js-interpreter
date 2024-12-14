import { readerFromContent, readerFromFile } from "../reader.js";
import { mkTokenStream } from "../lexer/lexer.js";
import { GRAMMAR } from "./parseDelta.js";

function matchPreTerm(tokStrm, ptRule) {
  if (tokStrm.isEmpty() || tokStrm.head().kind !== ptRule.token) return [tokStrm, undefined];
  return [tokStrm.tail(), ptRule.action(tokStrm.head())];
}

function matchOptional(tokStrm, optRule) {
  let tempStrm = tokStrm, res = [], tree = undefined;

  for (let i = 0; i < optRule.symbols.length; ++i) {
    [tempStrm, tree] = matchSymbol(tempStrm, optRule.symbols[i]);
    if (tree === undefined) return [tokStrm, []];
    else res.push(tree);
  }

  return [tempStrm, res];
}

function matchStar(tokStrm, starRule) {
  let resAll = [];
  let res = undefined
  while (res === undefined || res.length > 0) {
    [tokStrm, res] = matchOptional(tokStrm, starRule);
    resAll = resAll.concat(res);
  }
  return [tokStrm, resAll];
}

function matchNonTerm(tokStrm, ntRule) {
  let tempStrm = tokStrm, resAll = [], res = [], tree = undefined;

  for (let i = 0; i < ntRule.rule.length; ++i) {
    const item = ntRule.rule[i];
    if (typeof item === "string") {
      [tempStrm, tree] = matchSymbol(tempStrm, item);
      if (tree === undefined) return [tokStrm, undefined];
      resAll.push(tree);
    } else {
      if (item.kind === "opt") {
        [tempStrm, res] = matchOptional(tempStrm, item);
      } else {
        [tempStrm, res] = matchStar(tempStrm, item);
      }
      resAll = resAll.concat(res);
    }
  }

  return [tempStrm, ntRule.action(resAll)];
}

function matchSymbol(tokStrm, symbol) {
  for (let i = 0; i < GRAMMAR[symbol].length; ++i) {
    const rule = GRAMMAR[symbol][i];
    let tempStrm, tree;
    if ("token" in rule) {
      [tempStrm, tree] = matchPreTerm(tokStrm, rule);
    } else {
      [tempStrm, tree] = matchNonTerm(tokStrm, rule);
    }
    if (tree !== undefined) return [tempStrm, tree];
  }

  return [tokStrm, undefined];
}

function parse(stream) {
  const [newStream, tree] = matchSymbol(stream.tail(), "logor_e");
  if (tree === undefined || !newStream.isEmpty()) throw new Error("SyntacticError: Something bad happened.");
  return tree;
}

export function parseString(exp) {
  return parse(mkTokenStream(readerFromContent(exp)));
}

export function parseFile(path) {
  return parse(mkTokenStream(readerFromFile(path)));
}