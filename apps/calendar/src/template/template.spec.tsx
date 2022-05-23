import { h } from 'preact';
import renderToString from 'preact-render-to-string';

import { Template } from '@src/components/template';
import { initCalendarStore, StoreProvider } from '@src/contexts/calendarStore';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { templates } from '@src/template/default';
import {
  getCommonWidth,
  getMonthEventBlock,
  getTimeEventBlock,
  registerTemplateConfig,
} from '@src/template/index';

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

  it('Template component renders html string with given template after sanitizing', () => {
    const store = initCalendarStore();
    const vdom = (
      <StoreProvider store={store}>
        <Template template="time" param={{ title: '<script></script>Custom Title 4' }} />
      </StoreProvider>
    );
    const html = renderToString(vdom);

    expect(html).toBe('<div class="toastui-calendar-template-time">Custom Title 4</div>');
  });

  it('getCommonWidth() returns css width percentage with given number.', () => {
    const result = getCommonWidth(30);

    expect(result).toBe('width:30%');
  });

  it('getCommonWidth() returns width: auto with not a number type.', () => {
    const result = getCommonWidth('30');

    expect(result).toBe('width: auto');
  });

  it('getTimeEventBlock() returns top(px), left(%), width(%), height(px) css.', () => {
    const uiModel = new EventUIModel(new EventModel());
    uiModel.top = 30;
    uiModel.left = 40;
    uiModel.width = 50;
    uiModel.height = 60;

    expect(getTimeEventBlock(uiModel)).toBe('top:30px;left:40%;width:50%;height:60px');
  });

  it('getMonthEventBlock() returns top(px), left(%), width(%), height(px) css.', () => {
    const uiModel = new EventUIModel(new EventModel());
    uiModel.top = 30;
    uiModel.left = 40;
    uiModel.width = 50;
    uiModel.height = 60;

    const result = getMonthEventBlock(uiModel, [], 2, 10);

    expect(result).toBe('top:68px;left:0%;width:0%;height:60px');
  });
});
