import { FunctionComponent, h } from 'preact';

import { useTheme } from '@src/components/hooks/theme';
import CloseButton from '@src/components/popup/closeButton';
import Template from '@src/components/template';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';

interface Props {
  date: TZDate;
}

export const HEIGHT = 44;

const SeeMoreHeader: FunctionComponent<Props> = ({ date }) => {
  const { month } = useTheme();

  const style = {
    height: HEIGHT,
    backgroundColor: month.moreViewTitle.backgroundColor,
  };

  const moreTitle = {
    ymd: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    date: date.getDate(),
  };

  return (
    <div className={cls('see-more-header')} style={style}>
      <Template template="monthMoreTitleDate" model={moreTitle} />
      <CloseButton />
    </div>
  );
};

export default SeeMoreHeader;
