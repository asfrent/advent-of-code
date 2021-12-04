const fs = require("fs");

function readInput(filename) {
  let contents = fs.readFileSync(filename, "utf-8");
  let lines = contents
    .split("\n")
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
  return lines;
}

function loadNumbers(lines) {
  let numbers = lines[0]
    .split(",")
    .map((x) => x.trim())
    .map((x) => parseInt(x, 10));
  return numbers;
}

function loadTickets(lines) {
  let tickets = [];
  for (let i = 1; i < lines.length; i += 5) {
    let t = [];
    for (let j = 0; j < 5; ++j) {
      let split_line = lines[i + j]
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map((x) => x.trim())
        .map((x) => parseInt(x, 10));
      t.push(split_line);
    }
    tickets.push(t);
  }
  return tickets;
}

function isWinner(t) {
  for (let i = 0; i < 5; ++i) {
    let fullLine = true;
    for (let j = 0; j < 5; ++j) {
      if (t[i][j] >= 0) {
        fullLine = false;
      }
    }
    if (fullLine) return true;
  }
  for (let i = 0; i < 5; ++i) {
    let fullCol = true;
    for (let j = 0; j < 5; ++j) {
      if (t[j][i] >= 0) {
        fullCol = false;
      }
    }
    if (fullCol) return true;
  }
  return false;
}

function computeScore(t, x) {
  let sum = 0;
  for (let i = 0; i < 5; ++i) {
    for (let j = 0; j < 5; ++j) {
      if (t[i][j] >= 0) {
        sum += t[i][j];
      }
    }
  }
  return sum * x;
}

function playBingo1(tickets, numbers) {
  for (let x of numbers) {
    for (let t = 0; t < tickets.length; ++t) {
      for (let i = 0; i < 5; ++i) {
        for (let j = 0; j < 5; ++j) {
          if (tickets[t][i][j] === x) {
            tickets[t][i][j] = -1;
          }
        }
      }
      if (isWinner(tickets[t])) {
        return computeScore(tickets[t], x);
      }
    }
  }
}

function playBingo2(tickets, numbers) {
  let winningTickets = 0;
  for (let x of numbers) {
    for (let t = 0; t < tickets.length; ++t) {
      if (tickets[t].length == 0) continue;
      for (let i = 0; i < 5; ++i) {
        for (let j = 0; j < 5; ++j) {
          if (tickets[t][i][j] === x) {
            tickets[t][i][j] = -1;
          }
        }
      }
      if (isWinner(tickets[t])) {
        ++winningTickets;
        if (winningTickets == tickets.length) {
          return computeScore(tickets[t], x);
        }
        tickets[t] = [];
      }
    }
  }
}

function main() {
  let lines = readInput("input.txt");
  let numbers = loadNumbers(lines);
  let tickets = loadTickets(lines);
  let score1 = playBingo1(tickets, numbers);
  console.log(score1);
  let score2 = playBingo2(tickets, numbers);
  console.log(score2);
}

main();
