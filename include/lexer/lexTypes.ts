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

export type LexerState = "langle2" | "caret" | "end_float" | "star" | "num1"
    | "end_multicmt" | "plus" | "minus" | "comment" | "exclam"
    | "amper" | "pipe" | "slash" | "mod" | "multicmt"
    | "langle" | "star2" | "tok" | "eq" | "float"
    | "rangle" | "rangle2" | "num0" | "ident";

export type TokenKind = "LBRACE" | "RPAREN" | "RETURN_KW" | "PIPE_EQ" | "STAR2_EQ"
    | "TILDE" | "STAR1" | "PIPE2" | "STAR1_EQ" | "MOD_EQ"
    | "SEMICOLON" | "STAR2" | "ARROW" | "AMPER2" | "COMMA"
    | "COMMENT" | "PLUS1" | "PLUS_EQ" | "CONST_KW" | "AMPER1"
    | "SLASH_EQ" | "NUMBER" | "WHILE_KW" | "IDENT" | "FUNCTION_KW"
    | "PLUS2" | "MINUS_EQ" | "RANGLE2" | "MODULO" | "TRUE_TOK"
    | "CARET" | "FALSE_TOK" | "EQ2" | "RANGLE2_EQ" | "ELSE_KW"
    | "RANGLE1" | "LANGLE1_EQ" | "START" | "EXCLAM_EQ" | "RBRACE"
    | "MINUS1" | "LPAREN" | "LANGLE1" | "ERROR" | "EQ1"
    | "AMPER_EQ" | "LET_KW" | "IF_KW" | "LANGLE2_EQ" | "RANGLE1_EQ"
    | "CARET_EQ" | "EXCLAM" | "MINUS2" | "PIPE1" | "SLASH"
    | "LANGLE2";