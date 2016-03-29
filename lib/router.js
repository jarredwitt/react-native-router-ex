import React, { Component, PropTypes } from 'react-native';

import TabController from './tabController';

class Router extends Component {
  static propTypes = {
    scenes: PropTypes.object,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this._scenes = this._gatherScenes(props.scenes);
    this._sceneMap = this._createSceneMap(this._scenes);
  }
  render() {
    let scenes = [...this._scenes];
    let scene = this._scenes[0];
    return <TabController scenes={scenes.splice(1, scenes.length)} { ...scene } />;
  }
  _gatherScenes = (scenes) => {
    let stateScenes = [];

    let { children, ...otherProps } = scenes.props;

    let rootScene = {
      key: 'root',
      ...otherProps,
    };

    stateScenes.push(rootScene);

    let childScenes = children.map(c => ({
      key: c.key,
      ...c.props,
    }));

    return stateScenes.concat(childScenes);
  };
  _createSceneMap = (scenes) => {
    let map = {};
    scenes.forEach((s, i) => {
      map[s.key] = i;
    });

    return map;
  }
  _handleNavigation = (onNavigate) => (action) => {
    let _action = Object.assign({}, action);
    onNavigate(_action);
  }
}

export default Router;
