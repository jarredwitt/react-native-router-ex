import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './drawerMenu.style';


const DrawerMenu = (props) => (
  <View style={styles.mainView}>
    {props.scenes.map((scene, index) => {
      let select = () => props.switch(index, scene.key);
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
  switch: PropTypes.func,
};


const mapDispatchToProps = (dispatch, ownProps) => ({
  switch: (index, key) => dispatch(ownProps.navigate.switch(index, key)),
});

export default connect(null, mapDispatchToProps)(DrawerMenu);
