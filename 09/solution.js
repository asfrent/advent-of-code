const fs = require('fs');

function readInput(filename) {
    let contents = fs.readFileSync(filename, 'utf-8').split('\n').map(x => x.trim()).filter(x => x.length > 0);
    return contents.map(line => line.split('').map(digit => parseInt(digit, 10)));
}

let di = [-1, +1, 0, 0];
let dj = [0, 0, -1, +1];

function solveFirst(input) {
    let c = 0;
    for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input[0].length; ++j) {
            let isValley = true;
            for (let d = 0; d < 4; ++d) {
                let ni = i + di[d];
                let nj = j + dj[d];
                if (ni < 0 || ni >= input.length || nj < 0 || nj >= input[0].length) continue;
                if (input[ni][nj] <= input[i][j]) {
                    isValley = false;
                    break;
                }
            }
            if (isValley) {
                c += input[i][j] + 1;
            }
        }
    }
    return c;
}

function dfs(m, i, j) {
    if (m[i][j] == 9) return 0;
    m[i][j] = 9;
    let c = 1;
    for (let d = 0; d < 4; ++d) {
        let ni = i + di[d];
        let nj = j + dj[d];
        if (ni < 0 || ni >= m.length || nj < 0 || nj >= m[0].length) continue;
        c += dfs(m, ni, nj);
    }
    return c;
}

function solveSecond(input) {
    let basins = [];
    for (let i = 0; i < input.length; ++i) {
        for (let j = 0; j < input[0].length; ++j) {
            if (input[i][j] < 9) {
                basins.push(dfs(input, i, j));
            } 
        }
    }
    basins.sort((a, b) => b - a);
    return basins[0] * basins[1] * basins[2];
}

function main() {
    let input = readInput(process.argv[2]);
    console.log(solveFirst(input));
    console.log(solveSecond(input));
}

main();