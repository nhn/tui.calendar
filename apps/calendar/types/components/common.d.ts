import { h } from 'preact';

type StyleProp = h.JSX.CSSProperties;

type FormEvent = h.JSX.TargetedEvent<HTMLFormElement, Event>;

type SubmitHandler = h.JSX.EventHandler<FormEvent>;

type CalendarViewType = 'week' | 'month';
