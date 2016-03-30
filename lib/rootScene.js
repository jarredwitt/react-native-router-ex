import { PropTypes } from 'react-native';

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
