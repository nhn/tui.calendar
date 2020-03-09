import { h } from 'preact';
import { useCallback, useState, useRef, useEffect } from 'preact/hooks';
import TZDate from '@src/time/date';
import range from 'tui-code-snippet/array/range';
import { addDate, clone } from '@src/time/datetime';
import { MultipleTimezones } from './multipleTimezones';
import { Column } from './column';
import { TimeUnit, TimezoneConfig } from '@src/model';
import { TimeProps } from '@src/components/timegrid/times';
import { className as timegridClassName, prefixer } from '@src/components/timegrid';
import { cls } from '@src/util/cssHelper';
import { toPx, toPercent } from '@src/util/units';
import Schedule from '@src/model/schedule';

const classNames = {
  timegrid: cls(timegridClassName),
  scrollArea: prefixer('scroll-area'),
  columns: prefixer('columns')
};

interface ColumnInfo {
  unit: TimeUnit;
  start: TZDate;
  end: TZDate;
  times: TimeProps[];
}
interface Props {
  currentTime: TZDate;
  unit: TimeUnit;
  timesWidth: number;
  timezones: TimezoneConfig[];
  columnInfoList: ColumnInfo[];
  events: Schedule[];
}

function calculateLeft(timesWidth: number, timezones: Array<any>) {
  return timesWidth * timezones.length;
}

function make24Hours(start: TZDate) {
  return range(0, 25).map(hour => {
    const time = clone(start);
    time.setHours(hour, 0, 0, 0);

    return time;
  });
}

export function TimeGrid(props: Props) {
  const { currentTime, columnInfoList, timesWidth, timezones = [{}], events } = props;
  const showTimezoneLabel = timezones.length > 1;
  const columWidth = toPercent(100 / columnInfoList.length);

  const ref = useRef<HTMLDivElement>();
  const [stickyContainer, setStickyContainer] = useState<HTMLElement | null>(null);
  const [left, setLeft] = useState(calculateLeft(timesWidth, timezones));
  const onChangeCollapsed = useCallback(
    (collapsed: boolean) => {
      if (collapsed) {
        setLeft(timesWidth);
      } else {
        setLeft(calculateLeft(timesWidth, timezones));
      }
    },
    [timesWidth, timezones]
  );

  useEffect(() => {
    if (ref.current) {
      setStickyContainer(ref.current);
    }
  }, [ref]);

  return (
    <div className={classNames.timegrid}>
      <div className={classNames.scrollArea}>
        <MultipleTimezones
          timezones={timezones}
          currentTime={currentTime}
          showTimezoneLabel={showTimezoneLabel}
          width={toPx(timesWidth)}
          stickyContainer={stickyContainer}
          onChangeCollapsed={onChangeCollapsed}
        />
        <div className={classNames.columns} style={{ left }}>
          {columnInfoList.map(({ start }, index) => {
            return (
              <Column key={index} width={columWidth} times={make24Hours(start)} events={events} />
            );
          })}
        </div>
      </div>
      <div ref={ref}></div>
    </div>
  );
}
TimeGrid.displayName = 'TimeGrid';
TimeGrid.defaultProps = {
  currentTime: new TZDate(),
  unit: 'hour',
  columnInfoList: range(0, 7).map(day => {
    const start = addDate(new TZDate(), day);
    const end = addDate(new TZDate(), day + 1);

    return {
      start,
      end
    };
  }),
  timesWidth: 72,
  timezones: [{}]
} as Props;
