import { PropTypes } from 'react-native';

import Scene from './scene';

const propTypes = {
  ...Scene.propTypes,
  icon: PropTypes.func,
};

const defaultProps = {
  type: 'TAB',
};

let TabScene = () => null;

TabScene.propTypes = propTypes;
TabScene.defaultProps = defaultProps;

export default TabScene;
