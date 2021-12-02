import { FunctionComponent, h } from 'preact';

import { cls } from '@src/helpers/css';

const classNames = {
  sectionButton: cls('popup-section', 'section-button'),
  content: cls('content'),
  editIcon: cls('icon', 'ic-edit'),
  deleteIcon: cls('icon', 'ic-delete'),
  editButton: cls('edit-button'),
  deleteButton: cls('delete-button'),
  verticalLine: cls('vertical-line'),
};

export const EventDetailSectionButton: FunctionComponent = () => {
  return (
    <div className={classNames.sectionButton}>
      <button className={classNames.editButton}>
        <span className={classNames.editIcon} />
        <span className={classNames.content}>Edit</span>
      </button>
      <div className={classNames.verticalLine} />
      <button className={classNames.deleteButton}>
        <span className={classNames.deleteIcon} />
        <span className={classNames.content}>Delete</span>
      </button>
    </div>
  );
};
