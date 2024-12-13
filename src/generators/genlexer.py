#!/usr/bin/env python

from typing import TypeAlias
from io import TextIOWrapper

DeltaFunc: TypeAlias = dict[str, dict[str, tuple[str, str, bool]]]

LEX_GRAM = "src/grammar/interp.lex"
LEX_TYPES = "include/lexer/lexTypes.ts"
LEX_DELTA = "include/lexer/lexDelta.ts"

def get_char_set(set_str: str) -> set[str]:
    chset: set[str] = set()

    i = 0
    prev = ''
    while i < len(set_str):
        if prev and set_str[i] == '-' and i+1 < len(set_str):
            start, end = ord(prev), ord(set_str[i+1])
            for j in range(start, end+1):
                chset.add(chr(j))
            i += 1
            prev = ''
        else:
            chset.add(set_str[i])
            prev = set_str[i]
        i += 1
    
    return chset

def parse_lex_file(fpath: str) -> tuple[DeltaFunc, dict[str, str]]:
    with open(fpath) as infile:
        flines = [line.strip() for line in infile if line.strip() != '']

    delta: dict[str, dict[str, tuple[str, str, bool]]] = {}
    rsvd: dict[str, str] = {}
    in_rsv = False

    for line in flines:
        if 'RESERVED' in line:
            in_rsv = True
            continue

        if in_rsv:
            word, _, tok = line.split()
            rsvd[word] = tok
        else:
            consume = True
            nxt_state = ''
            ret_val = ''

            if line[0] == '[':
                consume = False
                line = line[1:-1]
            
            s, _, ch_str, t_or_ret = line.split()
            if s not in delta: delta[s] = {}

            chset: set[str] = set()
            if ch_str[0] == '[':
                chset = get_char_set(ch_str[1:-1])
            elif ch_str == 'WS': chset = { 'SPACE', 'TAB', 'NEWLINE' }
            else: chset = { ch_str }

            if t_or_ret[0] == '<':
                ret_val = t_or_ret[1:-1]
            else:
                nxt_state = t_or_ret
            
            for c in chset:
                delta[s][c] = (nxt_state, ret_val, consume)
    
    return delta, rsvd

def write_groups(dest: TextIOWrapper, vals: set[str], grp_size = 5) -> None:
    vlist = list(vals)

    for i in range(0, len(vlist), 5):
        grp = vlist[i:i+grp_size]
        dest.write(" | ".join([f"\"{s}\"" for s in grp]))

        if i+grp_size < len(vlist):
            dest.write("\n    | ")
        else:
            dest.write(";")

def add_states_tokens(destpath: str, delta: DeltaFunc, rsvd: dict[str, str]) -> None:
    states: set[str] = set(delta.keys())
    tokens: set[str] = { "START" }

    for val in delta.values():
        for _, tok, _ in val.values():
            if tok: tokens.add(tok)
    
    for val in rsvd.values():
        tokens.add(val)

    outfile = open(destpath, "a")
    outfile.write("\n\n// GENERATED BY src/generators/genlexer.py\n\n")

    outfile.write("export type LexerState = ")
    write_groups(outfile, states)
    
    outfile.write("\n\nexport type TokenKind = ")
    write_groups(outfile, tokens)

    outfile.close()

def add_lex_delta(destpath: str, delta: DeltaFunc, rsvd: dict[str, str]) -> None:
    outfile = open(destpath, "a")
    outfile.write("\n\n// GENERATED BY src/generators/genlexer.py\n\n")

    outfile.write("export const DELTA_FUNC: TransFunc = {\n")
    for state, val in delta.items():
        outfile.write(f"  {state}: {{\n")

        for c, trans_val in val.items():
            if c == "SPACE":
                c = f"\" \""
            elif c == "TAB":
                c = f"\"\\t\""
            elif c == "NEWLINE":
                c = f"\"\\n\""
            elif c == "OTHER":
                c = "[OTHER]"
            else:
                c = f"\"{c}\""
            
            nxt_state, ret_val, consume = trans_val
            trans_str = ""
            if nxt_state:
                trans_str = f"{{ consume: {str(consume).lower()}, nextState: \"{nxt_state}\" }}"
            else:
                trans_str = f"{{ consume: {str(consume).lower()}, retVal: \"{ret_val}\" }}"

            outfile.write(f"    {c}: {trans_str},\n")
        
        outfile.write("  },\n")
    outfile.write("};\n\n")

    outfile.write("export const RESERVED: ReservedMap = {\n")
    for word, tok in rsvd.items():
        outfile.write(f"  \"{word}\": \"{tok}\",\n")
    outfile.write("};")

    outfile.close()

def main():
    delta, rsvd = parse_lex_file(LEX_GRAM)
    add_states_tokens(LEX_TYPES, delta, rsvd)
    add_lex_delta(LEX_DELTA, delta, rsvd)

if __name__ == "__main__":
    main()
