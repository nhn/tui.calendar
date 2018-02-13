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
...
</head>
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

Initialize a calendar with options you want. Find out more options in [here](https://nhnent.github.io/tui.calendar/latest/global.html#Options)

```javascript
var cal = new tui.Calendar('#calendar', {
  defaultView: 'month',
  taskView: true,
  template: {
    monthGridHeader: function(model) {
          var date = new Date(model.date);
          var template = '<span class="tui-full-calendar-weekday-grid-date">' + date.getDate() + '</span>';
          return template;
      }
  }
});
```