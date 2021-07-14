type CSSValue = number | string;

type SeeMorePopupTheme = {
  headerHeight: number;
  headerMarginBottom: number;
  containerPaddingBottom: number;
};

type SeeMoreOptions = {
  moreLayerSize: { width: number | null; height: number | null };
  eventHeight: number;
  eventMarginTop: number;
};

type SeeMoreRectParam = {
  cell: HTMLDivElement;
  grid: HTMLDivElement;
  appContainer: HTMLDivElement;
  popupSize: { width: number; height: number };
};
