import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavActions } from '../../../lib';

import styles from './drawerMenu.style';


const DrawerMenu = (props) => (
  <View style={styles.mainView}>
    {props.scenes.map((scene, index) => {
      let select = () => props.replace(index, scene.key);
      return (
        <TouchableOpacity key={index} onPress={select} style={styles.menuItem}>
          <Text style={styles.menuItemText}>{scene.props.title}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

DrawerMenu.propTypes = {
  scenes: PropTypes.array,
  replace: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => ({
  replace: (index, key) => dispatch(NavActions.replace(index, key)),
});

export default connect(null, mapDispatchToProps)(DrawerMenu);
