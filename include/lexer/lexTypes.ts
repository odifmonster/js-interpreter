export const OTHER = Symbol("[[OTHER]]");

export type TransVal = {
  consume: boolean;
  nextState?: LexerState;
  retVal?: TokenKind;
};

export type TransFunc = {
  [key in LexerState]: {
    [key: string]: TransVal;
    [OTHER]: TransVal;
  };
};

export type ReservedMap = Record<string, TokenKind>;

export type Token = { kind: TokenKind; value: string; };

// GENERATED BY src/generators/genlexer.py

export type LexerState = "eq" | "exclam" | "end_float" | "pipe" | "star"
    | "amper" | "ident" | "rangle" | "num1" | "float"
    | "tok" | "langle" | "num0";

export type TokenKind = "EXCLAM" | "PIPE2" | "EXCLAM_EQ" | "AMPER2" | "RANGLE2"
    | "MINUS" | "ERROR" | "PLUS" | "PIPE1" | "TILDE"
    | "LPAREN" | "START" | "FALSE_TOK" | "RPAREN" | "CARET"
    | "STAR2" | "RANGLE1" | "LANGLE2" | "MODULO" | "LANGLE_EQ"
    | "IDENT" | "STAR1" | "LANGLE1" | "AMPER1" | "RANGLE_EQ"
    | "EQ2" | "SLASH" | "TRUE_TOK" | "NUMBER";