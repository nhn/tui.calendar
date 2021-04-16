import { Fragment, FunctionComponent, h } from 'preact';
import { useCallback } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { ViewButton } from '@t/prototyping';

interface Props {
  currentViewName: string;
  viewButtons: ViewButton[];
  changeView: (viewName: string) => void;
}

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

const Toolbar: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h2>Currunt View: {props.currentViewName}</h2>
      <ToolbarButtons {...props} />
    </div>
  );
};

export default Toolbar;
