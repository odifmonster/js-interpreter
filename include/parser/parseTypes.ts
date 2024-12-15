export type Expression = { kind: "number"; value: number; }
    | { kind: "boolean"; value: boolean; }
    | { kind: "ident"; name: string; }
    | { kind: "binop"; op: Binop; left: Expression; right: Expression; }
    | { kind: "unop"; op: Unop; child: Expression; }
    | { kind: "augbinop"; op: AugBinop; left: Expression; right: Expression; }
    | { kind: "augunop"; op: AugUnop; child: Expression; }
    | { kind: "func"; params: string[]; body: Statement[]; }
    | { kind: "call"; callee: Expression; args: Expression[]; };

export type Statement = { kind: "empty" }
    | { kind: "exp"; exp: Expression; }
    | { kind: "let"; name: string; value: Expression; }
    | { kind: "const"; name: string; value: Expression; }
    | { kind: "block"; body: Statement[]; }
    | { kind: "if"; test: Expression; truePart: Statement; falsePart: Statement; }
    | { kind: "while"; test: Expression; body: Statement; }
    | { kind: "return"; exp: Expression; };

// GENERATED BY src/generators/gengram.py

export type Unop = "LOGNOT" | "POS" | "BITNOT" | "NEG";

export type Binop = "SUB" | "ISEQ" | "EXPN" | "BITXOR" | "RSHIFT"
    | "LTEQ" | "ADD" | "GTEQ" | "BITAND" | "LT"
    | "MULT" | "LSHIFT" | "BITOR" | "LOGAND" | "NOTEQ"
    | "DIV" | "MOD" | "GT" | "LOGOR";

export type AugUnop = "PREINC" | "POSTINC" | "POSTDEC" | "PREDEC";

export type AugBinop = "AUGEXPN" | "AUGBOR" | "AUGADD" | "AUGRSHIFT" | "AUGBXOR"
    | "AUGSUB" | "ASSIGN" | "AUGDIV" | "AUGBAND" | "AUGMULT"
    | "AUGLSHIFT" | "AUGMOD";