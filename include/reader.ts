import type { Stream } from "./stream.js";

import fs from "fs";
import { snode, sempty } from "./stream.js";

export type Whence = "START" | "CUR";
export type Reader = Readonly<_Reader>;

interface _Reader {
  isEnded: () => boolean;
  read: () => string;
  tell: () => number;
  seek: (offset: number, whence?: Whence) => void;
}

function mkCharStream(content: string, offset: number): Stream<string> {
  if (offset < 0) throw new Error("FATAL: Character stream started from invalid position.");
  if (offset >= content.length) return sempty<string>();
  return snode(content[offset], () => mkCharStream(content, offset+1));
}

export function readerFromContent(content: string): Reader {
  let pos = 0;
  let cstream = mkCharStream(content, 0);

  return {
    isEnded: () => cstream.isEmpty(),
    read: () => {
      const c = cstream.head();
      pos++;
      cstream = cstream.tail();
      return c;
    },
    tell: () => pos,
    seek: (offset: number, whence?: Whence) => {
      if (whence === undefined) whence = "START";
      if (whence === "CUR") offset += pos;
      cstream = mkCharStream(content, offset);
      pos = offset;
    }
  }
}

export function readerFromFile(fpath: string): Reader {
  if (!fs.existsSync(fpath)) throw new Error("No such file " + fpath);
  return readerFromContent(fs.readFileSync(fpath, "utf-8"));
}