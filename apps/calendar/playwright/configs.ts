// eslint-disable-next-line no-process-env
const PORT = process.env.CI ? 8080 : 6006;

const generatePageUrl = (viewId: string) =>
  `http://localhost:${PORT}/iframe.html?id=${viewId}&args=&viewMode=story`;

export const DAY_VIEW_PAGE_URL = generatePageUrl('views-dayview--fixed-events');

export const WEEK_VIEW_PAGE_URL = generatePageUrl('views-weekview--fixed-events');

export const MONTH_VIEW_PAGE_URL = generatePageUrl('views-monthview--fixed-events');

export const MONTH_VIEW_BASIC_PAGE_URL = generatePageUrl('views-monthview--basic');

export const WEEK_VIEW_TIMEZONE_PAGE_URL = generatePageUrl(
  'views-weekview--fixed-events-with-timezone'
);
