const fs = require('fs');
let cmd = fs.readFileSync('input-1.txt', 'utf-8')
    .split('\n')
    .map(x => x.trim()
    .split(' '))
    .filter(x => x.length == 2)
    .map(x => [x[0], parseInt(x[1])]);
let depth = 0, fwd = 0, aim = 0;
for (let c of cmd) {
    if (c[0] === 'forward') {
        fwd += c[1];
        depth += c[1] * aim;
    } else if (c[0] === 'down') {
        aim += c[1];
    } else {
        aim -= c[1];
    }
}
console.log(fwd * depth);