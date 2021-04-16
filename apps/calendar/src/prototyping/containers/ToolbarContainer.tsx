import { h } from 'preact';
import { useRouter } from '@src/prototyping/hooks/router';
import Toolbar from '../components/Toolbar';
import { ViewButton, ViewListMap } from '@t/prototyping';

const makeToolbarViewButtons = (viewConfigMap: ViewListMap) => {
  return Object.keys(viewConfigMap).reduce<ViewButton[]>((acc, viewType) => {
    const { router } = viewConfigMap[viewType];

    if (router) {
      acc.push({ name: router.linkTitle, value: viewType });
    }

    return acc;
  }, []);
};

const ToolbarContainer = () => {
  const { viewName, components, goto } = useRouter();

  return (
    <Toolbar
      currentViewName={viewName}
      viewButtons={makeToolbarViewButtons(components)}
      changeView={goto}
    />
  );
};

export default ToolbarContainer;
