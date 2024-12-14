let n = 10;
let res = 1;

while (n > 0) res *= n--;

if (res > 500) {
  n = 1; // this is a comment
} else {
  n = -1; /* this is
        a multi-line
        comment */
}