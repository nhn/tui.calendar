import { h, FunctionComponent } from 'preact';

import Schedule from '@src/model/schedule';

interface EventInSeeMoreProps {
  event: Schedule;
}

const GridEvent: FunctionComponent<EventInSeeMoreProps> = (props) => {
  const {
    event: { title },
  } = props;

  // @TODO: 일정 타이틀 템플릿 적용
  return <div>{title}</div>;
};

export default GridEvent;
