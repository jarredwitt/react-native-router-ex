import { POP, POP_TO, PUSH, MODAL, MODAL_POP, SWITCH, TOGGLE_LEFT_DRAWER, TOGGLE_RIGHT_DRAWER } from './constants';

module.exports = (cb = (action) => action) => (
  {
    push(key, props) {
      return cb({ key, type: PUSH, props });
    },
    pop(props) {
      return cb({ type: POP, props });
    },
    popTo(key, props) {
      return cb({ key, type: POP_TO, props });
    },
    modal(key, props) {
      return cb({ key, type: MODAL, props });
    },
    modalPop(props) {
      return cb({ type: MODAL_POP, props });
    },
    switch(index, key) {
      return cb({ type: SWITCH, key, index });
    },
    toggleLeftDrawer(props) {
      return cb({ type: TOGGLE_LEFT_DRAWER, props });
    },
    toggleRightDrawer(props) {
      return cb({ type: TOGGLE_RIGHT_DRAWER, props });
    },
  }
);
