// eslint-disable-next-line no-process-env
const PORT = process.env.CI ? 8080 : 6006;

export const WEEK_VIEW_PAGE_URL = `http://localhost:${PORT}/iframe.html?id=views-weekview--fixed-events&args=&viewMode=story`;

export const MONTH_VIEW_PAGE_URL = `http://localhost:${PORT}/iframe.html?id=views-monthview--fixed-events&args=&viewMode=story`;

export const MONTH_VIEW_BASIC_PAGE_URL = `http://localhost:${PORT}/iframe.html?id=views-monthview--basic&args=&viewMode=story`;
