import { FunctionComponent, h, JSX } from 'preact';

type Props = JSX.HTMLAttributes<HTMLButtonElement>;

export const Button: FunctionComponent<Props> = ({ children, ...rest }) => {
  return (
    <button {...rest} type="button">
      {children}
    </button>
  );
};
