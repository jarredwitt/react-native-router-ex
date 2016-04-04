module.exports = (cb) => (
  {
    push(key, props) {
      return cb({ key, type: 'push', ...props });
    },
    pop(props) {
      return cb({ type: 'pop', ...props });
    },
    modal(key, props) {
      return cb({ key, type: 'modal', ...props });
    },
  }
);
