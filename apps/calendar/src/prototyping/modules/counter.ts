import { CounterState } from '@t/prototyping';

const intialState: CounterState = { number: 0 };

const counter = {
  namespace: 'counter',
  state: intialState,
  actions: {
    increment(state: CounterState) {
      return { ...state, number: state.number + 1 };
    },
    decrement(state: CounterState) {
      return { ...state, number: state.number - 1 };
    },
  },
};
export default counter;
