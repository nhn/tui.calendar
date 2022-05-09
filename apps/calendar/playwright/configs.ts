// eslint-disable-next-line no-process-env
const PORT = process.env.CI ? 8080 : 6006;

const generatePageUrl = (viewId: string) =>
  `http://localhost:${PORT}/iframe.html?id=${viewId}&args=&viewMode=story`;

export const DAY_VIEW_PAGE_URL = generatePageUrl('views-dayview--fixed-events');

export const WEEK_VIEW_PAGE_URL = generatePageUrl('views-weekview--fixed-events');

export const MONTH_VIEW_EMPTY_PAGE_URL = generatePageUrl('e2e-month-view--empty-month-view');

export const MONTH_VIEW_PAGE_URL = generatePageUrl('e2e-month-view--month-view-with-fixed-events');

export const WEEK_VIEW_TIMEZONE_PAGE_URL = generatePageUrl(
  'views-weekview--fixed-events-with-timezone'
);
