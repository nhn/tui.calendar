import type { ComponentChildren, h } from 'preact';

type PropsWithChildren<Props = {}> = Props & { children?: ComponentChildren };

type StyleProp = h.JSX.CSSProperties;

type FormEvent = h.JSX.TargetedEvent<HTMLFormElement, Event>;

type CalendarViewType = 'week' | 'month';
