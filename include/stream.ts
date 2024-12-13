export interface Stream<T> {
  isEmpty: () => boolean;
  head: () => T;
  tail: () => Stream<T>;
  filter: (f: (x: T) => boolean) => Stream<T>;
};

interface Memoized<T> {
  get: () => T;
};

function memo<T>(f: () => T): Memoized<T> {
  let val: T;
  let evaled = false;
  return {
    get: () => {
      if (!evaled) {
        val = f();
        evaled = true;
      }

      return val;
    }
  };
}

export function sempty<T>(): Stream<T> {
  return {
    isEmpty: () => true,
    head: () => { throw new Error("FATAL: Empty stream has no head."); },
    tail: () => { throw new Error("FATAL: Empty stream has no tail."); },
    filter: (_: (x: T) => boolean) => sempty<T>()
  };
}

export function snode<T>(head: T, tail: () => Stream<T>): Stream<T> {
  const memoTail = memo(tail);

  return {
    isEmpty: () => false,
    head: () => head,
    tail: memoTail.get,
    filter: (f: (x: T) => boolean) => f(head) ? snode(head, () => memoTail.get().filter(f)) : memoTail.get().filter(f)
  };
}