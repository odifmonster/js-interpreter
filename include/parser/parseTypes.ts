export type Expression = { kind: "number"; value: number; }
    | { kind: "ident"; name: string; }
    | { kind: "binop"; op: Operator; left: Expression; right: Expression; };

// GENERATED BY src/generators/gengram.py

export type Operator = "MULT" | "EXPN" | "ADD" | "DIV" | "SUB"
    | "MOD";