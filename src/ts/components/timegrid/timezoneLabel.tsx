import { h, VNode } from 'preact';
import { prefixer } from '@src/components/timegrid';
import { Template } from '@src/components/template';
import { TimezoneConfig } from '@src/model';

const styles = {
  timezoneLabel: prefixer('timezone-label')
};

interface TimezoneLabelProps {
  timezone: TimezoneConfig;
  width: string;
  renderCollapseButton?: () => VNode;
}

export function TimezoneLabel(props: TimezoneLabelProps) {
  const { width, timezone, renderCollapseButton } = props;
  const { tooltip = '' } = timezone;

  return (
    <div title={tooltip} className={styles.timezoneLabel} style={{ width }}>
      <Template template="timezoneDisplayLabel" model={timezone} />
      {renderCollapseButton ? renderCollapseButton() : null}
    </div>
  );
}

TimezoneLabel.displayName = 'TimezoneLabel';
TimezoneLabel.defaultProps = {
  width: '72px'
};
