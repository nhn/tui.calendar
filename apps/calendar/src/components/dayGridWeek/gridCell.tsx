import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { Template } from '@src/components/template';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';

type Props = {
  isLastCell: boolean;
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

function ExceedCount({ index, exceedCount, isClicked, onClickExceedCount }: ExceedCountProps) {
  const clickExceedCount = () => onClickExceedCount(index);
  const style = { display: isClicked ? 'none' : '' };

  return exceedCount && !isClicked ? (
    <span className={cls('weekday-exceed-in-week')} onClick={clickExceedCount} style={style}>
      <Template template="weekGridFooterExceed" param={exceedCount} />
    </span>
  ) : null;
}

function CollapseButton({ isClicked, isClickedIndex, onClickCollapseButton }: CollapseButtonProps) {
  return isClicked && isClickedIndex ? (
    <span className={cls('weekday-exceed-in-week')} onClick={onClickCollapseButton}>
      <Template template="collapseBtnTitle" />
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
  isLastCell,
}: Props) {
  const { borderRight, backgroundColor } = useTheme(useCallback((theme) => theme.week.dayGrid, []));
  const style = {
    width,
    left,
    borderRight: isLastCell ? 'none' : borderRight,
    backgroundColor,
  };

  return (
    <div className={cls('panel-grid')} style={style}>
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
