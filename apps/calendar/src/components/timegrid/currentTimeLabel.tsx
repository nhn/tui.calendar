import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import TZDate from '@src/time/date';
import { TimeUnit } from '@src/model';
import { toPercent } from '@src/util/units';
import { getSize } from '@src/util/domutil';
import { Template } from '@src/components/template';
import { prefixer, timeFormats } from '@src/components/timegrid';

const classNames = {
  currentTime: prefixer('current-time'),
};

interface CurrentTimeLabelProps {
  unit: TimeUnit;
  top: number;
  time: TZDate;
  dateDifference: number;
}

export function CurrentTimeLabel(props: CurrentTimeLabelProps) {
  const { unit, dateDifference } = props;
  const top = toPercent(props.top);
  const time = props.time || new TZDate();
  const [topValue, setTop] = useState(top);
  const ref = useRef<HTMLDivElement>();
  const signRef = useRef<HTMLDivElement>();

  const adjustTopForCentering = () => {
    if (ref.current) {
      const { height } = getSize(ref.current);
      let half = Math.ceil(height / 2);

      if (signRef.current) {
        const { height: signHeight } = getSize(signRef.current);
        half += signHeight;
      }

      setTop(`calc(${top} - ${half}px)`);
    }
  };

  useEffect(adjustTopForCentering, [top]);

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
}

CurrentTimeLabel.displayName = 'CurrentTimeLabel';
CurrentTimeLabel.defaultProps = {
  dateDifference: 0,
};
