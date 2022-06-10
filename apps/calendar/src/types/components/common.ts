import type { ComponentChildren, h } from 'preact';

export type PropsWithChildren<Props = {}> = Props & { children?: ComponentChildren };

export type StyleProp = h.JSX.CSSProperties;

export type FormEvent = h.JSX.TargetedEvent<HTMLFormElement, Event>;

export type CalendarViewType = 'week' | 'month';
