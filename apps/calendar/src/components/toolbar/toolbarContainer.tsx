import { ComponentType, FunctionComponent, h } from 'preact';

import { useRouter } from '@src/components/hooks/router';

import { ToolbarProps } from '@t/toolbar';

interface Props {
  viewName?: string;
}

export const ToolbarContainer: FunctionComponent<Props> = ({ viewName = 'toolbar' }) => {
  const { getComponent, viewName: currentViewName, components, go } = useRouter();
  const ToolbarComponent = getComponent(viewName) as ComponentType<ToolbarProps>;

  if (!ToolbarComponent) {
    return null;
  }

  return <ToolbarComponent viewName={currentViewName} go={go} components={components} />;
};

export default ToolbarContainer;
