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

export type LexerState = "end_multicmt" | "amper" | "num0" | "end_float" | "caret"
    | "comment" | "minus" | "langle" | "rangle" | "ident"
    | "pipe" | "exclam" | "rangle2" | "float" | "tok"
    | "star" | "langle2" | "eq" | "num1" | "slash"
    | "mod" | "plus" | "multicmt" | "star2";

export type TokenKind = "LANGLE1_EQ" | "FALSE_TOK" | "MINUS1" | "CONST_KW" | "IDENT"
    | "EXCLAM_EQ" | "PIPE2" | "RANGLE1_EQ" | "MINUS_EQ" | "MODULO"
    | "RANGLE2_EQ" | "LANGLE2" | "AMPER2" | "PLUS2" | "EXCLAM"
    | "WHILE_KW" | "PIPE_EQ" | "MOD_EQ" | "AMPER1" | "PIPE1"
    | "LANGLE1" | "STAR1" | "PLUS_EQ" | "TILDE" | "SLASH_EQ"
    | "TRUE_TOK" | "LBRACE" | "CARET_EQ" | "EQ1" | "MINUS2"
    | "CARET" | "STAR2_EQ" | "LANGLE2_EQ" | "RANGLE2" | "RANGLE1"
    | "NUMBER" | "LPAREN" | "SLASH" | "EQ2" | "START"
    | "ELSE_KW" | "RBRACE" | "PLUS1" | "STAR2" | "COMMENT"
    | "STAR1_EQ" | "LET_KW" | "SEMICOLON" | "RPAREN" | "IF_KW"
    | "AMPER_EQ" | "ERROR";