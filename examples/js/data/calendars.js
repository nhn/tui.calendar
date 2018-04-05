'use strict';

/* eslint-disable require-jsdoc, no-unused-vars */

var CalendarList = [];

function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.textColor = null;
    this.bgColor = null;
    this.borderColor = null;
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

    return found;
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
    var calendar;
    var id = 0;

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'My Calendar';
    calendar.color = hexToRGBA('#9e5fff');
    calendar.textColor = hexToRGBA('#ffffff');
    calendar.bgColor = hexToRGBA('#9e5fff');
    calendar.borderColor = hexToRGBA('#9e5fff');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Company';
    calendar.color = hexToRGBA('#00a9ff');
    calendar.textColor = hexToRGBA('#ffffff');
    calendar.bgColor = hexToRGBA('#00a9ff');
    calendar.borderColor = hexToRGBA('#00a9ff');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Family';
    calendar.color = hexToRGBA('#ff5583');
    calendar.textColor = hexToRGBA('#ffffff');
    calendar.bgColor = hexToRGBA('#ff5583');
    calendar.borderColor = hexToRGBA('#ff5583');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Friend';
    calendar.color = hexToRGBA('#03bd9e');
    calendar.textColor = hexToRGBA('#ffffff');
    calendar.bgColor = hexToRGBA('#03bd9e');
    calendar.borderColor = hexToRGBA('#03bd9e');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Travel';
    calendar.color = '#bbdc00';
    calendar.textColor = '#ffffff';
    calendar.bgColor = '#bbdc00';
    calendar.borderColor = '#bbdc00';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'etc';
    calendar.color = '#9d9d9d';
    calendar.textColor = '#ffffff';
    calendar.bgColor = '#9d9d9d';
    calendar.borderColor = '#9d9d9d';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Birthdays';
    calendar.color = '#ffbb3b';
    calendar.textColor = '#ffffff';
    calendar.bgColor = '#ffbb3b';
    calendar.borderColor = '#ffbb3b';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'National Holidays';
    calendar.color = '#ff4040';
    calendar.textColor = '#ffffff';
    calendar.bgColor = '#ff4040';
    calendar.borderColor = '#ff4040';
    addCalendar(calendar);
})();
