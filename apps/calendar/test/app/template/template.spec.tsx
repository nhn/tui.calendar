import { h } from 'preact';
import renderToString from 'preact-render-to-string';

import Template from '@src/components/template';
import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import {
  getCommonWidth,
  getMonthScheduleBlock,
  getTimeScheduleBlock,
  registerTemplateConfig,
} from '@src/template';
import { templates } from '@src/template/default';

describe('Render Template', () => {
  it('registerTemplateConfig() returns Template instance with given config and defaults.', () => {
    const templateConfig = { time: ({ title }: { title: string }) => title };
    const template = registerTemplateConfig(templateConfig);

    expect(template.time).toBe(template.time);
    expect(template.time).not.toBe(templates.time);
    expect(template.allday).not.toBeNull();
  });

  it(`template function returns given config function's return value.`, () => {
    const templateConfig = { popupSave: () => 'given' };
    const template = registerTemplateConfig(templateConfig);

    expect(templates.popupSave()).toBe('Save');
    expect(template.popupSave()).toBe('given');
  });

  it('Template component renders html string with given template', () => {
    const store = initCalendarStore();
    const vdom = (
      <StoreProvider store={store}>
        <Template template="time" model={{ title: 'Custom Title 4' }} />
      </StoreProvider>
    );
    const html = renderToString(vdom);

    expect(html).toBe('<span>Custom Title 4</span>');
  });

  it('getCommonWidth() returns css width percentage with given number.', () => {
    const result = getCommonWidth(30);

    expect(result).toBe('width:30%');
  });

  it('getCommonWidth() returns width: auto with not a number type.', () => {
    const result = getCommonWidth('30');

    expect(result).toBe('width: auto');
  });

  it('getTimeScheduleBlock() returns top(px), left(%), width(%), height(px) css.', () => {
    const viewModel = new ScheduleViewModel(new Schedule());
    viewModel.top = 30;
    viewModel.left = 40;
    viewModel.width = 50;
    viewModel.height = 60;

    expect(getTimeScheduleBlock(viewModel)).toBe('top:30px;left:40%;width:50%;height:60px');
  });

  it('getMonthScheduleBlock() returns top(px), left(%), width(%), height(px) css.', () => {
    const viewModel = new ScheduleViewModel(new Schedule());
    viewModel.top = 30;
    viewModel.left = 40;
    viewModel.width = 50;
    viewModel.height = 60;

    const result = getMonthScheduleBlock(viewModel, [], 2, 10);

    expect(result).toBe('top:68px;left:0%;width:0%;height:60px');
  });
});
