#!/usr/bin/env node

var moment = require('moment');
var fs = require('fs');


var START_DATE = moment('2015-03-01 00:00:00');
var END_DATE = moment('2015-06-30 23:59:59');
var current = moment(START_DATE),
    end,
    randMilliSeconds,
    result1 = [],
    result2 = [];

var diff = [
    600000,    // 10min
    1200000,   // 20min
    2400000   // 30min
];


var hour = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getDateObject(moment) {
    return {
        y: moment.get('year'),
        M: moment.get('month') + 1,
        d: moment.get('date'),
        h: moment.get('hour'),
        m: moment.get('minute'),
        s: moment.get('second')
    };
}

do {
    randMilliSeconds = getRandomInt(0, 2);

    current = moment(START_DATE).add(hour, 'h');
    if (!current.isBefore(END_DATE)) {
        break;
    }
    end = moment(current).add(diff[randMilliSeconds], 'ms');

    hour += 1;
    result1.push({
        starts: current.format('YYYY-MM-DD HH:mm:SS'),
        ends: end.format('YYYY-MM-DD HH:mm:SS')
    });

    result2.push({
        starts: getDateObject(current),
        ends: getDateObject(end)
    });
} while (current.isBefore(END_DATE))

fs.writeFileSync('date_string.json', JSON.stringify(result1));
fs.writeFileSync('date_object.json', JSON.stringify(result2));

