import { FunctionComponent, h, VNode } from 'preact';

import { prefixer } from '@src/components/timegrid';
import { Template } from '@src/components/template';
import { TimezoneConfig } from '@src/model';

interface Props {
  timezone: TimezoneConfig;
  width?: string;
  renderCollapseButton?: () => VNode;
}

export const TimezoneLabel: FunctionComponent<Props> = ({
  width = '72px',
  timezone,
  renderCollapseButton,
}) => {
  const { tooltip = '' } = timezone;

  return (
    <div title={tooltip} className={prefixer('timezone-label')} style={{ width }}>
      <Template template="timezoneDisplayLabel" model={timezone} />
      {renderCollapseButton ? renderCollapseButton() : null}
    </div>
  );
};
