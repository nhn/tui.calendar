import { FunctionComponent, h } from 'preact';

import MoreEventsButton from '@src/components/dayGridMonth/moreEventsButton';
import Template from '@src/components/template';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';

enum CellBarType {
  header = 'header',
  footer = 'footer',
}

interface Props {
  type?: CellBarType;
  exceedCount?: number;
  date: TZDate;
  onClickExceedCount: () => void;
}

const CellHeader: FunctionComponent<Props> = ({
  type = CellBarType.header,
  exceedCount = 0,
  date,
  onClickExceedCount,
}) => {
  const ymd = toFormat(date, 'YYYYMMDD');
  const todayYmd = toFormat(new TZDate(), 'YYYYMMDD');
  const model = {
    date: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    hiddenEventCount: exceedCount,
    isOtherMonth: true, // @TODO: 현재 렌더링된 월간뷰와 셀 날짜의 월을 비교
    isToday: ymd === todayYmd,
    month: date.getMonth(),
    ymd,
  };

  return (
    <div className={cls(`grid-cell-${type}`)}>
      <span className={cls('grid-cell-date')}>
        <Template template="monthGridHeader" model={model} />
      </span>
      {exceedCount ? (
        <MoreEventsButton
          number={exceedCount}
          clickHandler={onClickExceedCount}
          className={cls('grid-cell-more-events')}
        />
      ) : null}
    </div>
  );
};

export default CellHeader;
