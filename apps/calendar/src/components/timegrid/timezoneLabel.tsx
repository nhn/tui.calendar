import { FunctionComponent, h, VNode } from 'preact';

import Template from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timegrid';
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
    <div title={tooltip} className={addTimeGridPrefix('timezone-label')} style={{ width }}>
      <Template template="timezoneDisplayLabel" model={timezone} />
      {renderCollapseButton ? renderCollapseButton() : null}
    </div>
  );
};
