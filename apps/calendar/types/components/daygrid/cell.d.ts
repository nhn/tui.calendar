type CSSValue = number | string;

type SeeMorePopupTheme = {
  titleHeight: string;
  titleMarginBottom: string;
  paddingBottom: string;
};

type SeeMoreOptions = {
  moreLayerSize: { width: number | null; height: number | null };
  scheduleGutter: number;
  scheduleHeight: number;
};

type SeeMoreRectParam = {
  cell: HTMLDivElement;
  grid: HTMLDivElement;
  appContainer: HTMLDivElement;
  theme: SeeMorePopupTheme;
  options: SeeMoreOptions;
  events: Event[];
};
