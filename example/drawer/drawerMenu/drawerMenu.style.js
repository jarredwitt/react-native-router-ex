import { StyleSheet } from 'react-native';

let styles = {
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 20,
  },
  menuItem: {
    alignSelf: 'stretch',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
  },
  menuItemText: {
    marginLeft: 10,
  },
};

export default StyleSheet.create(styles);
