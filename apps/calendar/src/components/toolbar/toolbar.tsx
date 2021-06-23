import { Fragment, FunctionComponent, h } from 'preact';

import Button from '@src/components/ui/button';
import { cls } from '@src/util/cssHelper';

import { ViewListMap } from '@t/option';
import { ToolbarProps } from '@t/toolbar';

interface ViewButton {
  name: string;
  value: string;
}
interface Props {
  currentViewName: string;
  viewButtons: ViewButton[];
  changeView: (viewName: string) => void;
}

const makeToolbarViewButtons = (viewConfigMap: ViewListMap) => {
  return Object.keys(viewConfigMap).reduce<ViewButton[]>((acc, viewType) => {
    const { router } = viewConfigMap[viewType];

    return router ? [...acc, { name: router.linkTitle, value: viewType }] : acc;
  }, []);
};

const ToolbarButtons: FunctionComponent<Props> = ({ currentViewName, viewButtons, changeView }) => {
  const getClassName = (viewName: string) =>
    `${cls('toolbar-button')} ${currentViewName === viewName ? cls('active') : ''}`;

  return (
    <Fragment>
      {viewButtons.map((buttonInfo) => (
        <Button
          key={buttonInfo.value}
          className={getClassName(buttonInfo.value)}
          onClick={changeView}
          {...buttonInfo}
        />
      ))}
    </Fragment>
  );
};

const Toolbar: FunctionComponent<ToolbarProps> = ({ viewName, components, go }) => {
  // @TODO: Toolbar 작성 필요
  return (
    <div className={cls('toolbar')}>
      <ToolbarButtons
        currentViewName={viewName}
        viewButtons={makeToolbarViewButtons(components)}
        changeView={go}
      />
    </div>
  );
};

export default Toolbar;
