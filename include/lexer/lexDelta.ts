import type { TransFunc, ReservedMap } from "./lexTypes.js";

import { OTHER } from "./lexTypes.js";

// GENERATED BY src/generators/genlexer.py

export const DELTA_FUNC: TransFunc = {
  tok: {
    " ": { consume: false, nextState: "tok" },
    "\t": { consume: false, nextState: "tok" },
    "\n": { consume: false, nextState: "tok" },
    "(": { consume: true, retVal: "LPAREN" },
    ")": { consume: true, retVal: "RPAREN" },
    "{": { consume: true, retVal: "LBRACE" },
    "}": { consume: true, retVal: "RBRACE" },
    "~": { consume: true, retVal: "TILDE" },
    ";": { consume: true, retVal: "SEMICOLON" },
    "+": { consume: true, nextState: "plus" },
    "-": { consume: true, nextState: "minus" },
    "/": { consume: true, nextState: "slash" },
    "%": { consume: true, nextState: "mod" },
    "^": { consume: true, nextState: "caret" },
    "*": { consume: true, nextState: "star" },
    "!": { consume: true, nextState: "exclam" },
    "<": { consume: true, nextState: "langle" },
    ">": { consume: true, nextState: "rangle" },
    "=": { consume: true, nextState: "eq" },
    "&": { consume: true, nextState: "amper" },
    "|": { consume: true, nextState: "pipe" },
    "0": { consume: true, nextState: "num0" },
    "2": { consume: true, nextState: "num1" },
    "8": { consume: true, nextState: "num1" },
    "3": { consume: true, nextState: "num1" },
    "7": { consume: true, nextState: "num1" },
    "4": { consume: true, nextState: "num1" },
    "5": { consume: true, nextState: "num1" },
    "1": { consume: true, nextState: "num1" },
    "6": { consume: true, nextState: "num1" },
    "9": { consume: true, nextState: "num1" },
    ".": { consume: true, nextState: "float" },
    "U": { consume: true, nextState: "ident" },
    "D": { consume: true, nextState: "ident" },
    "_": { consume: true, nextState: "ident" },
    "l": { consume: true, nextState: "ident" },
    "R": { consume: true, nextState: "ident" },
    "b": { consume: true, nextState: "ident" },
    "w": { consume: true, nextState: "ident" },
    "X": { consume: true, nextState: "ident" },
    "k": { consume: true, nextState: "ident" },
    "Q": { consume: true, nextState: "ident" },
    "Z": { consume: true, nextState: "ident" },
    "y": { consume: true, nextState: "ident" },
    "G": { consume: true, nextState: "ident" },
    "i": { consume: true, nextState: "ident" },
    "q": { consume: true, nextState: "ident" },
    "j": { consume: true, nextState: "ident" },
    "C": { consume: true, nextState: "ident" },
    "f": { consume: true, nextState: "ident" },
    "B": { consume: true, nextState: "ident" },
    "v": { consume: true, nextState: "ident" },
    "P": { consume: true, nextState: "ident" },
    "c": { consume: true, nextState: "ident" },
    "z": { consume: true, nextState: "ident" },
    "S": { consume: true, nextState: "ident" },
    "g": { consume: true, nextState: "ident" },
    "T": { consume: true, nextState: "ident" },
    "s": { consume: true, nextState: "ident" },
    "h": { consume: true, nextState: "ident" },
    "p": { consume: true, nextState: "ident" },
    "n": { consume: true, nextState: "ident" },
    "J": { consume: true, nextState: "ident" },
    "M": { consume: true, nextState: "ident" },
    "o": { consume: true, nextState: "ident" },
    "d": { consume: true, nextState: "ident" },
    "e": { consume: true, nextState: "ident" },
    "t": { consume: true, nextState: "ident" },
    "W": { consume: true, nextState: "ident" },
    "L": { consume: true, nextState: "ident" },
    "r": { consume: true, nextState: "ident" },
    "x": { consume: true, nextState: "ident" },
    "m": { consume: true, nextState: "ident" },
    "u": { consume: true, nextState: "ident" },
    "O": { consume: true, nextState: "ident" },
    "E": { consume: true, nextState: "ident" },
    "I": { consume: true, nextState: "ident" },
    "N": { consume: true, nextState: "ident" },
    "A": { consume: true, nextState: "ident" },
    "H": { consume: true, nextState: "ident" },
    "Y": { consume: true, nextState: "ident" },
    "a": { consume: true, nextState: "ident" },
    "F": { consume: true, nextState: "ident" },
    "V": { consume: true, nextState: "ident" },
    "K": { consume: true, nextState: "ident" },
    [OTHER]: { consume: false, retVal: "ERROR" },
  },
  plus: {
    "+": { consume: true, retVal: "PLUS2" },
    "=": { consume: true, retVal: "PLUS_EQ" },
    [OTHER]: { consume: false, retVal: "PLUS1" },
  },
  minus: {
    "-": { consume: true, retVal: "MINUS2" },
    "=": { consume: true, retVal: "MINUS_EQ" },
    [OTHER]: { consume: false, retVal: "MINUS1" },
  },
  slash: {
    "=": { consume: true, retVal: "SLASH_EQ" },
    "/": { consume: true, nextState: "comment" },
    "*": { consume: true, nextState: "multicmt" },
    [OTHER]: { consume: false, retVal: "SLASH" },
  },
  mod: {
    "=": { consume: true, retVal: "MOD_EQ" },
    [OTHER]: { consume: false, retVal: "MODULO" },
  },
  caret: {
    "=": { consume: true, retVal: "CARET_EQ" },
    [OTHER]: { consume: false, retVal: "CARET" },
  },
  star: {
    "*": { consume: true, nextState: "star2" },
    "=": { consume: true, retVal: "STAR1_EQ" },
    [OTHER]: { consume: false, retVal: "STAR1" },
  },
  star2: {
    "=": { consume: true, retVal: "STAR2_EQ" },
    [OTHER]: { consume: false, retVal: "STAR2" },
  },
  exclam: {
    "=": { consume: true, retVal: "EXCLAM_EQ" },
    [OTHER]: { consume: false, retVal: "EXCLAM" },
  },
  langle: {
    "=": { consume: true, retVal: "LANGLE1_EQ" },
    "<": { consume: true, nextState: "langle2" },
    [OTHER]: { consume: false, retVal: "LANGLE1" },
  },
  langle2: {
    "=": { consume: true, retVal: "LANGLE2_EQ" },
    [OTHER]: { consume: false, retVal: "LANGLE2" },
  },
  rangle: {
    "=": { consume: true, retVal: "RANGLE1_EQ" },
    ">": { consume: true, nextState: "rangle2" },
    [OTHER]: { consume: false, retVal: "RANGLE1" },
  },
  rangle2: {
    "=": { consume: true, retVal: "RANGLE2_EQ" },
    [OTHER]: { consume: false, retVal: "RANGLE2" },
  },
  eq: {
    "=": { consume: true, retVal: "EQ2" },
    [OTHER]: { consume: false, retVal: "EQ1" },
  },
  amper: {
    "&": { consume: true, retVal: "AMPER2" },
    "=": { consume: true, retVal: "AMPER_EQ" },
    [OTHER]: { consume: false, retVal: "AMPER1" },
  },
  pipe: {
    "|": { consume: true, retVal: "PIPE2" },
    "=": { consume: true, retVal: "PIPE_EQ" },
    [OTHER]: { consume: false, retVal: "PIPE1" },
  },
  num0: {
    "2": { consume: false, retVal: "ERROR" },
    "0": { consume: false, retVal: "ERROR" },
    "8": { consume: false, retVal: "ERROR" },
    "3": { consume: false, retVal: "ERROR" },
    "7": { consume: false, retVal: "ERROR" },
    "4": { consume: false, retVal: "ERROR" },
    "1": { consume: false, retVal: "ERROR" },
    "5": { consume: false, retVal: "ERROR" },
    "6": { consume: false, retVal: "ERROR" },
    "9": { consume: false, retVal: "ERROR" },
    ".": { consume: true, nextState: "end_float" },
    [OTHER]: { consume: false, retVal: "NUMBER" },
  },
  num1: {
    "2": { consume: true, nextState: "num1" },
    "0": { consume: true, nextState: "num1" },
    "8": { consume: true, nextState: "num1" },
    "3": { consume: true, nextState: "num1" },
    "7": { consume: true, nextState: "num1" },
    "4": { consume: true, nextState: "num1" },
    "1": { consume: true, nextState: "num1" },
    "5": { consume: true, nextState: "num1" },
    "6": { consume: true, nextState: "num1" },
    "9": { consume: true, nextState: "num1" },
    ".": { consume: true, nextState: "end_float" },
    [OTHER]: { consume: false, retVal: "NUMBER" },
  },
  float: {
    "2": { consume: true, nextState: "end_float" },
    "0": { consume: true, nextState: "end_float" },
    "8": { consume: true, nextState: "end_float" },
    "3": { consume: true, nextState: "end_float" },
    "7": { consume: true, nextState: "end_float" },
    "4": { consume: true, nextState: "end_float" },
    "1": { consume: true, nextState: "end_float" },
    "5": { consume: true, nextState: "end_float" },
    "6": { consume: true, nextState: "end_float" },
    "9": { consume: true, nextState: "end_float" },
    [OTHER]: { consume: false, retVal: "ERROR" },
  },
  end_float: {
    "2": { consume: true, nextState: "end_float" },
    "0": { consume: true, nextState: "end_float" },
    "8": { consume: true, nextState: "end_float" },
    "3": { consume: true, nextState: "end_float" },
    "7": { consume: true, nextState: "end_float" },
    "4": { consume: true, nextState: "end_float" },
    "1": { consume: true, nextState: "end_float" },
    "5": { consume: true, nextState: "end_float" },
    "6": { consume: true, nextState: "end_float" },
    "9": { consume: true, nextState: "end_float" },
    ".": { consume: false, retVal: "ERROR" },
    [OTHER]: { consume: false, retVal: "NUMBER" },
  },
  ident: {
    "U": { consume: true, nextState: "ident" },
    "D": { consume: true, nextState: "ident" },
    "_": { consume: true, nextState: "ident" },
    "l": { consume: true, nextState: "ident" },
    "R": { consume: true, nextState: "ident" },
    "4": { consume: true, nextState: "ident" },
    "b": { consume: true, nextState: "ident" },
    "w": { consume: true, nextState: "ident" },
    "X": { consume: true, nextState: "ident" },
    "5": { consume: true, nextState: "ident" },
    "k": { consume: true, nextState: "ident" },
    "Q": { consume: true, nextState: "ident" },
    "Z": { consume: true, nextState: "ident" },
    "y": { consume: true, nextState: "ident" },
    "G": { consume: true, nextState: "ident" },
    "9": { consume: true, nextState: "ident" },
    "i": { consume: true, nextState: "ident" },
    "q": { consume: true, nextState: "ident" },
    "0": { consume: true, nextState: "ident" },
    "j": { consume: true, nextState: "ident" },
    "8": { consume: true, nextState: "ident" },
    "C": { consume: true, nextState: "ident" },
    "f": { consume: true, nextState: "ident" },
    "B": { consume: true, nextState: "ident" },
    "v": { consume: true, nextState: "ident" },
    "P": { consume: true, nextState: "ident" },
    "c": { consume: true, nextState: "ident" },
    "z": { consume: true, nextState: "ident" },
    "S": { consume: true, nextState: "ident" },
    "g": { consume: true, nextState: "ident" },
    "T": { consume: true, nextState: "ident" },
    "s": { consume: true, nextState: "ident" },
    "h": { consume: true, nextState: "ident" },
    "p": { consume: true, nextState: "ident" },
    "n": { consume: true, nextState: "ident" },
    "J": { consume: true, nextState: "ident" },
    "2": { consume: true, nextState: "ident" },
    "M": { consume: true, nextState: "ident" },
    "o": { consume: true, nextState: "ident" },
    "3": { consume: true, nextState: "ident" },
    "7": { consume: true, nextState: "ident" },
    "d": { consume: true, nextState: "ident" },
    "e": { consume: true, nextState: "ident" },
    "t": { consume: true, nextState: "ident" },
    "W": { consume: true, nextState: "ident" },
    "L": { consume: true, nextState: "ident" },
    "r": { consume: true, nextState: "ident" },
    "x": { consume: true, nextState: "ident" },
    "m": { consume: true, nextState: "ident" },
    "u": { consume: true, nextState: "ident" },
    "O": { consume: true, nextState: "ident" },
    "E": { consume: true, nextState: "ident" },
    "I": { consume: true, nextState: "ident" },
    "N": { consume: true, nextState: "ident" },
    "1": { consume: true, nextState: "ident" },
    "A": { consume: true, nextState: "ident" },
    "H": { consume: true, nextState: "ident" },
    "Y": { consume: true, nextState: "ident" },
    "a": { consume: true, nextState: "ident" },
    "6": { consume: true, nextState: "ident" },
    "F": { consume: true, nextState: "ident" },
    "V": { consume: true, nextState: "ident" },
    "K": { consume: true, nextState: "ident" },
    [OTHER]: { consume: false, retVal: "IDENT" },
  },
  comment: {
    "\n": { consume: true, retVal: "COMMENT" },
    [OTHER]: { consume: true, nextState: "comment" },
  },
  multicmt: {
    "*": { consume: true, nextState: "end_multicmt" },
    [OTHER]: { consume: true, nextState: "multicmt" },
  },
  end_multicmt: {
    "*": { consume: true, nextState: "end_multicmt" },
    "/": { consume: true, retVal: "COMMENT" },
    [OTHER]: { consume: true, nextState: "multicmt" },
  },
};

export const RESERVED: ReservedMap = {
  "true": "TRUE_TOK",
  "false": "FALSE_TOK",
  "let": "LET_KW",
  "const": "CONST_KW",
  "if": "IF_KW",
  "else": "ELSE_KW",
  "while": "WHILE_KW",
};