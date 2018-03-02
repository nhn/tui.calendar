'use strict';

/*eslint-disable*/

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
    calendar.name = 'My calendar';
    calendar.color = hexToRGBA('#79c87e');
    calendar.textColor = hexToRGBA('#2c9032');
    calendar.bgColor = hexToRGBA('#79c87e33');
    calendar.borderColor = hexToRGBA('#79c87e');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Company';
    calendar.color = hexToRGBA('#4091d0');
    calendar.textColor = hexToRGBA('#2b6796');
    calendar.bgColor = hexToRGBA('#4091d033');
    calendar.borderColor = hexToRGBA('#4091d0');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Family';
    calendar.color = hexToRGBA('#da1b1b');
    calendar.textColor = hexToRGBA('#9a1313');
    calendar.bgColor = hexToRGBA('#da1b1b33');
    calendar.borderColor = hexToRGBA('#da1b1b');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Travel';
    calendar.color = hexToRGBA('#57c6b4');
    calendar.textColor = hexToRGBA('#1a907d');
    calendar.bgColor = hexToRGBA('#57c6b433');
    calendar.borderColor = hexToRGBA('#57c6b4');
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Friend';
    calendar.color = '#a38705';
    calendar.textColor = '#1a907d';
    calendar.bgColor = '#f8cf1433';
    calendar.borderColor = '#f8cf14';
    addCalendar(calendar);
})();
