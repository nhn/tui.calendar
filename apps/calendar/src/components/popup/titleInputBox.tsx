import { FunctionComponent, h } from 'preact';

import { FormStateActionType, FormStateDispatcher } from '@src/components/popup/eventFormPopup';
import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';

interface Props {
  isPrivate?: boolean;
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-title'),
  privateButton: cls('popup-section-item', 'popup-section-private', 'popup-button'),
  titleIcon: cls('icon', 'ic-title'),
  content: cls('content'),
};

export const TitleInputBox: FunctionComponent<Props> = ({
  isPrivate = false,
  formStateDispatch,
}) => {
  const togglePrivate = () =>
    formStateDispatch({ type: FormStateActionType.setPrivate, isPrivate: !isPrivate });

  return (
    <PopupSection>
      <div className={classNames.popupSectionItem}>
        <span className={classNames.titleIcon} />
        <input name="title" className={classNames.content} placeholder="Subject" required />
      </div>
      <button type="button" className={classNames.privateButton} onClick={togglePrivate}>
        <span className={cls('icon', { 'ic-private': isPrivate, 'ic-public': !isPrivate })} />
        <input
          name="isPrivate"
          type="checkbox"
          className={cls('hidden-input')}
          value={isPrivate ? 'true' : 'false'}
          checked={isPrivate}
        />
      </button>
    </PopupSection>
  );
};
