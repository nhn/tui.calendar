import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

const classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-title'),
  privateButton: cls('popup-section-item', 'popup-section-private', 'popup-button'),
  titleIcon: cls('icon', 'ic-title'),
  content: cls('content'),
};

export const TitleInputBox: FunctionComponent = () => {
  const [isPrivate, setPrivate] = useState(false);
  const togglePrivate = () => setPrivate((prev) => !prev);

  return (
    <PopupSection>
      <div className={classNames.popupSectionItem}>
        <span className={classNames.titleIcon} />
        <input className={classNames.content} placeholder="Subject" />
      </div>
      <button className={classNames.privateButton} onClick={togglePrivate}>
        <span className={cls('icon', { 'ic-private': isPrivate, 'ic-public': !isPrivate })} />
      </button>
    </PopupSection>
  );
};
