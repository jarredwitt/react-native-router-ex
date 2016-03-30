import React, { Component, PropTypes, NavigationExperimental, Text, View } from 'react-native';
import Tabs from 'react-native-tabs';

import TabView from './tabView';
import Renderer from './renderer';
import navBar from './navBar';

const {
  RootContainer: NavigationRootContainer,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const createReducer = (initialState) => (currentState, action = {}) => {
  switch (action.type) {
    case 'RootContainerInitialAction':
      return initialState;
    case 'switch': {
      let state = Object.assign({}, currentState, { selectedTab: action.index });
      return NavigationStateUtils.jumpToIndex(state, action.index);
    }
    case 'push':
      return NavigationStateUtils.push(currentState, { key: action.key, props: action.props });
    case 'modal': {
      return NavigationStateUtils.push(currentState, { key: action.key, props: action.props });
    }
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

/* eslint no-use-before-define: 0 */
class TabController extends Component {
  static propTypes = {
    index: PropTypes.number,
    scenes: PropTypes.array.isRequired,
    rootNavigate: PropTypes.func,
  };

  static defaultProps = {
    index: 0,
  };

  constructor(props, context) {
    super(props, context);
    this._tabs = props.scenes.filter(s => s.type === 'TAB').map(t => {
      let { key, ...otherProps } = t;
      return {
        key,
        props: { ...otherProps },
      };
    });

    this._reducer = createReducer({
      key: 'tabController',
      index: 0,
      selectedTab: 0,
      children: this._tabs,
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

    let _tabSelect = (el) => {
      let index = el.key * 1;
      onNavigate({ type: 'switch', index });
    };

    let currentChild = navigationState.children[navigationState.index];
    let scene;
    if (currentChild.props.type === 'SCENE') {
      let { component, ...otherProps } = currentChild.props;
      let SceneComponent = component;
      scene = (
        <View style={{ flex: 1 }}>
          <SceneComponent {...otherProps} navigate={onNavigate} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {this._tabs.map((tab, index) => {
          let style = { flex: 1 };
          if (index !== navigationState.selectedTab) {
            style = { height: 0, overflow: 'hidden' };
          }

          return (
            <View key={index} style={style}>
              <TabView scene={tab} scenes={this.props.scenes} rootNavigate={onNavigate} />
            </View>
          );
        })}
        {currentChild.props.type !== 'SCENE' &&
          <Tabs style={{ backgroundColor: 'white' }} onSelect={_tabSelect}>
            {this._tabs.map((tab, index) => {
              let tabRenderer = tab.props.icon || this._renderDefaultTab;
              return tabRenderer(tab.props, index, navigationState.selectedTab);
            })}
          </Tabs>
        }
        <Renderer show={currentChild.props.type === 'SCENE'} scene={currentChild.props}>
          {scene}
        </Renderer>
      </View>
    );
  };
  _renderDefaultTab = (tab, index, selectedIndex) => {
    let color = selectedIndex === index ? 'red' : 'black';
    return <Text style={{ color }} key={tab.key}>{tab.title}</Text>;
  }
}

export default TabController;
