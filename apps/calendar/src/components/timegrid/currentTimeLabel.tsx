import { FunctionComponent, h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

import TZDate from '@src/time/date';
import { TimeUnit } from '@src/model';
import { toPercent } from '@src/util/units';
import { getSize } from '@src/util/dom';
import { Template } from '@src/components/template';
import { prefixer, timeFormats } from '@src/components/timegrid';

const classNames = {
  currentTime: prefixer('current-time'),
};

interface CurrentTimeLabelProps {
  unit: TimeUnit;
  top: number;
  time?: TZDate;
  dateDifference?: number;
}

export const CurrentTimeLabel: FunctionComponent<CurrentTimeLabelProps> = ({
  unit,
  dateDifference = 0,
  top,
  time = new TZDate(),
}) => {
  const defaultTop = toPercent(top);
  const [topValue, setTop] = useState(defaultTop);
  const ref = useRef<HTMLDivElement>(null);
  const signRef = useRef<HTMLDivElement>(null);

  const adjustTopForCentering = () => {
    if (ref.current) {
      const { height } = getSize(ref.current);
      let half = Math.ceil(height / 2);

      if (signRef.current) {
        const { height: signHeight } = getSize(signRef.current);
        half += signHeight;
      }

      setTop(`calc(${defaultTop} - ${half}px)`);
    }
  };

  useEffect(adjustTopForCentering, [defaultTop]);

  const model = {
    unit,
    time,
    format: timeFormats[unit],
  };

  return (
    <div className={classNames.currentTime} style={{ top: topValue }}>
      {dateDifference ? <div ref={signRef}>{`[${dateDifference}]`}</div> : null}
      <div ref={ref}>
        <Template template="timegridCurrentTime" model={model} />
      </div>
    </div>
  );
};
