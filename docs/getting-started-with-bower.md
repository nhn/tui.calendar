# Getting started with bower

## Install

```sh
bower install --save tui-calendar
```

## Calendar

### Dependencies

TOAST UI Calendar requires tui-code-snippet as dependencies to work.

```html
<head>
...
<script src="../bower_components/tui-code-snippet/dist/tui-code-snippet.js"></script>
<link rel="stylesheet" href="../bower_components/tui-calendar/dist/tui-calendar.css">

<!-- If you use the default popups, use this. -->
<link rel="stylesheet" href="../bower_components/tui-date-picker/dist/tui-date-picker.css">
<link rel="stylesheet" href="../bower_components/tui-time-picker/dist/tui-time-picker.css">
...
</head>
<body>
  ...
  <script type="text/javascript" src="../bower_components/tui-dom/dist/tui-dom.min.js"></script>
  <script type="text/javascript" src="../bower_components/tui-time-picker/dist/tui.time-picker/tui-time-picker.min.js"></script>
  <script type="text/javascript" src="../bower_components/tui-date-picker/dist/tui-date-picker.min.js"></script>
  <script type="text/javascript" src="../bower_components/tui-calendar/dist/tui-calendar.min.js"></script>
  ...
```

### HTML

Place a `<div></div>` where you want TOAST UI Calendar rendered.

```html
<body>
...
<div id="calendar" style="height: 800px;"></div>
...
</body>
```

### javascript

Initialize a calendar with options you want. Find out more options in [here](https://nhn.github.io/tui.calendar/latest/Options)

```javascript
var cal = new tui.Calendar('#calendar', {
  defaultView: 'month',
  taskView: true,
  template: {
    monthDayname: function(dayname) {
      return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
    }
    ...
  }
});
```
