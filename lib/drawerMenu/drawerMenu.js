import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './drawerMenu.style';

class DrawerMenu extends Component {
  static propTypes = {

  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', paddingTop: 20 }}>
        {this.props.scenes.map((scene, index) => {
          return (
            <TouchableOpacity key={index} style={{ alignSelf: 'stretch', height: 50, borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.1)', justifyContent: 'center' }}>
              <Text style={{ marginLeft: 10 }}>{scene.props.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  _handleTabSelect = (index, key) => this.props.onSelectTab(index, key);
}

export default DrawerMenu;
