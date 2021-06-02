import { h, FunctionComponent } from 'preact';

import Template from '@src/components/template';

import { cls } from '@src/util/cssHelper';
import ExceedCountButton from '@src/components/daygrid/exceedCountButton';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';

enum CellBarType {
  header = 'header',
  footer = 'footer',
}

interface CellBarProps {
  type?: CellBarType;
  exceedCount?: number;
  date: TZDate;
  onClickExceedCount: () => void;
}

const CellBar: FunctionComponent<CellBarProps> = ({
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
    isOtherMonth: true,
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
        <ExceedCountButton
          number={exceedCount}
          clickHandler={onClickExceedCount}
          className={cls('grid-cell-more-events')}
        />
      ) : null}
    </div>
  );
};

export default CellBar;
