import React, { Component, PropTypes } from 'react';
import { Dimensions, View } from 'react-native';

let { height } = Dimensions.get('window');

class DrawerContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    menuComponent: PropTypes.func,
    navState: PropTypes.object,
    position: PropTypes.string,
    scenes: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.element,
    ]),
    show: PropTypes.bool,
    width: PropTypes.number,
  };

  render() {
    const MenuComponent = this.props.menuComponent;

    return (
      <View style={[{ flex: 1, height, width: this.props.width, backgroundColor: 'white' }]}>
        <MenuComponent scenes={this.props.scenes} />
      </View>
    );
  }
}

export default DrawerContainer;
