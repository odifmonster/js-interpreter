export type Expression = { kind: "number"; value: number; }
    | { kind: "boolean"; value: boolean; }
    | { kind: "ident"; name: string; }
    | { kind: "binop"; op: Binop; left: Expression; right: Expression; }
    | { kind: "unop"; op: Unop; child: Expression; }
    | { kind: "augbinop"; op: AugBinop; left: Expression; right: Expression; }
    | { kind: "augunop"; op: AugUnop; child: Expression; };

// GENERATED BY src/generators/gengram.py

export type Unop = "NEG" | "LOGNOT" | "BITNOT" | "POS";

export type Binop = "LOGAND" | "ADD" | "SUB" | "RSHIFT" | "LTEQ"
    | "LSHIFT" | "GTEQ" | "MOD" | "LOGOR" | "GT"
    | "LT" | "DIV" | "ISEQ" | "BITOR" | "MULT"
    | "EXPN" | "NOTEQ" | "BITAND" | "BITXOR";

export type AugUnop = "POSTINC" | "PREDEC" | "PREINC" | "POSTDEC";

export type AugBinop = "AUGMULT" | "AUGRSHIFT" | "AUGBXOR" | "ASSIGN" | "AUGMOD"
    | "AUGBAND" | "AUGDIV" | "AUGADD" | "AUGEXPN" | "AUGLSHIFT"
    | "AUGSUB" | "AUGBOR";