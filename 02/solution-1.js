const fs = require('fs');
let cmd = fs.readFileSync('input-1.txt', 'utf-8')
    .split('\n')
    .map(x => x.trim()
    .split(' '))
    .filter(x => x.length == 2)
    .map(x => [x[0], parseInt(x[1])]);
let fwd = cmd.filter(x => x[0] === 'forward').reduce((a, x) => a + x[1], 0);
let depth = cmd.filter(x => x[0] !== 'forward').map(x => x[0] === 'up' ? -x[1] : x[1]).reduce((a, x) => a + x, 0);
console.log(fwd * depth);