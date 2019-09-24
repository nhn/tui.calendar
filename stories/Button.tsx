import { h, RenderableProps, ComponentChild } from 'preact';

const Button = ({ children, ...props }: RenderableProps<ComponentChild>): JSX.Element => (
  <button className="button" type="button" {...props}>
    {children}
  </button>
);

export default Button;
