'use strict';

/* eslint-disable require-jsdoc */
/* eslint-env jquery */
/* global moment, tui, chance */
/* global findCalendar, CalendarList, ScheduleList, generateSchedule */

(function(window, Calendar) {
    var cal, resizeThrottled;
    var daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var useCreationPopup = true;
    var useDetailPopup = true;
    var lastClickSchedule, lastClickPopover, guideElement, datePicker, selectedCalendar;
    // Calendar.setTimezoneOffset(540);
    Calendar.setTimezoneOffsetCallback(function(timestamp) {
        return new Date(timestamp).getTimezoneOffset();
    });

    cal = new Calendar('#calendar', {
        defaultView: 'month',
        taskView: true,
        scheduleView: true,
        template: {
            milestone: function(schedule) {
                return '<span style="color:red;"><i class="fa fa-flag"></i> ' + schedule.title + '</span>';
            },
            milestoneTitle: function() {
                return '<div class="weekly-left-title"><span class="weekly-left-content">Milestone</span></div>';
            },
            task: function(schedule) {
                return '#' + schedule.title;
            },
            taskTitle: function() {
                return '<div class="weekly-left-title"><span class="weekly-left-content">Task</span></div>';
            },
            allday: function(schedule) {
                var html = [];
                if (schedule.raw['class'] === 'private') {
                    html.push('<i class="fa fa-lock"></i>');
                    html.push(' Private');
                } else {
                    if (schedule.isReadOnly) {
                        html.push('<i class="fa fa-ban"></i>');
                    } else if (schedule.raw.hasRecurrenceRule) {
                        html.push('<i class="fa fa-repeat"></i>');
                    } else if (schedule.raw.hasToOrCc) {
                        html.push('<i class="fa fa-group"></i>');
                    } else if (schedule.raw.location) {
                        html.push('<i class="fa fa-map-marker"></i>');
                    }
                    html.push(' ' + schedule.title);
                }

                return html.join('');
            },
            alldayTitle: function() {
                return '<div class="weekly-left-title"><span class="weekly-left-content">All Day</span></div>';
            },
            alldayCollapseBtnTitle: function() {
                return '∧';
            },
            time: function(schedule) {
                var html = [];
                html.push('<strong>' + moment(schedule.start.getTime()).format('HH:mm') + '</strong> ');
                if (schedule.raw['class'] === 'private') {
                    html.push('<i class="fa fa-lock"></i>');
                    html.push(' Private');
                } else {
                    if (schedule.isReadOnly) {
                        html.push('<i class="fa fa-ban"></i>');
                    } else if (schedule.raw.hasRecurrenceRule) {
                        html.push('<i class="fa fa-repeat"></i>');
                    } else if (schedule.raw.hasToOrCc) {
                        html.push('<i class="fa fa-group"></i>');
                    } else if (schedule.raw.location) {
                        html.push('<i class="fa fa-map-marker"></i>');
                    }
                    html.push(' ' + schedule.title);
                }

                return html.join('');
            },
            monthMoreClose: function() {
                return '<i class="fa fa-close"></i>';
            },

            collapseBtnTitle: function() {
                return '<i class="fa fa-chevron-up"></i>';
            }
        },
        month: {
            daynames: daynames,
            moreLayerSize: {
                height: 'auto'
            },
            grid: {
                footer: {
                    height: 10
                }
            }
        },
        week: {
            daynames: daynames
        },
        useCreationPopup: useCreationPopup,
        useDetailPopup: useDetailPopup,
        calendars: CalendarList
    });

    // event handlers
    cal.on({
        'clickSchedule': function(e) {
            var schedule = e.schedule;

            console.log('clickSchedule', ' useCreationPopup: ' + useCreationPopup, e);
            if (useCreationPopup) {
                return;
            }

            if (lastClickSchedule && lastClickSchedule.id === schedule.id) {
                return;
            }

            if (lastClickPopover) {
                lastClickPopover.popover('hide');
                lastClickPopover = null;
            }

            lastClickSchedule = schedule;

            lastClickPopover = toggleSchedulePopover(cal.getElement(schedule.id, schedule.calendarId), schedule);
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {
            console.log(e);
            if (useCreationPopup) {
                saveNewSchedule(e);
            } else {
                createNewSchedule(e);
            }
        },
        'beforeUpdateSchedule': function(e) {
            e.schedule.start = e.start;
            e.schedule.end = e.end;
            cal.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);

            console.log('update', ' useCreationPopup: ' + useCreationPopup, e);
        },
        'beforeDeleteSchedule': function(e) {
            cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
            console.log('delete', e);
        }
    });

    function toggleSchedulePopover(selector, schedule) {
        var element = $(selector);
        var $document = $(document);
        var options = {
            html: true,
            trigger: 'focus',
            container: 'body'
        };
        var calendar = findCalendar(schedule.calendarId);
        if (!element) {
            return null;
        }

        tui.util.extend(options, {
            placement: function() {
                var offset = element.offset();
                var docWidth = $document.width();
                if (offset.left + (element.width() / 2) < docWidth / 2) {
                    return 'right';
                }

                return 'left';
            },
            content: function() {
                var html = [];
                // calendar name
                html.push('<p>');
                html.push('<span class="calendar-bar" style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
                html.push('<span class="calendar-name">' + calendar.name + '</span>');
                html.push('</p>');

                // schedule name
                html.push('<p>');
                html.push('<span class="schedule-title">' + schedule.title + '</span>');
                html.push('</p>');

                // schedule time
                html.push('<p>');
                html.push('<i class="fa fa-clock-o"></i>');
                if (schedule.raw.hasRecurrenceRule) {
                    html.push('<i class="fa fa-repeat"></i>');
                }
                html.push('<span class="schedule-time"> ');
                if (schedule.isAllDay && !moment(schedule.start.getTime()).isSame(moment(schedule.end.getTime()), 'days')) {
                    html.push(moment(schedule.start.getTime()).format('YYYY MM-DD') + ' ~ ' + moment(schedule.end.getTime()).format('YYYY MM-DD'));
                } else {
                    html.push(moment(schedule.start.getTime()).format('MM-DD HH:mm') + ' ~ ' + moment(schedule.end.getTime()).format('HH:mm'));
                }
                html.push('</span>');
                html.push('</p>');

                // schedule location
                if (schedule.raw.location) {
                    html.push('<p>');
                    html.push('<i class="fa fa-map-marker"></i> ' + schedule.raw.location);
                    html.push('</p>');
                }

                // schedule creator
                if (schedule.raw.creator) {
                    html.push('<p>');
                    html.push('<i class="fa fa-user"></i> <a>' + schedule.raw.creator.name + '</a>');
                    html.push('</p>');
                }

                return html.join('');
            }
        });
        element.popover(options);
        element.popover('show');

        return element;
    }

    function closePopover(e) {
        var target = $(e.target);
        if (!target.closest('.popover').length && lastClickPopover && !lastClickPopover.find(target).length && lastClickPopover[0] !== target[0]) {
            if (lastClickSchedule) {
                lastClickSchedule = null;
            }

            lastClickPopover.popover('hide');
            lastClickPopover = null;
        }
    }

    /**
     * A listener for click the menu
     * @param {Event} e - click event
     */
    function onClickMenu(e) {
        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var action = getDataAction(target);
        var options = cal.getOptions();
        var viewName = '';

        console.log(target);
        console.log(action);
        switch (action) {
            case 'toggle-daily':
                viewName = 'day';
                break;
            case 'toggle-weekly':
                viewName = 'week';
                break;
            case 'toggle-monthly':
                options.month.visibleWeeksCount = 0;
                viewName = 'month';
                break;
            case 'toggle-weeks2':
                options.month.visibleWeeksCount = 2;
                viewName = 'month';
                break;
            case 'toggle-weeks3':
                options.month.visibleWeeksCount = 3;
                viewName = 'month';
                break;
            case 'toggle-narrow-weekend':
                options.month.narrowWeekend = !options.month.narrowWeekend;
                options.week.narrowWeekend = !options.week.narrowWeekend;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.narrowWeekend;
                break;
            case 'toggle-start-day-1':
                options.month.startDayOfWeek = options.month.startDayOfWeek ? 0 : 1;
                options.week.startDayOfWeek = options.week.startDayOfWeek ? 0 : 1;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.startDayOfWeek;
                break;
            case 'toggle-workweek':
                options.month.workweek = !options.month.workweek;
                options.week.workweek = !options.week.workweek;
                viewName = cal.getViewName();

                target.querySelector('input').checked = !options.month.workweek;
                break;
            default:
                break;
        }

        cal.setOptions(options, true);
        cal.changeView(viewName, true);

        setDropdownCalendarType();
        setRenderRangeText();
        setSchedules();
    }

    function onClickNavi(e) {
        var action = getDataAction(e.target);

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            default:
                return;
        }

        setRenderRangeText();
        setSchedules();
    }

    function onShowNewSchedule() {
        $('#new-schedule-title').focus();
    }

    function onHideNewSchedule() {
        if (guideElement) {
            guideElement.clearGuideElement();
            guideElement = null;
        }

        $('#new-schedule-title').val('');
        $('#new-schedule-location').val('');
        document.getElementById('new-schedule-allday').checked = false;
    }

    function onNewSchedule() {
        var title = $('#new-schedule-title').val();
        var location = $('#new-schedule-location').val();
        var isAllDay = document.getElementById('new-schedule-allday').checked;
        var start = datePicker.getStartDate();
        var end = datePicker.getEndDate();
        var calendar = selectedCalendar ? selectedCalendar : CalendarList[0];

        if (!title) {
            return;
        }

        cal.createSchedules([{
            id: String(chance.guid()),
            calendarId: calendar.id,
            title: title,
            isAllDay: isAllDay,
            start: start,
            end: end,
            category: isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            raw: {
                location: location
            },
            state: 'Busy'
        }]);

        $('#modal-new-schedule').modal('hide');
    }

    function onChangeNewScheduleCalendar(e) {
        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var calendarId = getDataAction(target);
        changeNewScheduleCalendar(calendarId);
    }

    function changeNewScheduleCalendar(calendarId) {
        var calendarNameElement = document.getElementById('calendarName');
        var calendar = findCalendar(calendarId);
        var html = [];

        html.push('<span class="calendar-bar" style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
        html.push('<span class="calendar-name">' + calendar.name + '</span>');

        calendarNameElement.innerHTML = html.join('');

        selectedCalendar = calendar;
    }

    function createDatePicker(start, end) {
        if (datePicker) {
            datePicker.destroy();
        }
        datePicker = tui.DatePicker.createRangePicker({
            startpicker: {
                date: start,
                input: '#startpicker-input',
                container: '#startpicker-container'
            },
            endpicker: {
                date: end,
                input: '#endpicker-input',
                container: '#endpicker-container'
            },
            format: 'yyyy-MM-dd HH:mm',
            timepicker: {
                showMeridiem: false
            }
        });
    }

    function createNewSchedule(event) {
        var start = event.start ? new Date(event.start.getTime()) : new Date();
        var end = event.end ? new Date(event.end.getTime()) : moment().add(1, 'hours').toDate();

        if (useCreationPopup) {
            cal.openCreationPopup({
                start: start,
                end: end
            });
        } else {
            createDatePicker(start, end, event.isAllDay);
            changeNewScheduleCalendar(CalendarList[0].id);

            document.getElementById('new-schedule-allday').checked = event.isAllDay;

            guideElement = event.guide;
            $('#modal-new-schedule').modal();
        }
    }

    function saveNewSchedule(scheduleData) {
        var calendar = scheduleData.calendar || findCalendar(scheduleData.calendarId);
        var schedule = {
            id: String(chance.guid()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            raw: {
                'class': scheduleData.raw['class'],
                location: scheduleData.raw.location
            },
            state: scheduleData.state
        };
        if (calendar) {
            schedule.calendarId = calendar.id;
            schedule.color = calendar.color;
            schedule.bgColor = calendar.bgColor;
            schedule.borderColor = calendar.borderColor;
        }

        cal.createSchedules([schedule]);

        refreshScheduleVisibility();
    }

    function onChangeCalendars(e) {
        var calendarId = e.target.value;
        var checked = e.target.checked;
        var viewAll = document.querySelector('.lnb-calendars-item input');
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
        var allCheckedCalendars = true;

        if (calendarId === 'all') {
            allCheckedCalendars = checked;

            calendarElements.forEach(function(input) {
                var span = input.parentNode;
                input.checked = checked;
                span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
            });

            CalendarList.forEach(function(calendar) {
                calendar.checked = checked;
            });
        } else {
            findCalendar(calendarId).checked = checked;

            allCheckedCalendars = calendarElements.every(function(input) {
                return input.checked;
            });

            if (allCheckedCalendars) {
                viewAll.checked = true;
            } else {
                viewAll.checked = false;
            }
        }

        refreshScheduleVisibility();
    }

    function refreshScheduleVisibility() {
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

        CalendarList.forEach(function(calendar) {
            cal.toggleSchedules(calendar.id, !calendar.checked, false);
        });

        cal.render();

        calendarElements.forEach(function(input) {
            var span = input.nextElementSibling;
            span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
        });
    }

    function setDropdownCalendarType() {
        var calendarTypeName = document.getElementById('calendarTypeName');
        var calendarTypeIcon = document.getElementById('calendarTypeIcon');
        var options = cal.getOptions();
        var type = cal.getViewName();
        var iconClassName;

        if (type === 'day') {
            type = 'Daily';
            iconClassName = 'tui-full-calendar-icon ic_view_day';
        } else if (type === 'week') {
            type = 'Weekly';
            iconClassName = 'tui-full-calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 2) {
            type = '2 weeks';
            iconClassName = 'tui-full-calendar-icon ic_view_week';
        } else if (options.month.visibleWeeksCount === 3) {
            type = '3 weeks';
            iconClassName = 'tui-full-calendar-icon ic_view_week';
        } else {
            type = 'Monthly';
            iconClassName = 'tui-full-calendar-icon ic_view_month';
        }

        calendarTypeName.innerHTML = type;
        calendarTypeIcon.className = iconClassName;
    }

    function setRenderRangeText() {
        var renderRange = document.getElementById('renderRange');
        var options = cal.getOptions();
        var viewName = cal.getViewName();
        var html = [];
        if (viewName === 'day') {
            html.push(moment(cal.getDate().getTime()).format('YYYY.MM.DD'));
        } else if (viewName === 'month' &&
            (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
            html.push(moment(cal.getDate().getTime()).format('YYYY.MM'));
        } else {
            html.push(moment(cal.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
            html.push(' ~ ');
            html.push(moment(cal.getDateRangeEnd().getTime()).format(' MM.DD'));
        }
        renderRange.innerHTML = html.join('');
    }

    function setSchedules() {
        cal.clear();
        generateSchedule(cal.getViewName(), cal.getDateRangeStart(), cal.getDateRangeEnd());
        cal.createSchedules(ScheduleList);
        refreshScheduleVisibility();
    }

    function setEventListener() {
        $('#menu-navi').on('click', onClickNavi);
        $('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);
        $('#lnb-calendars').on('change', onChangeCalendars);

        $('#btn-save-schedule').on('click', onNewSchedule);
        $('#modal-new-schedule').on('show.bs.modal', onShowNewSchedule);
        $('#modal-new-schedule').on('hide.bs.modal', onHideNewSchedule);
        $('#btn-new-schedule').on('click', createNewSchedule);

        $('#dropdownMenu-calendars-list').on('click', onChangeNewScheduleCalendar);

        window.addEventListener('resize', resizeThrottled);
        document.addEventListener('click', closePopover);
    }

    function getDataAction(target) {
        return target.dataset ? target.dataset.action : target.getAttribute('data-action');
    }

    resizeThrottled = tui.util.throttle(function() {
        cal.render();
    }, 50);

    window.cal = cal;

    setDropdownCalendarType();
    setRenderRangeText();
    setSchedules();
    setEventListener();
})(window, tui.Calendar);

// set calendars
(function() {
    var calendarList = document.getElementById('calendarList');
    var html = [];
    CalendarList.forEach(function(calendar) {
        html.push('<div class="lnb-calendars-item"><label>' +
            '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" checked>' +
            '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + calendar.borderColor + ';"></span>' +
            '<span>' + calendar.name + '</span>' +
            '</label></div>'
        );
    });
    calendarList.innerHTML = html.join('\n');

    calendarList = document.getElementById('dropdownMenu-calendars-list');
    html = [];
    CalendarList.forEach(function(calendar) {
        html.push('<li><a role="menuitem" data-action="' + calendar.id + '">');
        html.push('<span class="calendar-bar" style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
        html.push('<span class="calendar-name">' + calendar.name + '</span>');
        html.push('</a></li>');
    });
    calendarList.innerHTML = html.join('\n');
})();
