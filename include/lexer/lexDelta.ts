import type { TransFunc, ReservedMap } from "./lexTypes.js";

import { OTHER } from "./lexTypes.js";

// GENERATED BY src/generators/genlexer.py

export const DELTA_FUNC: TransFunc = {
  tok: {
    "\t": { consume: false, nextState: "tok" },
    "\n": { consume: false, nextState: "tok" },
    " ": { consume: false, nextState: "tok" },
    "(": { consume: true, retVal: "LPAREN" },
    ")": { consume: true, retVal: "RPAREN" },
    "+": { consume: true, retVal: "PLUS" },
    "-": { consume: true, retVal: "MINUS" },
    "/": { consume: true, retVal: "SLASH" },
    "%": { consume: true, retVal: "MODULO" },
    "*": { consume: true, nextState: "star" },
    "0": { consume: true, nextState: "num0" },
    "7": { consume: true, nextState: "num1" },
    "1": { consume: true, nextState: "num1" },
    "9": { consume: true, nextState: "num1" },
    "3": { consume: true, nextState: "num1" },
    "5": { consume: true, nextState: "num1" },
    "8": { consume: true, nextState: "num1" },
    "2": { consume: true, nextState: "num1" },
    "4": { consume: true, nextState: "num1" },
    "6": { consume: true, nextState: "num1" },
    ".": { consume: true, nextState: "float" },
    "e": { consume: true, nextState: "ident" },
    "O": { consume: true, nextState: "ident" },
    "N": { consume: true, nextState: "ident" },
    "m": { consume: true, nextState: "ident" },
    "A": { consume: true, nextState: "ident" },
    "q": { consume: true, nextState: "ident" },
    "H": { consume: true, nextState: "ident" },
    "h": { consume: true, nextState: "ident" },
    "v": { consume: true, nextState: "ident" },
    "J": { consume: true, nextState: "ident" },
    "V": { consume: true, nextState: "ident" },
    "Y": { consume: true, nextState: "ident" },
    "K": { consume: true, nextState: "ident" },
    "k": { consume: true, nextState: "ident" },
    "F": { consume: true, nextState: "ident" },
    "t": { consume: true, nextState: "ident" },
    "b": { consume: true, nextState: "ident" },
    "P": { consume: true, nextState: "ident" },
    "D": { consume: true, nextState: "ident" },
    "x": { consume: true, nextState: "ident" },
    "G": { consume: true, nextState: "ident" },
    "Q": { consume: true, nextState: "ident" },
    "r": { consume: true, nextState: "ident" },
    "u": { consume: true, nextState: "ident" },
    "X": { consume: true, nextState: "ident" },
    "y": { consume: true, nextState: "ident" },
    "j": { consume: true, nextState: "ident" },
    "R": { consume: true, nextState: "ident" },
    "p": { consume: true, nextState: "ident" },
    "S": { consume: true, nextState: "ident" },
    "w": { consume: true, nextState: "ident" },
    "B": { consume: true, nextState: "ident" },
    "g": { consume: true, nextState: "ident" },
    "z": { consume: true, nextState: "ident" },
    "U": { consume: true, nextState: "ident" },
    "s": { consume: true, nextState: "ident" },
    "n": { consume: true, nextState: "ident" },
    "C": { consume: true, nextState: "ident" },
    "Z": { consume: true, nextState: "ident" },
    "_": { consume: true, nextState: "ident" },
    "E": { consume: true, nextState: "ident" },
    "L": { consume: true, nextState: "ident" },
    "a": { consume: true, nextState: "ident" },
    "I": { consume: true, nextState: "ident" },
    "M": { consume: true, nextState: "ident" },
    "d": { consume: true, nextState: "ident" },
    "l": { consume: true, nextState: "ident" },
    "o": { consume: true, nextState: "ident" },
    "i": { consume: true, nextState: "ident" },
    "W": { consume: true, nextState: "ident" },
    "c": { consume: true, nextState: "ident" },
    "f": { consume: true, nextState: "ident" },
    "T": { consume: true, nextState: "ident" },
    [OTHER]: { consume: false, retVal: "ERROR" },
  },
  star: {
    "*": { consume: true, retVal: "STAR2" },
    [OTHER]: { consume: false, retVal: "STAR1" },
  },
  num0: {
    "7": { consume: false, retVal: "ERROR" },
    "1": { consume: false, retVal: "ERROR" },
    "9": { consume: false, retVal: "ERROR" },
    "0": { consume: false, retVal: "ERROR" },
    "3": { consume: false, retVal: "ERROR" },
    "5": { consume: false, retVal: "ERROR" },
    "8": { consume: false, retVal: "ERROR" },
    "2": { consume: false, retVal: "ERROR" },
    "4": { consume: false, retVal: "ERROR" },
    "6": { consume: false, retVal: "ERROR" },
    ".": { consume: true, nextState: "end_float" },
    [OTHER]: { consume: false, retVal: "NUMBER" },
  },
  num1: {
    "7": { consume: true, nextState: "num1" },
    "1": { consume: true, nextState: "num1" },
    "9": { consume: true, nextState: "num1" },
    "0": { consume: true, nextState: "num1" },
    "3": { consume: true, nextState: "num1" },
    "5": { consume: true, nextState: "num1" },
    "8": { consume: true, nextState: "num1" },
    "2": { consume: true, nextState: "num1" },
    "4": { consume: true, nextState: "num1" },
    "6": { consume: true, nextState: "num1" },
    ".": { consume: true, nextState: "end_float" },
    [OTHER]: { consume: false, retVal: "NUMBER" },
  },
  float: {
    "7": { consume: true, nextState: "end_float" },
    "1": { consume: true, nextState: "end_float" },
    "9": { consume: true, nextState: "end_float" },
    "0": { consume: true, nextState: "end_float" },
    "3": { consume: true, nextState: "end_float" },
    "5": { consume: true, nextState: "end_float" },
    "8": { consume: true, nextState: "end_float" },
    "2": { consume: true, nextState: "end_float" },
    "4": { consume: true, nextState: "end_float" },
    "6": { consume: true, nextState: "end_float" },
    [OTHER]: { consume: false, retVal: "ERROR" },
  },
  end_float: {
    "7": { consume: true, nextState: "end_float" },
    "1": { consume: true, nextState: "end_float" },
    "9": { consume: true, nextState: "end_float" },
    "0": { consume: true, nextState: "end_float" },
    "3": { consume: true, nextState: "end_float" },
    "5": { consume: true, nextState: "end_float" },
    "8": { consume: true, nextState: "end_float" },
    "2": { consume: true, nextState: "end_float" },
    "4": { consume: true, nextState: "end_float" },
    "6": { consume: true, nextState: "end_float" },
    ".": { consume: false, retVal: "ERROR" },
    [OTHER]: { consume: false, retVal: "NUMBER" },
  },
  ident: {
    "e": { consume: true, nextState: "ident" },
    "O": { consume: true, nextState: "ident" },
    "7": { consume: true, nextState: "ident" },
    "N": { consume: true, nextState: "ident" },
    "m": { consume: true, nextState: "ident" },
    "A": { consume: true, nextState: "ident" },
    "5": { consume: true, nextState: "ident" },
    "q": { consume: true, nextState: "ident" },
    "H": { consume: true, nextState: "ident" },
    "h": { consume: true, nextState: "ident" },
    "v": { consume: true, nextState: "ident" },
    "J": { consume: true, nextState: "ident" },
    "V": { consume: true, nextState: "ident" },
    "Y": { consume: true, nextState: "ident" },
    "K": { consume: true, nextState: "ident" },
    "k": { consume: true, nextState: "ident" },
    "F": { consume: true, nextState: "ident" },
    "4": { consume: true, nextState: "ident" },
    "t": { consume: true, nextState: "ident" },
    "b": { consume: true, nextState: "ident" },
    "P": { consume: true, nextState: "ident" },
    "D": { consume: true, nextState: "ident" },
    "x": { consume: true, nextState: "ident" },
    "G": { consume: true, nextState: "ident" },
    "8": { consume: true, nextState: "ident" },
    "2": { consume: true, nextState: "ident" },
    "Q": { consume: true, nextState: "ident" },
    "r": { consume: true, nextState: "ident" },
    "6": { consume: true, nextState: "ident" },
    "u": { consume: true, nextState: "ident" },
    "X": { consume: true, nextState: "ident" },
    "y": { consume: true, nextState: "ident" },
    "3": { consume: true, nextState: "ident" },
    "j": { consume: true, nextState: "ident" },
    "R": { consume: true, nextState: "ident" },
    "p": { consume: true, nextState: "ident" },
    "S": { consume: true, nextState: "ident" },
    "9": { consume: true, nextState: "ident" },
    "w": { consume: true, nextState: "ident" },
    "B": { consume: true, nextState: "ident" },
    "g": { consume: true, nextState: "ident" },
    "z": { consume: true, nextState: "ident" },
    "U": { consume: true, nextState: "ident" },
    "s": { consume: true, nextState: "ident" },
    "n": { consume: true, nextState: "ident" },
    "C": { consume: true, nextState: "ident" },
    "Z": { consume: true, nextState: "ident" },
    "_": { consume: true, nextState: "ident" },
    "1": { consume: true, nextState: "ident" },
    "E": { consume: true, nextState: "ident" },
    "L": { consume: true, nextState: "ident" },
    "a": { consume: true, nextState: "ident" },
    "I": { consume: true, nextState: "ident" },
    "M": { consume: true, nextState: "ident" },
    "d": { consume: true, nextState: "ident" },
    "l": { consume: true, nextState: "ident" },
    "0": { consume: true, nextState: "ident" },
    "o": { consume: true, nextState: "ident" },
    "i": { consume: true, nextState: "ident" },
    "W": { consume: true, nextState: "ident" },
    "c": { consume: true, nextState: "ident" },
    "f": { consume: true, nextState: "ident" },
    "T": { consume: true, nextState: "ident" },
    [OTHER]: { consume: false, retVal: "IDENT" },
  },
};

export const RESERVED: ReservedMap = {
};