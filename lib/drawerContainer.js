import React, { PropTypes } from 'react';
import { Dimensions, View } from 'react-native';

let { height } = Dimensions.get('window');

const propTypes = {
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

function DrawerContainer(props) {
  const MenuComponent = props.menuComponent;

  return (
    <View style={[{ flex: 1, height, width: props.width, backgroundColor: 'white' }]}>
      <MenuComponent scenes={props.scenes} />
    </View>
  );
}

DrawerContainer.propTypes = propTypes;

export default DrawerContainer;
