export interface Element {
  msMatchesSelector: (selectors: string) => boolean;
}

export type MouseEventListener = (e: MouseEvent) => void;
export type KeyboardEventListener = (e: KeyboardEvent) => void;
