export type Expression = { kind: "number"; value: number; }
    | { kind: "boolean"; value: boolean; }
    | { kind: "ident"; name: string; }
    | { kind: "binop"; op: Binop; left: Expression; right: Expression; }
    | { kind: "unop"; op: Unop; child: Expression; };

// GENERATED BY src/generators/gengram.py

export type Unop = "LOGNOT" | "NEG" | "POS" | "BITNOT";

export type Binop = "LSHIFT" | "LTEQ" | "ISEQ" | "BITAND" | "NOTEQ"
    | "SUB" | "BITOR" | "BITXOR" | "GTEQ" | "LT"
    | "EXPN" | "LOGOR" | "ADD" | "DIV" | "GT"
    | "MOD" | "RSHIFT" | "MULT" | "LOGAND";