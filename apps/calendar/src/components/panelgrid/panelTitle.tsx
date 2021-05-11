import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import { Template } from '@src/components/template';
import { TemplateName } from '@src/template/default';

type PanelTitleTemplate = Extract<TemplateName, 'milestoneTitle' | 'taskTitle' | 'alldayTitle'>;

interface Props {
  width: number;
  template: Extract<TemplateName, 'milestone' | 'task' | 'allday'>;
  model: any;
}

// @TODO: apply Template after month view merged
export const PanelTitle: FunctionComponent<Props> = ({ width, template, model }) => {
  const panelTitleTemplate = `${template}Title` as PanelTitleTemplate;

  return (
    <div className={cls('panel-title')} style={{ width }}>
      <Template template={panelTitleTemplate} model={model} />
    </div>
  );
};
