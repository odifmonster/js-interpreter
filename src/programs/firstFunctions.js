let fib = function (x) { return x; };

fib = function (n) {
  if (n <= 1) return 1;
  return fib(n-1) + fib(n-2);
};
    
print(fib(10));

const mkAdder = x => y => x + y;

print(mkAdder(5)(4));

function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n-1);
}

print(fact(3), fact(5));