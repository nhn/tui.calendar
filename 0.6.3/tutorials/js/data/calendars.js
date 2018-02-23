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

(function() {
    var calendar;
    var id = 0;

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'My calendar';
    calendar.color = '#79c87e';
    calendar.textColor = '#2c9032';
    calendar.bgColor = '#79c87e33';
    calendar.borderColor = '#79c87e';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Company';
    calendar.color = '#4091d0';
    calendar.textColor = '#2b6796';
    calendar.bgColor = '#4091d033';
    calendar.borderColor = '#4091d0';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Family';
    calendar.color = '#da1b1b';
    calendar.textColor = '#9a1313';
    calendar.bgColor = '#da1b1b33';
    calendar.borderColor = '#da1b1b';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    id += 1;
    calendar.id = String(id);
    calendar.name = 'Travel';
    calendar.color = '#57c6b4';
    calendar.textColor = '#1a907d';
    calendar.bgColor = '#57c6b433';
    calendar.borderColor = '#57c6b4';
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
