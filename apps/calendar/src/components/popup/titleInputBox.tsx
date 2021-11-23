import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

export const TitleInputBox: FunctionComponent = () => {
  const [isPrivate, setPrivate] = useState(false);

  return (
    <PopupSection>
      <div className={cls('popup-section-item', 'popup-section-title')}>
        <span className={cls('icon', 'ic-title')} />
        <input className={cls('content')} placeholder="Subject" />
      </div>
      <button
        className={cls('popup-section-item', 'popup-section-private', 'popup-button')}
        onClick={() => setPrivate((prev) => !prev)}
      >
        <span className={cls('icon', { 'ic-private': isPrivate, 'ic-public': !isPrivate })} />
      </button>
    </PopupSection>
  );
};
