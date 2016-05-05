import { PropTypes } from 'react';

const propTypes = {
  initialScene: PropTypes.string,
  type: PropTypes.string,
};

const defaultProps = {
  type: 'TABS',
};

let RootScene = () => null;

RootScene.propTypes = propTypes;
RootScene.defaultProps = defaultProps;

export default RootScene;
