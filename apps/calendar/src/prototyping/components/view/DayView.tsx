import { FunctionComponent, h } from 'preact';
import TodoContainer from '@src/prototyping/containers/TodoContainer';

const DayView: FunctionComponent = () => {
  return (
    <div>
      <h1>I&#39;m a Day View!</h1>
      <TodoContainer />
    </div>
  );
};

export default DayView;
