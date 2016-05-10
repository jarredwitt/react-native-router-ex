import { POP, POP_TO, PUSH, MODAL, MODAL_POP } from './constants';

module.exports = (cb = (action) => action) => (
  {
    push(key, props) {
      return cb({ key, type: PUSH, ...props });
    },
    pop(props) {
      return cb({ type: POP, ...props });
    },
    popTo(key, props) {
      return cb({ key, type: POP_TO, ...props });
    },
    modal(key, props) {
      return cb({ key, type: MODAL, ...props });
    },
    modalPop(props) {
      return cb({ props, type: MODAL_POP, ...props });
    },
  }
);
