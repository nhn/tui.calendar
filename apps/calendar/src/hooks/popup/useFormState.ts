import { useReducer } from 'preact/hooks';

import type { EventObject, EventState } from '@t/events';

export enum FormStateActionType {
  setCalendarId = 'setCalendarId',
  setTitle = 'setTitle',
  setLocation = 'setLocation',
  setPrivate = 'setPrivate',
  setAllday = 'setAllday',
  setState = 'setState',
  reset = 'reset',
}

type FormStateAction =
  | { type: FormStateActionType.setCalendarId; calendarId: string }
  | { type: FormStateActionType.setTitle; title: string }
  | { type: FormStateActionType.setLocation; location: string }
  | { type: FormStateActionType.setPrivate; isPrivate: boolean }
  | { type: FormStateActionType.setAllday; isAllday: boolean }
  | { type: FormStateActionType.setState; state: EventState }
  | { type: FormStateActionType.reset; event: EventObject };

export type FormStateDispatcher = (action: FormStateAction) => void;

function formStateReducer(state: EventObject, action: FormStateAction): EventObject {
  switch (action.type) {
    case FormStateActionType.setCalendarId:
      return { ...state, calendarId: action.calendarId };
    case FormStateActionType.setTitle:
      return { ...state, title: action.title };
    case FormStateActionType.setLocation:
      return { ...state, location: action.location };
    case FormStateActionType.setPrivate:
      return { ...state, isPrivate: action.isPrivate };
    case FormStateActionType.setAllday:
      return { ...state, isAllday: action.isAllday };
    case FormStateActionType.setState:
      return { ...state, state: action.state };
    case FormStateActionType.reset:
      return { ...state, ...action.event };

    default:
      return state;
  }
}

export function useFormState(
  initialState: Pick<
    EventObject,
    'calendarId' | 'title' | 'location' | 'isPrivate' | 'isAllday' | 'state'
  >
) {
  return useReducer(formStateReducer, initialState);
}
