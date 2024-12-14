export type Expression = { kind: "number"; value: number; }
    | { kind: "ident"; name: string; }
    | { kind: "binop"; op: Binop; left: Expression; right: Expression; }
    | { kind: "unop"; op: Unop; child: Expression; };

// GENERATED BY src/generators/gengram.py

export type Unop = "NEG" | "BITNOT" | "POS" | "LOGNOT";

export type Binop = "LOGANDLOGOR" | "MOD" | "EXPN" | "ADD" | "DIV"
    | "MULT" | "LTEQ" | "ISEQNOTEQ" | "GT" | "BITAND"
    | "GTEQ" | "BITOR" | "BITXOR" | "LT" | "SUBLSHIFT"
    | "RSHIFT";