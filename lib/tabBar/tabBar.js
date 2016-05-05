import React, { Component, PropTypes } from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './tabBar.style';

class TabBar extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),
    onSelectTab: PropTypes.func,
    tabBarStyle: View.propTypes.style,
  };

  render() {
    return (
      <View style={[styles.tabBar, this.props.tabBarStyle]}>
        {this.props.children.map((child, index) => {
          let onSelect = () => this._handleTabSelect(index, child.key);
          return (
            <TouchableOpacity key={index} style={styles.tab} onPress={onSelect}>
              {child}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  _handleTabSelect = (index, key) => this.props.onSelectTab(index, key);
}

export default TabBar;
