module.exports = (cb = (action) => action) => (
  {
    push(key, props) {
      return cb({ key, type: 'push', ...props });
    },
    pop(props) {
      return cb({ type: 'pop', ...props });
    },
    popTo(key, props) {
      return cb({ key, type: 'popTo', ...props });
    },
    modal(key, props) {
      return cb({ key, type: 'modal', ...props });
    },
  }
);
