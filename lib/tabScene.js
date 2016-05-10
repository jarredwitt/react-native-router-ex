import { PropTypes } from 'react';

import Scene from './scene';

const propTypes = {
  ...Scene.propTypes,
  icon: PropTypes.func,
};

const defaultProps = {
  type: 'TAB',
};

const TabScene = () => null;

TabScene.propTypes = propTypes;
TabScene.defaultProps = defaultProps;

export default TabScene;
