import { PropTypes } from 'react';

import Scene from './scene';

const propTypes = {
  ...Scene.propTypes,
  icon: PropTypes.func,
};

const defaultProps = {
  type: 'DRAWER',
};

const DrawerScene = () => null;

DrawerScene.propTypes = propTypes;
DrawerScene.defaultProps = defaultProps;

export default DrawerScene;
