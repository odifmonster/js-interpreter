#!/usr/bin/env python

from typing import TypeAlias

DeltaFunc: TypeAlias = dict[str, dict[str, tuple[str, str, bool]]]

LEX_GRAM = "src/grammar/interp.lex"

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
            elif ch_str == 'WS': chset = { ' ', '\t', '\n' }
            elif ch_str == 'NEWLINE': chset = { '\n' }
            elif ch_str == 'TAB': chset = { '\t' }
            elif ch_str == 'SPACE': chset = { ' ' }
            else: chset = { ch_str }

            if t_or_ret[0] == '<':
                ret_val = t_or_ret[1:-1]
            else:
                nxt_state = t_or_ret
            
            for c in chset:
                delta[s][c] = (nxt_state, ret_val, consume)
    
    return delta, rsvd