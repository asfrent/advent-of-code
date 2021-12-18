const fs = require("fs");

function readInput(filename) {
  return (lines = fs
    .readFileSync(filename, "utf-8")
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0))[0];
}

function hexToBin(s) {
  let hexMap = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let r = "";
  for (let c of s) {
    r += hexMap[c];
  }
  return r;
}

function binToDec(s) {
  let r = 0;
  for (let c of s) {
    r = 2 * r + (c === "1" ? 1 : 0);
  }
  return r;
}

class Reader {
  constructor(s) {
    this.s = s;
    this.pos = 0;
  }

  crtPos() {
    return this.pos;
  }

  nextDec(len) {
    return binToDec(this.nextBin(len));
  }

  nextBin(len) {
    let r = this.s.substr(this.pos, len);
    this.pos += len;
    return r;
  }
}

class Packet {
  constructor(reader) {
    let startPos = reader.crtPos();
    this.version = reader.nextDec(3);
    this.typeID = reader.nextDec(3);
    this.subPackets = [];
    this.value = 0;
    if (this.typeID == 4) {
      let litBin = "";
      while (true) {
        let digit = reader.nextBin(5);
        litBin += digit.substr(1);
        if (digit[0] == "0") break;
      }
      this.value = binToDec(litBin);
    } else {
      let lengthTypeId = reader.nextDec(1);
      if (lengthTypeId === 1) {
        let numSubPackets = reader.nextDec(11);
        for (let i = 0; i < numSubPackets; ++i) {
          this.subPackets.push(new Packet(reader));
        }
      } else {
        let totalSubLen = reader.nextDec(15);
        let crtSubLen = 0;
        while (crtSubLen < totalSubLen) {
          let subPacket = new Packet(reader);
          crtSubLen += subPacket.bitLen;
          this.subPackets.push(subPacket);
        }
      }
    }
    let endPos = reader.crtPos();
    this.bitLen = endPos - startPos;
  }

  addAllVersions() {
    let r = this.version;
    for (let p of this.subPackets) {
      r += p.addAllVersions();
    }
    return r;
  }

  _literal() {
    return this.value;
  }

  _sum() {
    return this.subPackets.reduce((a, x) => a + x.compute(), 0);
  }

  _product() {
    return this.subPackets.reduce((a, x) => a * x.compute(), 1);
  }

  _min() {
    let values = this.subPackets.map((x) => x.compute());
    return Math.min(...values);
  }

  _max() {
    let values = this.subPackets.map((x) => x.compute());
    return Math.max(...values);
  }

  _gt() {
    if (this.subPackets[0].compute() > this.subPackets[1].compute()) return 1;
    return 0;
  }

  _lt() {
    if (this.subPackets[0].compute() < this.subPackets[1].compute()) return 1;
    return 0;
  }

  _eq() {
    if (this.subPackets[0].compute() === this.subPackets[1].compute()) return 1;
    return 0;
  }

  compute() {
    if (this.typeID == 0) return this._sum();
    if (this.typeID == 1) return this._product();
    if (this.typeID == 2) return this._min();
    if (this.typeID == 3) return this._max();
    if (this.typeID == 4) return this._literal();
    if (this.typeID == 5) return this._gt();
    if (this.typeID == 6) return this._lt();
    if (this.typeID == 7) return this._eq();
  }
}

function main() {
  let h = readInput(process.argv[2]);
  let b = hexToBin(h);
  let reader = new Reader(b);
  let packet = new Packet(reader);
  console.log(packet.addAllVersions());
  console.log(packet.compute());
}

main();
