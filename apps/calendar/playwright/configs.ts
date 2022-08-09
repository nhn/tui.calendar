const PORT = process.env.CI ? 8080 : 6006;

const generatePageUrl = (viewId: string) =>
  `http://localhost:${PORT}/iframe.html?id=${viewId}&args=&viewMode=story`;

export const DAY_VIEW_PAGE_URL = generatePageUrl('e2e-day-view--fixed-events');

export const WEEK_VIEW_PAGE_URL = generatePageUrl('e2e-week-view--fixed-events');

export const WEEK_VIEW_TIMEZONE_PAGE_URL = generatePageUrl(
  'e2e-week-view--different-primary-timezone'
);

export const WEEK_VIEW_DUPLICATE_EVENTS_PAGE_URL = generatePageUrl(
  'e2e-week-view--duplicate-events'
);

export const WEEK_VIEW_HOUR_START_OPTION_PAGE_URL = generatePageUrl(
  'e2e-week-view--hour-start-option'
);

export const MONTH_VIEW_EMPTY_PAGE_URL = generatePageUrl('e2e-month-view--empty');

export const MONTH_VIEW_PAGE_URL = generatePageUrl('e2e-month-view--fixed-events');
