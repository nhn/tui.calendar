import { cls } from '@src/util/cssHelper';

export const className = 'timegrid';
export const prefixer = (selector: string) => cls(selector, `${className}-`);
