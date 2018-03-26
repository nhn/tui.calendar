'use strict';

/* eslint-disable require-jsdoc */
/* eslint-env jquery */
/* global moment, tui, chance */
/* global findCalendar, CalendarList, ScheduleList, generateSchedule */

(function(window, Calendar) {
    var cal, resizeThrottled;
    var daynames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
                return 'Milestone';
            },
            task: function(schedule) {
                return '#' + schedule.title;
            },
            taskTitle: function() {
                return 'Task';
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
                return 'All Day';
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
            monthMoreTitleDate: function(date) {
                date = new Date(date);

                return tui.util.formatDate('MM-DD', date) + '(' + daynames[date.getDay()] + ')';
            },
            monthMoreClose: function() {
                return '<i class="fa fa-close"></i>';
            },
            monthGridHeader: function(model) {
                var date = parseInt(model.date.split('-')[2], 10);
                var template = '<span class="tui-full-calendar-weekday-grid-date">' + date + '</span>';
                var today = model.isToday ? 'TDY' : '';
                if (today) {
                    template += '<span class="tui-full-calendar-weekday-grid-date-decorator">' + today + '</span>';
                }

                return template;
            },
            monthGridHeaderExceed: function(hiddenSchedules) {
                return '<span class="calendar-more-schedules">+' + hiddenSchedules + '</span>';
            },

            monthGridFooter: function() {
                return '';
            },

            monthGridFooterExceed: function() {
                return '';
            },
            weekDayname: function(dayname) {
                return '<span class="calendar-week-dayname-name">' + dayname.dayName + '</span><br><span class="calendar-week-dayname-date">' + dayname.date + '</span>';
            },
            monthDayname: function(dayname) {
                return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
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
            daynames: daynames,
            panelHeights: [80, 80, 120],
            alldayViewType: 'toggle'
        }
    });

    // event handlers
    cal.on({
        'clickSchedule': function(e) {
            var schedule = e.schedule;
            console.log('click', e);

            if (lastClickSchedule) {
                cal.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
                    color: findCalendar(lastClickSchedule.calendarId).textColor,
                    isFocused: false
                });
            }
            if (lastClickPopover) {
                lastClickPopover.popover('hide');
            }

            cal.updateSchedule(schedule.id, schedule.calendarId, {
                color: findCalendar(schedule.calendarId).color,
                isFocused: true
            });

            lastClickSchedule = schedule;

            lastClickPopover = toggleSchedulePopover(cal.getElement(schedule.id, schedule.calendarId), schedule);
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {
            console.log(e);
            createNewSchedule(e);
        },
        'beforeUpdateSchedule': function(e) {
            cal.updateSchedule(e.schedule.id, e.schedule.calendarId, {
                start: e.start,
                end: e.end
            });

            console.log('update', e);
        },
        'beforeDeleteSchedule': function(e) {
            console.log('delete', e);
        },
        'resizePanel': function(e) {
            console.log('resizePanel', e);
        },
        'dragStartSchedule': function(e) {
            console.log('dragStartSchedule', e);
        },
        'dragEndSchedule': function(e) {
            console.log('dragEndSchedule', e);
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
        if (!target.closest('.popover').length && lastClickPopover) {
            if (lastClickSchedule) {
                cal.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
                    color: findCalendar(lastClickSchedule.calendarId).textColor,
                    isFocused: false
                });
            }

            lastClickPopover.popover('hide');
        }
    }

    /**
     * A listener for click the menu
     * @param {Event} e - click event
     */
    function onClickMenu(e) {
        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var action = getDataAction(target);

        console.log(target);
        console.log(action);
        switch (action) {
            case 'toggle-daily':
                cal.toggleView('day');
                break;
            case 'toggle-weekly':
                cal.toggleView('week');
                break;
            case 'toggle-monthly':
                cal.options.month.visibleWeeksCount = 0;
                cal.toggleView('month', true);
                break;
            case 'toggle-weeks2':
                cal.options.month.visibleWeeksCount = 2;
                cal.toggleView('month', true);
                break;
            case 'toggle-weeks3':
                cal.options.month.visibleWeeksCount = 3;
                cal.toggleView('month', true);
                break;
            case 'toggle-narrow-weekend':
                cal.options.month.narrowWeekend = !cal.options.month.narrowWeekend;
                cal.options.week.narrowWeekend = !cal.options.week.narrowWeekend;
                cal.toggleView(cal.viewName, true);

                target.querySelector('input').checked = cal.options.month.narrowWeekend;
                break;
            case 'toggle-start-day-1':
                cal.options.month.startDayOfWeek = cal.options.month.startDayOfWeek ? 0 : 1;
                cal.options.week.startDayOfWeek = cal.options.week.startDayOfWeek ? 0 : 1;
                cal.toggleView(cal.viewName, true);

                target.querySelector('input').checked = cal.options.month.startDayOfWeek;
                break;
            case 'toggle-workweek':
                cal.options.month.workweek = !cal.options.month.workweek;
                cal.options.week.workweek = !cal.options.week.workweek;
                cal.toggleView(cal.viewName, true);

                target.querySelector('input').checked = !cal.options.month.workweek;
                break;
            default:
                return;
        }

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
            color: calendar.textColor,
            bgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            raw: {
                location: location
            }
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

        createDatePicker(start, end, event.isAllDay);
        changeNewScheduleCalendar(CalendarList[0].id);

        document.getElementById('new-schedule-allday').checked = event.isAllDay;

        guideElement = event.guide;
        $('#modal-new-schedule').modal();
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
                input.checked = checked;
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
        CalendarList.forEach(function(calendar) {
            if (calendar.checked) {
                cal.showSchedulesByCalendarID(calendar.id, false);
            } else {
                cal.hideSchedulesByCalendarID(calendar.id, false);
            }
        });

        cal.render();
    }

    function setDropdownCalendarType() {
        var calendarTypeName = document.getElementById('calendarTypeName');
        var type = cal.viewName;

        if (type === 'day') {
            type = 'Daily';
        } else if (type === 'week') {
            type = 'Weekly';
        } else if (cal.options.month.visibleWeeksCount === 2) {
            type = '2 weeks';
        } else if (cal.options.month.visibleWeeksCount === 3) {
            type = '3 weeks';
        } else {
            type = 'Monthly';
        }

        calendarTypeName.innerHTML = type;
    }

    function setRenderRangeText() {
        var renderRange = document.getElementById('renderRange');
        var html = [];
        if (cal.viewName === 'day') {
            html.push(moment(cal.renderDate.getTime()).format('YYYY.MM.DD'));
        } else if (cal.viewName === 'month' &&
            (!cal.options.month.visibleWeeksCount || cal.options.month.visibleWeeksCount > 4)) {
            html.push(moment(cal.renderDate.getTime()).format('YYYY.MM'));
        } else {
            html.push(moment(cal.renderRange.start.getTime()).format('YYYY.MM.DD'));
            html.push(' ~ ');
            html.push(moment(cal.renderRange.end.getTime()).format(' MM.DD'));
        }
        renderRange.innerHTML = html.join('');
    }

    function setSchedules() {
        cal.clear();
        generateSchedule(cal.viewName, cal.renderRange.start, cal.renderRange.end);
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
        cal.refresh();
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
        html.push('<div class="lnb-calendars-item"><label><input type="checkbox" value="' + calendar.id + '"checked><span style="color: ' + calendar.color + ';">' + calendar.name + '</span></label></div>');
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
