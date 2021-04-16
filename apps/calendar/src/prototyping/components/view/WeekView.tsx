import { h, FunctionComponent } from 'preact';
import CounterContainer from '@src/prototyping/containers/CounterContainer';
import TodoContainer from '@src/prototyping/containers/TodoContainer';

const WeekView: FunctionComponent = () => {
  return (
    <div>
      <h1>I&#39;m a Week View!</h1>
      <TodoContainer />
      <CounterContainer />
    </div>
  );
};

export default WeekView;
