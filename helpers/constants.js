/*
** custom screen size values
*/
export const SMALL = Symbol('small');
export const MEDIUM = Symbol('medium');
export const LARGE = Symbol('large');

/*
**props/types of modal type/content
*/
//type of modal showing
export const CONFIRM = Symbol('confirm');
export const ALERT = Symbol('alert-saving');
export const NONE = Symbol('no-modal');
//what button pressed?
export const YES = Symbol('modal-says-yes');
export const NO = Symbol('modal-says-no');
export const PENDING = Symbol('modal-says-no');