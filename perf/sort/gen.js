#!/usr/bin/env node

var fs = require('fs');

var result = [];

function getRandomInt(min, max) {
  return ((Math.random() * (max - min)) + min) | 0;
}

for (var i = 0; i < 5000; i++) {
    result.push(getRandomInt(1, 500));
}

fs.writeFileSync('numbers.json', JSON.stringify(result));
