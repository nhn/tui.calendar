import { h, RenderableProps } from 'preact';

import { cls } from '@src/util/cssHelper';
import { Milestone } from '@src/components/panel/milestone';

interface WrapperProps {
  style?: Record<string, any>;
  position: string;
  height: string;
}

export default { title: 'Panel' };

function Wrapper({ children, style, position, height }: RenderableProps<WrapperProps>) {
  return (
    <div className={cls('layout')} style={{ position, height, ...style }}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  position: 'relative',
  height: '500px',
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
