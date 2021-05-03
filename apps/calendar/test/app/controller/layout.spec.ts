import { Direction, layoutPanels, limitPanelSize } from '@src/controller/layout';

describe('layout controller', () => {
  it('limitPanelSize() return length between (value, min, max) which can be null.', () => {
    expect(limitPanelSize(100, 200, 300)).toBe(200);
    expect(limitPanelSize(200, 100, 300)).toBe(200);
    expect(limitPanelSize(400, 100, 300)).toBe(300);

    expect(limitPanelSize(100, null, 300)).toBe(100);
    expect(limitPanelSize(null, 200, 300)).toBe(200);
    expect(limitPanelSize(null, null, 300)).toBe(null);
    expect(limitPanelSize(null, 200, null)).toBe(200);
    expect(limitPanelSize(100, null, null)).toBe(100);
    expect(limitPanelSize(null, null, null)).toBe(null);
  });

  it(`layoutPanels() can vertically layout panels with height`, () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          height: 200,
        },
        {
          name: 'milestone',
        },
      ],
      {
        direction: Direction.COLUMN,
      }
    );

    expect(panels[0].height).toBe(200);
    expect(panels[1].height).toBeNull();
  });

  it(`layoutPanels() can vertically layout panels with minHeight`, () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
        },
        {
          name: 'milestone',
          minHeight: 100,
        },
      ],
      {
        direction: Direction.COLUMN,
      }
    );

    expect(panels[0].height).toBeNull();
    expect(panels[1].height).toBe(100);
  });

  it(`layoutPanels() can horizontally layout panels with minWidth`, () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
        },
        {
          name: 'milestone',
          minWidth: 100,
        },
      ],
      {
        direction: Direction.ROW,
      }
    );

    expect(panels[0].width).toBeNull();
    expect(panels[1].width).toBe(100);
  });

  it(`layoutPanels() can vertically layout panels with maxExpandableHeight`, () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          expandable: true,
          height: 300,
          maxExpandableHeight: 200,
        },
        {
          name: 'milestone',
          expandable: true,
          height: 300,
          maxHeight: 100,
          maxExpandableHeight: 200,
        },
        {
          name: 'milestone',
          expandable: false,
          height: 300,
          maxHeight: 100,
          maxExpandableHeight: 200,
        },
      ],
      {
        direction: Direction.COLUMN,
      }
    );

    expect(panels[0].height).toBe(200);
    expect(panels[1].height).toBe(200);
    expect(panels[2].height).toBe(100);
  });

  it(`layoutPanels() can vertically layout panels with maxExpandableWidth`, () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          expandable: true,
          width: 300,
          maxExpandableWidth: 200,
        },
        {
          name: 'milestone',
          expandable: true,
          width: 300,
          maxWidth: 100,
          maxExpandableWidth: 200,
        },
        {
          name: 'milestone',
          expandable: false,
          width: 300,
          maxWidth: 100,
          maxExpandableWidth: 200,
        },
      ],
      {
        direction: Direction.ROW,
      }
    );

    expect(panels[0].width).toBe(200);
    expect(panels[1].width).toBe(200);
    expect(panels[2].width).toBe(100);
  });

  it('autoSize must be with LayoutConstraints.height/width', () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          height: 100,
          autoSize: 1,
        },
      ],
      {
        direction: Direction.COLUMN,
      }
    );

    expect(panels[0].height).toBe(null);
  });

  it('panels with autoSize behave like flex-grow and should be assigned same size within LayoutConstraints.height', () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          autoSize: 1,
        },
        {
          name: 'milestone',
          autoSize: 1,
        },
      ],
      {
        direction: Direction.COLUMN,
        height: 300,
      }
    );

    expect(panels[0].height).toBe(150);
    expect(panels[1].height).toBe(150);
  });

  it('panels with autoSize behave like flex-grow and should be assigned same size within LayoutConstraints.width', () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          autoSize: 1,
        },
        {
          name: 'milestone',
          autoSize: 1,
        },
      ],
      {
        direction: Direction.ROW,
        width: 300,
      }
    );

    expect(panels[0].width).toBe(150);
    expect(panels[1].width).toBe(150);
  });

  it('panels with autoSize behave like flex-grow and should be assigned panel size depending on LayoutConstraints.height/width', () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          autoSize: 2,
        },
        {
          name: 'milestone',
          autoSize: 1,
        },
      ],
      {
        direction: Direction.COLUMN,
        height: 300,
      }
    );

    expect(panels[0].height).toBe(200);
    expect(panels[1].height).toBe(100);
  });

  it('panels with autoSize behave like flex-grow and should be assigned panel size within remaining height', () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          height: 100,
        },
        {
          name: 'milestone',
          height: 100,
          autoSize: 2,
        },
        {
          name: 'milestone',
          height: 100,
        },
        {
          name: 'milestone',
          autoSize: 1,
        },
      ],
      {
        direction: Direction.COLUMN,
        height: 500,
      }
    );

    expect(panels[0].height).toBe(100);
    expect(panels[1].height).toBe(200);
    expect(panels[2].height).toBe(100);
    expect(panels[3].height).toBe(100);
  });

  it('size of panels with autoSize cannot be under 0', () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          height: 100,
        },
        {
          name: 'milestone',
          height: 300,
        },
        {
          name: 'milestone',
          height: 300,
        },
        {
          name: 'milestone',
          autoSize: 1,
        },
      ],
      {
        direction: Direction.COLUMN,
        height: 500,
      }
    );

    expect(panels[0].height).toBe(100);
    expect(panels[1].height).toBe(300);
    expect(panels[2].height).toBe(300);
    expect(panels[3].height).toBe(0);
  });

  it('A panel with the property "show" is false cannot be shown', () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          height: 100,
        },
        {
          name: 'milestone',
          height: 200,
          show: false,
        },
        {
          name: 'milestone',
          height: 300,
        },
        {
          name: 'milestone',
          autoSize: 1,
        },
      ],
      {
        direction: Direction.COLUMN,
        height: 500,
      }
    );

    expect(panels.length).toBe(3);
    expect(panels[0].height).toBe(100);
    expect(panels[1].height).toBe(300);
    expect(panels[2].height).toBe(100);
  });

  it(`A resizable panel's height contains the resizerHeight.`, () => {
    const panels = layoutPanels(
      [
        {
          name: 'milestone',
          height: 100,
        },
        {
          name: 'milestone',
          height: 100,
          resizable: true,
          resizerHeight: 5,
        },
        {
          name: 'milestone',
          height: 100,
        },
        {
          name: 'milestone',
          autoSize: 1,
        },
      ],
      {
        direction: Direction.COLUMN,
        height: 500,
      }
    );

    expect(panels[0].height).toBe(100);
    expect(panels[1].height).toBe(100);
    expect(panels[1].resizerHeight).toBe(5);
    expect(panels[2].height).toBe(100);
    expect(panels[3].height).toBe(195);
  });
});
