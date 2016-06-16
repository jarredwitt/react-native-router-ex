import { StyleSheet } from 'react-native';

let styles = {
  tab: {
    flex: 1,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
  },
};

export default StyleSheet.create(styles);
