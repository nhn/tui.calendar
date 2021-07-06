interface Element {
  msMatchesSelector: (selectors: string) => boolean;
}

type MouseEventListener = (e: MouseEvent) => void;
type KeyboardEventListener = (e: KeyboardEvent) => void;
