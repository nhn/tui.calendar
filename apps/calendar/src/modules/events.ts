type Event = { id: string; title: string };

type Events = {
  events: Event[];
};

const initialState: Events = { events: [] };

const events = {
  name: 'events',
  state: initialState,
};

export default events;
