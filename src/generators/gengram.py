#!/usr/bin/env python

from typing import TypeAlias
from genlexer import write_groups

Delta: TypeAlias = dict[str, list[tuple[str, str]]]
Ops: TypeAlias = set[str]

PARSE_GRAM = "src/grammar/interp.gram"
PARSE_TYPES = "include/parser/parseTypes.ts"
PARSE_DELTA = "include/parser/parseDelta.js"

def split_strip(s: str, sep: str) -> list[str]:
    return [x.strip() for x in s.split(sep)]

def parse_groups(fpath: str) -> list[str]:
    with open(fpath) as infile:
        flines = [line.strip() for line in infile]
    
    groups: list[str] = []
    cur_group = ""

    for line in flines:
        if "::=" in line and cur_group:
            groups.append(cur_group)
            cur_group = line
        else:
            cur_group = cur_group + line
    
    groups.append(cur_group)
    return groups

def get_delta_ops(groups: list[str]) -> tuple[Delta, Ops]:
    delta: Delta = {}
    ops: Ops = set()

    for group in groups:
        symbol, rhs_str = split_strip(group, "::=")

        if symbol == "OPS":
            ops.update(rhs_str.split())
        else:
            delta[symbol] = []
            rhs_list = split_strip(rhs_str, "\\")
            for item in rhs_list:
                cats, act = split_strip(item, "___")
                act = act[1:-1].strip()
                delta[symbol].append((cats, act))
    
    return delta, ops

def parse_rule(rule: str) -> list[tuple[str, str | list[str]]]:
    parsed: list[tuple[str, str | list[str]]] = []

    in_grp = False
    cur_group: list[str] = []

    for item in rule.split():
        if item == "(" or item == "[":
            in_grp = True
        elif item == ")" or item == "]":
            grp_kind = "opt" if item == ")" else "star"
            in_grp = False
            parsed.append((grp_kind, cur_group))
            cur_group = []
        elif in_grp:
            cur_group.append(item)
        else:
            parsed.append(("symbol", item))
    
    return parsed

def format_preterm(token: str, act: str, depth: int) -> str:
    rule_str = "  "*depth
    rule_str = rule_str + f"{{ token: \"{token}\", action: {act} }}"
    return rule_str

def format_nonterm(rule: str, act: str, depth: int) -> str:
    parsed = parse_rule(rule)

    rule_str = " "*(depth*2) + "{\n" + "  "*(depth+1) + "rule: [\n"
    for kind, value in parsed:
        if kind == "symbol":
            rule_str = rule_str + "  "*(depth+2) + f"\"{value}\",\n"
        else:
            rule_str = rule_str + "  "*(depth+2) + "{\n"
            rule_str = rule_str + "  "*(depth+3)
            rule_str = rule_str + f"kind: \"{kind}\",\n"
            rule_str = rule_str + "  "*(depth+3) + "symbols: "
            rule_str = rule_str + "[" + ", ".join([f"\"{x}\"" for x in value]) + "]\n"
            rule_str = rule_str + "  "*(depth+2) + "},\n"
    rule_str = rule_str + "  "*(depth+1) + "],\n"
    rule_str = rule_str + "  "*(depth+1) + f"action: {act}\n" + "  "*depth + "}"

    return rule_str

def add_operator(dest: str, ops: Ops) -> None:
    outfile = open(dest, "a")

    outfile.write("\n\n// GENERATED BY src/generators/gengram.py\n\n")
    outfile.write("export type Operator = ")
    write_groups(outfile, ops)

    outfile.close()

def add_parse_delta(dest: str, delta: Delta) -> None:
    outfile = open(dest, "a")

    outfile.write("\n\n// GENERATED BY src/generators/gengram.py\n\n")
    outfile.write("export const GRAMMAR = {\n")

    for symbol, rules in delta.items():
        outfile.write(f"  {symbol}: [\n")

        for rule, act in rules:
            if rule == rule.upper():
                outfile.write(format_preterm(rule, act, 2))
                outfile.write(",\n")
            else:
                outfile.write(format_nonterm(rule, act, 2))
                outfile.write(",\n")
        
        outfile.write("  ],\n")
    
    outfile.write("};")
    outfile.close()

def main():
    groups = parse_groups(PARSE_GRAM)
    delta, ops = get_delta_ops(groups)
    add_operator(PARSE_TYPES, ops)
    add_parse_delta(PARSE_DELTA, delta)

if __name__ == "__main__":
    main()