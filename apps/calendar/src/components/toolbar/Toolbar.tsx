import { Fragment, FunctionComponent, h } from 'preact';
import { useCallback } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { useRouter } from '@src/components/hooks/router';
import { ViewListMap } from '@t/option';

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

    if (router) {
      acc.push({ name: router.linkTitle, value: viewType });
    }

    return acc;
  }, []);
};

interface ButtonProps {
  name: string;
  value: string;
  className: string;
  onClick: (value: string) => void;
}

const Button: FunctionComponent<ButtonProps> = ({ name, onClick, value, className }) => {
  return (
    <button type="button" className={className} onClick={() => onClick(value)}>
      {name}
    </button>
  );
};

const ToolbarButtons: FunctionComponent<Props> = ({ currentViewName, viewButtons, changeView }) => {
  const getClassName = useCallback(
    (viewName: string) => {
      return `${cls('toolbar-button')} ${currentViewName === viewName ? cls('active') : ''}`;
    },
    [currentViewName]
  );

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

const Toolbar: FunctionComponent = () => {
  const { viewName: currentViewName, components, goto: changeView } = useRouter();

  const props = {
    currentViewName,
    viewButtons: makeToolbarViewButtons(components),
    changeView,
  };

  console.log('[Toolbar]리렌더!');

  // @TODO: Toolbar 작성 필요
  return (
    <div className={cls('toolbar')}>
      <ToolbarButtons {...props} />
    </div>
  );
};

export default Toolbar;
