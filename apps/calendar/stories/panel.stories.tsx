import { h, RenderableProps } from 'preact';

import { cls } from '@src/util/cssHelper';
import { Milestone } from '@src/components/panel/milestone';

interface WrapperProps {
  style?: Record<string, any>;
  position: string;
}

export default { title: 'Panel' };

function Wrapper({ children, style, position }: RenderableProps<WrapperProps>) {
  return (
    <div className={cls('layout')} style={{ position, ...style }}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  position: 'relative',
};

export const milestone = () => {
  return (
    <Wrapper>
      <Milestone />
    </Wrapper>
  );
};

milestone.story = {
  name: 'milestone',
};
