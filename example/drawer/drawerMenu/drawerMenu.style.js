import { StyleSheet } from 'react-native';

let styles = {
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuItem: {
    alignSelf: 'stretch',
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-end',
  },
  menuItemText: {
    marginLeft: 10,
    marginBottom: 10,
  },
};

export default StyleSheet.create(styles);
