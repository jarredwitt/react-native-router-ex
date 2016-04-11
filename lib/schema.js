import Scene from './scene';
import TabScene from './tabScene';

const propTypes = {
  ...Scene.propTypes,
  ...TabScene.propTypes,
};

const defaultProps = {
  type: 'SCHEMA',
};

let Schema = () => null;

Schema.propTypes = propTypes;
Schema.defaultProps = defaultProps;

export default Schema;
