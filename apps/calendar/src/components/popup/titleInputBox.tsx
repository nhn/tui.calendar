import { h } from 'preact';
import type { ChangeEventHandler } from 'preact/compat';

import { PopupSection } from '@src/components/popup/popupSection';
import { cls } from '@src/helpers/css';
import type { FormStateDispatcher } from '@src/hooks/popup/useFormState';
import { FormStateActionType } from '@src/hooks/popup/useFormState';
import { useStringOnlyTemplate } from '@src/hooks/template/useStringOnlyTemplate';

interface Props {
  title?: string;
  isPrivate?: boolean;
  formStateDispatch: FormStateDispatcher;
}

const classNames = {
  popupSectionItem: cls('popup-section-item', 'popup-section-title'),
  privateButton: cls('popup-section-item', 'popup-section-private', 'popup-button'),
  titleIcon: cls('icon', 'ic-title'),
  content: cls('content'),
};

export function TitleInputBox({ title, isPrivate = false, formStateDispatch }: Props) {
  const titlePlaceholder = useStringOnlyTemplate({
    template: 'titlePlaceholder',
    defaultValue: 'Subject',
  });

  const togglePrivate = () =>
    formStateDispatch({ type: FormStateActionType.setPrivate, isPrivate: !isPrivate });

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    formStateDispatch({ type: FormStateActionType.setTitle, title: e.currentTarget.value });
  };

  return (
    <PopupSection>
      <div className={classNames.popupSectionItem}>
        <span className={classNames.titleIcon} />
        <input
          name="title"
          className={classNames.content}
          placeholder={titlePlaceholder}
          value={title}
          onChange={handleInputChange}
          required
        />
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
}
