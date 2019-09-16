'use strict';

/* eslint-disable require-jsdoc, no-unused-vars */

var CalendarList = [];

var generateCalendarId = (function(){
  var _calId = 0;

  return function(){
    _calId = _calId + 1;

    return _calId;
  }
})();

function CalendarInfo(name, color, bgColor, borderColor, dragBgColor) {
  this.id = '' + generateCalendarId();
  this.name = name || 'My Calendar' + this.id;
  this.color = color;
  this.bgColor = bgColor;
  this.borderColor = borderColor;
  this.dragBgColor = dragBgColor;
  this.checked = true;
}

function addCalendar(calendar) {
    CalendarList.push(calendar);
}

function findCalendar(id) {
    var found;

    CalendarList.forEach(function(calendar) {
        if (calendar.id === id) {
            found = calendar;
        }
    });

    return found || CalendarList[0];
}

function hexToRGBA(hex) {
    var radix = 16;
    var r = parseInt(hex.slice(1, 3), radix),
        g = parseInt(hex.slice(3, 5), radix),
        b = parseInt(hex.slice(5, 7), radix),
        a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
    var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

    return rgba;
}

(function() {
    var calendar, calColor = '';
    var id = 0;
    var calendarNames = [
      'My Calendar',
      'Company',
      'Family',
      'Friend',
      'Travel',
      'etc',
      'Birthdays',
      'National Holidays'
    ];
    var calendarColors = [
      '#9e5fff',
      '#00a9ff',
      '#ff5583',
      '#03bd9e',
      '#bbdc00',
      '#9d9d9d',
      '#ffbb3b',
      '#ff4040'
    ];

    calendarNames.forEach(function(calName, idx) {
      calColor = calendarColors[idx];
      calendar = new CalendarInfo(calName, '#000', calColor + '33', calColor, calColor);
      addCalendar(calendar);
    });
})();
