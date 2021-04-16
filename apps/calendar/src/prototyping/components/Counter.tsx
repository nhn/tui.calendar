import { FunctionComponent, h } from 'preact';

interface Props {
  onIncrement: () => void;
  onDecrement: () => void;
  number: number;
}

const counterStyle = {
  width: 300,
  border: '2px solid #00f',
  padding: 10,
};

const Counter: FunctionComponent<Props> = ({ onIncrement, onDecrement, number }) => {
  return (
    <div style={counterStyle}>
      <h2>Counter</h2>
      <h3>{number}</h3>
      <div>
        <button type="button" onClick={onIncrement}>
          +1
        </button>
        <button type="button" onClick={onDecrement}>
          -1
        </button>
      </div>
    </div>
  );
};

export default Counter;
