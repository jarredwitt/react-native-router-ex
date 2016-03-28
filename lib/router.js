import React, { Component, PropTypes, NavigationExperimental } from 'react-native';

import navBar from './navBar';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  RootContainer: NavigationRootContainer,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

import TabController from './tabController';

const createReducer = (initialState) => (currentState, action = {}) => {
  switch (action.type) {
    case 'RootContainerInitialAction':
      return initialState;
    case 'push':
      return NavigationStateUtils.push(currentState, { key: action.key, props: action.props });
    case 'back':
    case 'BackAction':
    case 'pop':
      return currentState.index > 0 ?
        NavigationStateUtils.pop(currentState) :
        currentState;
    default:
      return currentState;
  }
};

class Router extends Component {
  static propTypes = {
    scenes: PropTypes.object,
  };
  static defaultProps = {};

  constructor(props) {
    super(props);
    this._scenes = this._gatherScenes(props.scenes);
    this._sceneMap = this._createSceneMap(this._scenes);
    this._reducer = createReducer({
      key: 'rootNav',
      index: 0,
      children: [
        {
          key: 'root',
          props: this._scenes[0],
        },
      ],
    });
  }
  render() {
    return (
      <NavigationRootContainer
        reducer={this._reducer}
        renderNavigation={this._renderNavigation}
        style={{ flex: 1 }}
      />
    );
  }
  _renderNavigation = (navigationState, onNavigate) => {
    if (!navigationState) { return null; }
    let _onNavigate = this._handleNavigation(onNavigate);

    return (
      <NavigationAnimatedView
        navigationState={navigationState}
        onNavigate={_onNavigate}
        style={{ flex: 1 }}
        renderOverlay={navBar}
        renderScene={this._renderCard}
      />
    );
  };
  _renderCard = (props) => {
    let navigationProps = Object.assign({}, props, { onNavigate: this._handleNavigation(props.onNavigate) });
    let scene = navigationProps.scene.navigationState.props;

    return (
      <NavigationCard
        panHandlers={null}
        {...navigationProps}
        key={`root_card_${scene.key}`}
        renderScene={this._renderScene}
        direction={scene.direction}
      />
    );
  };
  _renderScene = (props) => {
    let scene = props.scene.navigationState.props;

    switch (scene.type.toUpperCase()) {
      case 'TABS': {
        let scenes = [...this._scenes];

        return <TabController scenes={scenes.splice(1, scenes.length)} { ...scene } rootNavigate={props.onNavigate} />;
      }
      case 'SCENE': {
        let { component: SceneComponent, ...otherProps } = scene;

        return <SceneComponent {...otherProps} navigate={props.onNavigate} />;
      }
      default: {
        return true;
      }
    }
  };
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
