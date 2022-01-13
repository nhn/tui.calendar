import { h } from 'preact';

import { cls } from '@src/helpers/css';

type Props = {
  width: string;
  left: string;
} & ExceedCountProps &
  CollapseButtonProps;

interface ExceedCountProps {
  index: number;
  exceedCount: number;
  isClicked: boolean;
  onClickExceedCount: (exceedCount: number) => void;
}

interface CollapseButtonProps {
  isClicked: boolean;
  isClickedIndex: boolean;
  onClickCollapseButton: () => void;
}

const DEFAULT_GRID_STYLE = {
  borderLeft: '1px solid #ddd',
};

function ExceedCount({ index, exceedCount, isClicked, onClickExceedCount }: ExceedCountProps) {
  const clickExceedCount = () => onClickExceedCount(index);
  const style = { display: isClicked ? 'none' : '' };

  return exceedCount && !isClicked ? (
    <span
      className={cls('weekday-exceed-in-week')}
      onClick={clickExceedCount}
      style={style}
    >{`+${exceedCount}`}</span>
  ) : null;
}

function CollapseButton({ isClicked, isClickedIndex, onClickCollapseButton }: CollapseButtonProps) {
  return isClicked && isClickedIndex ? (
    <span className={cls('weekday-exceed-in-week')} onClick={onClickCollapseButton}>
      <i className={cls('collapse-btn')} />
    </span>
  ) : null;
}

export function GridCell({
  width,
  left,
  index,
  exceedCount,
  isClicked,
  onClickExceedCount,
  isClickedIndex,
  onClickCollapseButton,
}: Props) {
  return (
    <div className={cls('panel-grid')} style={{ ...DEFAULT_GRID_STYLE, width, left }}>
      <ExceedCount
        index={index}
        exceedCount={exceedCount}
        isClicked={isClicked}
        onClickExceedCount={onClickExceedCount}
      />
      <CollapseButton
        isClickedIndex={isClickedIndex}
        isClicked={isClicked}
        onClickCollapseButton={onClickCollapseButton}
      />
    </div>
  );
}
