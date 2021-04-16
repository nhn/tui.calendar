import { h, FunctionComponent } from 'preact';
import CounterContainer from '@src/prototyping/containers/CounterContainer';
import { useStore } from '@src/prototyping/hooks/store';

const MonthView: FunctionComponent = () => {
  const store = useStore();

  return (
    <div>
      <h1>I&#39;m a Month View!</h1>
      <CounterContainer />
    </div>
  );
};

export default MonthView;
