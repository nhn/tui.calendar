type Event = { id: string; title: string };

type EventsState = {
  events: Event[];
};

const initialState: EventsState = { events: [] };

const events = {
  name: 'events',
  state: initialState,
};

export default events;
