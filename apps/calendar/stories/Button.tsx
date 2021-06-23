import { h, JSX, RenderableProps } from 'preact';

const Button = ({ children, ...props }: RenderableProps<any>): JSX.Element => (
  <button className="button" type="button" {...props}>
    {children}
  </button>
);

export default Button;
