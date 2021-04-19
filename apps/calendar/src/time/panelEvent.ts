import { isWeekend } from '@src/time/datetime';
import { GridInfoList } from '@t/panel';

const getWeekendCount = (gridInfoList: GridInfoList) =>
  gridInfoList.filter((gridInfo) => isWeekend(gridInfo.getDay())).length;

export const getPanelEventInfo = ({
  gridInfoList,
  narrowWeekend,
  totalWidth,
}: {
  gridInfoList: GridInfoList;
  narrowWeekend: boolean;
  totalWidth: number;
}) => {
  const weekendCount = getWeekendCount(gridInfoList);
  const gridCellCount = gridInfoList.length;
  const isAllWeekend = weekendCount === gridCellCount;
  const widthPerDay =
    totalWidth /
    (narrowWeekend && !isAllWeekend ? gridCellCount * 2 - weekendCount : gridCellCount);

  const widthList: number[] = gridInfoList.map((gridInfo) => {
    const day = gridInfo.getDay();

    if (!narrowWeekend || isAllWeekend) {
      return widthPerDay;
    }

    return isWeekend(day) ? widthPerDay : widthPerDay * 2;
  });
  const leftList = widthList.reduce<number[]>((acc, _, index) => {
    if (!index) {
      return [0];
    }

    return [...acc, acc[index - 1] + widthList[index - 1]];
  }, []);

  return {
    widthList,
    leftList,
  };
};

export const getWidth = (widthList: number[], start: number, end: number) =>
  widthList.reduce((acc, width, index) => {
    if (start <= index && index <= end) {
      return acc + width;
    }

    return acc;
  }, 0);
