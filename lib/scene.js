import { PropTypes, Text } from 'react-native';

const propTypes = {
  hideNavBar: PropTypes.bool,
  titleStyle: Text.propTypes.style,
  type: PropTypes.string,
  schema: PropTypes.string,
  renderBackButton: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
};

const defaultProps = {
  hideNavBar: false,
  type: 'SCENE',
};

let Scene = () => null;

Scene.propTypes = propTypes;
Scene.defaultProps = defaultProps;

export default Scene;
