#!/usr/bin/env node

var fs = require('fs');

var result = [];
var result2 = [];

function getRandomInt(min, max) {
  return ((Math.random() * (max - min)) + min) | 0;
}

for (var i = 0; i < 10000; i++) {
    result.push(getRandomInt(1, 500));

    result2.push({
        f: getRandomInt(1, 500),
        s: getRandomInt(1, 500)
    });
}

fs.writeFileSync('numbers.json', JSON.stringify(result));
fs.writeFileSync('numbers2.json', JSON.stringify(result2));
