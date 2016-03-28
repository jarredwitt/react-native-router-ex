import { PropTypes } from 'react-native';

const propTypes = {
  hideNavBar: PropTypes.bool,
  type: PropTypes.string,
};

const defaultProps = {
  hideNavBar: true,
  type: 'TABS',
};

let RootScene = () => null;

RootScene.propTypes = propTypes;
RootScene.defaultProps = defaultProps;

export default RootScene;
