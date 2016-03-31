module.exports = (cb) => (
  {
    push(key, props) {
      cb({ key, type: 'push', ...props });
    },
    pop(props) {
      cb({ type: 'pop', ...props });
    },
    modal(key, props) {
      cb({ key, type: 'modal', ...props });
    },
  }
);
