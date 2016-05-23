import React, { Component, PropTypes } from 'react';

import DrawerController from './drawerController';
import TabController from './tabController';

class Router extends Component {
  static propTypes = {
    initialScene: PropTypes.string,
    scenes: PropTypes.object,
    navState: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object,
  }

  constructor(props) {
    super(props);

    this._scenes = this._gatherScenes(props.scenes);
    this._sceneMap = this._createSceneMap(this._scenes);
  }
  render() {
    let scenes = [...this._scenes];
    let rootScene = this._scenes[0];

    switch (rootScene.type.toUpperCase()) {
      case 'DRAWER': {
        return <DrawerController navState={this.props.navState} dispatch={this.context.store.dispatch} initialScene={this.props.initialScene} scenes={scenes.splice(1, scenes.length)} { ...rootScene } />;
      }
      default:
      case 'TABS': {
        return <TabController navState={this.props.navState} dispatch={this.context.store.dispatch} initialScene={this.props.initialScene} scenes={scenes.splice(1, scenes.length)} { ...rootScene } />;
      }
    }
  }
  _gatherScenes = (scenes) => {
    let stateScenes = [];

    let { children, ...otherProps } = scenes.props;

    let rootScene = {
      key: 'root',
      ...otherProps,
    };

    stateScenes.push(rootScene);

    // Make sure that we can handle only have one tab.
    if (!children.length) {
      children = [children];
    }

    let schemas = children.filter(s => s.props.type === 'SCHEMA');

    let childScenes = children.map(c => {
      let child = {
        key: c.key,
        ...c.props,
      };

      if (c.props.schema) {
        let schema = schemas.find(s => s.key === c.props.schema);
        let { type, ...schemaProps } = schema.props; // eslint-disable-line no-unused-vars
        child = Object.assign({}, child, { ...schemaProps });
      }

      return child;
    });

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
