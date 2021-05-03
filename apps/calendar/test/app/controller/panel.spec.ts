import { getResizeInfoByGrowth, PanelInfo, PanelRect } from '@src/controller/panel';

describe('panel controller', () => {
  it('getResizeInfoByGrowth() calculate new size and remain size by supplied growth value', () => {
    const panelProps: PanelInfo = {
      name: 'milestone',
    };
    const panelRect: PanelRect = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      resizerWidth: 0,
      resizerHeight: 0,
    };

    let actual = getResizeInfoByGrowth(panelProps, panelRect, 20, 20);

    expect(actual).toEqual({
      newWidth: 120,
      newHeight: 120,
      shrinkWidth: -20,
      shrinkHeight: -20,
    });

    actual = getResizeInfoByGrowth(panelProps, panelRect, -20, -20);

    expect(actual).toEqual({
      newWidth: 80,
      newHeight: 80,
      shrinkWidth: 20,
      shrinkHeight: 20,
    });
  });
});
