import { FunctionComponent, h } from 'preact';

import CloseButton from '@src/components/popup/closeButton';
import Template from '@src/components/template';
import {
  MONTH_MORE_VIEW_HEADER_HEIGHT,
  MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
} from '@src/constants/style';
import { useTheme } from '@src/contexts/theme';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';

interface Props {
  date: TZDate;
}

const SeeMoreHeader: FunctionComponent<Props> = ({ date }) => {
  const { month } = useTheme();

  const style = {
    height: MONTH_MORE_VIEW_HEADER_HEIGHT,
    marginBottom: MONTH_MORE_VIEW_HEADER_MARGIN_BOTTOM,
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
