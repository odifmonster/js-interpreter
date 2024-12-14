[tok -> WS tok]
tok -> ( <LPAREN>
tok -> ) <RPAREN>
tok -> + <PLUS>
tok -> - <MINUS>
tok -> / <SLASH>
tok -> % <MODULO>
tok -> ~ <TILDE>
tok -> ^ <CARET>
tok -> * star
tok -> ! exclam
tok -> < langle
tok -> > rangle
tok -> = eq
tok -> & amper
tok -> | pipe
tok -> 0 num0
tok -> [1-9] num1
tok -> . float
tok -> [a-zA-Z_] ident
[tok -> OTHER <ERROR>]

star -> * <STAR2>
[star -> OTHER <STAR1>]

exclam -> = <EXCLAM_EQ>
[exclam -> OTHER <EXCLAM>]

langle -> = <LANGLE_EQ>
langle -> < <LANGLE2>
[langle -> OTHER <LANGLE1>]

rangle -> = <RANGLE_EQ>
rangle -> > <RANGLE2>
[rangle -> OTHER <RANGLE1>]

eq -> = <EQ2>
[eq -> OTHER <ERROR>]

amper -> & <AMPER2>
[amper -> OTHER <AMPER1>]

pipe -> | <PIPE2>
[pipe -> OTHER <PIPE1>]

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
    true -> TRUE_TOK
    false -> FALSE_TOK