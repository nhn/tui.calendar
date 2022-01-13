import { h, VNode } from 'preact';

import Template from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { cls } from '@src/helpers/css';

import { TimezoneConfig } from '@t/options';

interface Props {
  timezone: TimezoneConfig;
  width?: string;
  renderCollapseButton?: () => VNode;
}

export function TimezoneLabel({ width = '72px', timezone, renderCollapseButton }: Props) {
  const { tooltip = '' } = timezone;

  return (
    <div title={tooltip} className={cls(addTimeGridPrefix('timezone-label'))} style={{ width }}>
      <Template template="timezoneDisplayLabel" model={timezone} />
      {renderCollapseButton ? renderCollapseButton() : null}
    </div>
  );
}
