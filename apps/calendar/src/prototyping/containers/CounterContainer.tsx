import { h } from 'preact';
import Counter from '@src/prototyping/components/Counter';
import { useStore } from '@src/prototyping/hooks/store';

const CounterContainer = () => {
  const { state, actions } = useStore(['counter']);

  if (!state.counter) {
    return null;
  }

  if (!actions.counter) {
    return null;
  }

  const { number } = state.counter;
  const { increment, decrement } = actions.counter;

  return <Counter number={number} onIncrement={increment} onDecrement={decrement} />;
};

export default CounterContainer;
