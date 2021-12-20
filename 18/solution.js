const fs = require("fs");
const util = require("util");

function readInput(filename) {
  return fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

class Node {
  constructor(value, left, right, parent) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.parent = parent;
  }

  static fromSnail(x, parent) {
    if (typeof x == "number") return new Node(x, null, null, parent);
    let r = new Node(null, null, null, parent);
    r.left = Node.fromSnail(x[0], r);
    r.right = Node.fromSnail(x[1], r);
    return r;
  }

  toSnail() {
    if (this.value !== null) return this.value;
    return [this.left.toSnail(), this.right.toSnail()];
  }

  mag() {
    if (this.value !== null) return this.value;
    return 3 * this.left.mag() + 2 * this.right.mag();
  }

  static add(x, y) {
    let r = new Node(null, x, y, null);
    x.parent = r;
    y.parent = r;
    Node.reduce(r);
    return r;
  }

  static reduce(x) {
    while (true) {
      if (Node.explode(x)) continue;
      if (Node.split(x)) continue;
      break;
    }
  }

  flatten(depth, acc) {
    if (this.value !== null) {
      acc.push([depth, this]);
    } else {
      this.left.flatten(depth + 1, acc);
      this.right.flatten(depth + 1, acc);
    }
  }

  static explode(r) {
    let v = [];
    r.flatten(0, v);
    let i;
    for (i = 0; i < v.length; ++i) {
      if (v[i][0] > 4) {
        break;
      }
    }
    if (i == v.length) return false;
    if (i > 0) {
      v[i - 1][1].value += v[i][1].value;
    }
    ++i;
    if (i + 1 < v.length) {
      v[i + 1][1].value += v[i][1].value;
    }
    let replace = v[i][1].parent;
    replace.left = null;
    replace.right = null;
    replace.value = 0;
    return true;
  }

  static split(r) {
    if (r.value !== null) {
      if (r.value >= 10) {
        let leftVal = Math.floor(r.value / 2);
        let rightVal = r.value - leftVal;
        r.value = null;
        r.left = new Node(leftVal, null, null, r);
        r.right = new Node(rightVal, null, null, r);
        return true;
      }
      return false;
    }
    return Node.split(r.left) || Node.split(r.right);
  }

  clone(parent) {
    if (this.value !== null) return new Node(this.value, null, null, parent);
    let clonedThis = new Node(null, null, null, parent);
    clonedThis.left = this.left.clone(clonedThis);
    clonedThis.right = this.right.clone(clonedThis);
    return clonedThis;
  }
}

function solve1(v) {
  let r = v[0].clone(null);
  for (let i = 1; i < v.length; ++i) {
    r = Node.add(r, v[i].clone(null));
  }
  console.log(r.mag());
}

function solve2(v) {
  let maxMag = 0;
  for (let i = 0; i < v.length; ++i) {
    for (let j = 0; j < v.length; ++j) {
      if (i == j) continue;
      maxMag = Math.max(
        maxMag,
        Node.add(v[i].clone(null), v[j].clone(null)).mag()
      );
    }
  }
  console.log(maxMag);
}

function main() {
  let input = readInput(process.argv[2]);
  let snailNumbers = input.map((x) => Node.fromSnail(JSON.parse(x), null));
  solve1(snailNumbers);
  solve2(snailNumbers);
}

main();
