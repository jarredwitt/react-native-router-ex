import { PropTypes, Text } from 'react-native';

const propTypes = {
  direction: PropTypes.string,
  hideNavBar: PropTypes.bool,
  schema: PropTypes.string,
  renderBackButton: PropTypes.func,
  renderLeftButton: PropTypes.func,
  renderRightButton: PropTypes.func,
  renderTitle: PropTypes.func,
  titleStyle: Text.propTypes.style,
  type: PropTypes.string,
};

const defaultProps = {
  direction: 'vertical',
  hideNavBar: false,
  type: 'SCENE',
};

let Scene = () => null;

Scene.propTypes = propTypes;
Scene.defaultProps = defaultProps;

export default Scene;
