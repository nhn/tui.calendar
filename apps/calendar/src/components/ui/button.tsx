import { FunctionComponent, h } from 'preact';

interface ButtonProps {
  name: string;
  value: string;
  className: string;
  onClick: (value: string) => void;
}

const Button: FunctionComponent<ButtonProps> = ({ name, onClick, value, className }) => {
  return (
    <button type="button" className={className} onClick={() => onClick(value)}>
      {name}
    </button>
  );
};

export default Button;
