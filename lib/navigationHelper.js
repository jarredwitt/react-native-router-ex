import { POP, POP_TO, PUSH, MODAL, MODAL_POP, REPLACE, TOGGLE_LEFT_DRAWER, TOGGLE_RIGHT_DRAWER } from './constants';

module.exports = {
  push(key, props) {
    return { key, type: PUSH, props };
  },
  pop(props) {
    return { type: POP, props };
  },
  popTo(key, props) {
    return { key, type: POP_TO, props };
  },
  modal(key, props) {
    return { key, type: MODAL, props };
  },
  modalPop(props) {
    return { type: MODAL_POP, props };
  },
  replace(index, key) {
    return { type: REPLACE, key, index };
  },
  toggleLeftDrawer(props) {
    return { type: TOGGLE_LEFT_DRAWER, props };
  },
  toggleRightDrawer(props) {
    return { type: TOGGLE_RIGHT_DRAWER, props };
  },
};
