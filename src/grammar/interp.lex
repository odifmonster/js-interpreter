[tok -> WS tok]
tok -> ( <LPAREN>
tok -> ) <RPAREN>
tok -> ~ <TILDE>
tok -> + plus
tok -> - minus
tok -> / slash
tok -> % mod
tok -> ^ caret
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

plus -> + <PLUS2>
plus -> = <PLUS_EQ>
[plus -> OTHER <PLUS1>]

minus -> - <MINUS2>
minus -> = <MINUS_EQ>
[minus -> OTHER <MINUS1>]

slash -> = <SLASH_EQ>
[slash -> OTHER <SLASH>]

mod -> = <MOD_EQ>
[mod -> OTHER <MODULO>]

caret -> = <CARET_EQ>
[caret -> OTHER <CARET>]

star -> * star2
star -> = <STAR1_EQ>
[star -> OTHER <STAR1>]

star2 -> = <STAR2_EQ>
[star2 -> OTHER <STAR2>]

exclam -> = <EXCLAM_EQ>
[exclam -> OTHER <EXCLAM>]

langle -> = <LANGLE1_EQ>
langle -> < langle2
[langle -> OTHER <LANGLE1>]

langle2 -> = <LANGLE2_EQ>
[langle2 -> OTHER <LANGLE2>]

rangle -> = <RANGLE1_EQ>
rangle -> > rangle2
[rangle -> OTHER <RANGLE1>]

rangle2 -> = <RANGLE2_EQ>
[rangle2 -> OTHER <RANGLE2>]

eq -> = <EQ2>
[eq -> OTHER <EQ1>]

amper -> & <AMPER2>
amper -> = <AMPER_EQ>
[amper -> OTHER <AMPER1>]

pipe -> | <PIPE2>
pipe -> = <PIPE_EQ>
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