import { h, FunctionComponent } from 'preact';

import { cls } from '@src/util/cssHelper';
import ExceedCountButton from '@src/components/daygrid/exceedCountButton';

enum CellBarType {
  header = 'header',
  footer = 'footer',
}

interface CellBarProps {
  type?: CellBarType;
  exceedCount?: number;
  date: number;
  onClickExceedCount: () => void;
}

const CellBar: FunctionComponent<CellBarProps> = ({
  type = CellBarType.header,
  exceedCount = 0,
  date,
  onClickExceedCount,
}) => {
  // @TODO: date 템플릿 적용 필요 / 오늘 표시
  return (
    <div className={cls(`grid-cell-${type}`)}>
      <span className={cls('grid-cell-date')}>{date}</span>
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
