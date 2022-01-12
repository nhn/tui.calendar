import { FunctionComponent, h } from 'preact';

import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { PopupType } from '@src/slices/popup';

import { EventFormPopupParam } from '@t/store';

const classNames = {
  sectionButton: cls('popup-section', 'section-button'),
  content: cls('content'),
  editIcon: cls('icon', 'ic-edit'),
  deleteIcon: cls('icon', 'ic-delete'),
  editButton: cls('edit-button'),
  deleteButton: cls('delete-button'),
  verticalLine: cls('vertical-line'),
};

export const EventDetailSectionButton: FunctionComponent<EventFormPopupParam> = ({
  isCreationPopup,
  event,
  title,
  location,
  start,
  end,
  isAllday,
  isPrivate,
  eventState,
  popupArrowPointPosition,
}) => {
  const { show } = useDispatch('popup');

  const onClickEditButton = () =>
    show({
      type: PopupType.form,
      param: {
        isCreationPopup,
        event,
        title,
        location,
        start,
        end,
        isAllday,
        isPrivate,
        eventState,
        popupArrowPointPosition,
      },
    });

  return (
    <div className={classNames.sectionButton}>
      <button type="button" className={classNames.editButton} onClick={onClickEditButton}>
        <span className={classNames.editIcon} />
        <span className={classNames.content}>Edit</span>
      </button>
      <div className={classNames.verticalLine} />
      <button type="button" className={classNames.deleteButton}>
        <span className={classNames.deleteIcon} />
        <span className={classNames.content}>Delete</span>
      </button>
    </div>
  );
};
