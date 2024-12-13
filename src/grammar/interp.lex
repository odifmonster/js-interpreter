[tok -> WS tok]
tok -> ( <LPAREN>
tok -> ) <RPAREN>
tok -> + <PLUS>
tok -> - <MINUS>
tok -> / <SLASH>
tok -> % <MODULO>
tok -> * star
tok -> 0 num0
tok -> [1-9] num1
tok -> . float
tok -> [a-zA-Z_] ident
[tok -> OTHER <ERROR>]

star -> * <STAR2>
[star -> OTHER <STAR1>]

[num0 -> [0-9] <ERROR>]
num0 -> . end_float
[num0 -> OTHER <NUMBER>]

num1 -> [0-9] num1
num1 -> . end_float
[num1 -> OTHER <NUMBER>]

float -> [0-9] end_float
[float -> OTHER <ERROR>]

end_float -> [0-9] end_float
[end_float -> . <ERROR>]
[end_float -> OTHER <NUMBER>]

ident -> [a-zA-Z_0-9] ident
[ident -> OTHER <IDENT>]

RESERVED