import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { prefixer } from '@src/components/timegrid';
import { cls, classnames } from '@src/util/cssHelper';
import { noop } from '@src/util';

const classNames = {
  collapseButton: prefixer('collapse-button'),
};

interface Props {
  collapsed: boolean;
  onClick: (collapsed: boolean) => void;
}

export function CollapseButton(props: Props) {
  const { collapsed, onClick = noop } = props;
  const iconClassName = classnames(cls('icon'), {
    [cls('ic-arrow-right')]: collapsed,
    [cls('ic-arrow-left')]: !collapsed,
  });
  const memoizedOnClick = useCallback(() => {
    return onClick(collapsed);
  }, [collapsed, onClick]);

  return (
    <div className={classNames.collapseButton} onClick={memoizedOnClick}>
      <span className={iconClassName}></span>
    </div>
  );
}
CollapseButton.displayName = 'CollapseButton';
CollapseButton.defaultProps = {
  collapsed: false,
  onClick: noop,
};
