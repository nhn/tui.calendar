import { FunctionComponent, h } from 'preact';

import { useCreateRouter } from '@src/contexts/router';

import { act, renderHook } from '@testing-library/preact-hooks';

const View1: FunctionComponent = () => {
  return <div>View1</div>;
};
const View2: FunctionComponent = () => {
  return <div>View2</div>;
};
const Toolbar: FunctionComponent = () => {
  return <div>Toolbar</div>;
};

const view1 = {
  component: View1,
  router: {
    linkTitle: 'View1',
  },
};

const view2 = {
  component: View2,
  router: {
    linkTitle: 'View2',
  },
};

const toolbar = {
  component: Toolbar,
};

const setup = () => {
  const { result } = renderHook(() =>
    useCreateRouter({ initialView: 'view1', components: { view1, view2, toolbar } })
  );

  return { result };
};

describe('useCreateRouter', () => {
  it('should initialize router data, if initialView and components are passed', () => {
    const { result } = setup();

    expect(result.current).toEqual({
      viewName: 'view1',
      components: { view1, view2, toolbar },
      getComponent: expect.any(Function),
      getCurrentComponent: expect.any(Function),
      go: expect.any(Function),
    });
  });

  it('should return the component for the passed routerKey', () => {
    const { result } = setup();

    expect(result.current?.getComponent('toolbar')).toEqual(Toolbar);
  });

  it('should throw an error if you use a routerKey that is not registered', () => {
    const { result } = setup();
    const getComponentFn = result.current?.getComponent.bind(this, 'view3');

    expect(getComponentFn).toThrowError("The routerKey 'view3' is not registered.");
  });

  it('should get the currently selected component', () => {
    const { result } = setup();

    expect(result.current?.getCurrentComponent()).toEqual(View1);
  });

  it('should change current view', () => {
    const { result } = setup();

    act(() => {
      result.current?.go('view2');
    });

    expect(result.current?.viewName).toEqual('view2');
  });
});
