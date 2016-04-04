import React, { Component, PropTypes, Text, View } from 'react-native';
import Tabs from 'react-native-tabs';

import TabView from './tabView';
import Renderer from './renderer';
import navigationHelper from './navigationHelper';

/* eslint no-use-before-define: 0 */
class TabController extends Component {
  static propTypes = {
    index: PropTypes.number,
    initialScene: PropTypes.string,
    scenes: PropTypes.array.isRequired,
    navState: PropTypes.object,
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    index: 0,
  };

  constructor(props) {
    super(props);

    this._tabs = props.scenes.filter(s => s.type === 'TAB').map(t => {
      let { key, ...otherProps } = t;
      return {
        key,
        props: { ...otherProps },
      };
    });

    let index = 0;
    let selectedTab = 0;
    let children = this._tabs;
    let initialSceneIsModal = false;

    if (props.initialScene) {
      let scene = props.scenes.find(s => s.key === props.initialScene);
      if (scene.type.toUpperCase() === 'TAB') {
        selectedTab = this._tabs.findIndex(t => t.key === scene.key);
      } else if (scene.type.toUpperCase() === 'SCENE') {
        let { key, schema, ...otherProps } = scene;
        children = [...children];
        children.push({
          key,
          props: { ...otherProps },
        });

        index = children.length - 1;
        initialSceneIsModal = true;
      }
    }

    props.dispatch({ type: 'NAVINIT', state: {
      key: 'tabController',
      index,
      selectedTab,
      children,
      modal: initialSceneIsModal,
      tabState: this._tabs.map(t => {
        let { key, ...otherProps } = t;

        return {
          index: 0,
          children: [{
            key,
            props: otherProps.props,
          }],
          key,
        };
      }),
    } });
  }
  render() {
    if (!this.props.navState.children) {
      return <View />;
    }

    return this._renderNavigation(this.props.navState);
  }
  _renderNavigation = (navigationState) => {
    if (!navigationState) { return null; }
    let _tabSelect = (el) => {
      let index = el.key * 1;
      this.props.dispatch({ type: 'switch', index });
    };

    let { key, props } = navigationState.children[navigationState.index];
    let currentChild = this.props.scenes.find(s => s.key === key);
    let scene;
    if (currentChild.type === 'SCENE') {
      let { component, ...otherProps } = currentChild;
      let sceneProps = Object.assign({}, otherProps, props);
      let SceneComponent = component;
      scene = (
        <View style={{ flex: 1 }}>
          <SceneComponent {...sceneProps} navigate={navigationHelper()} />
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
              <TabView navState={navigationState.tabState[index]} scenes={this.props.scenes} dispatch={this.props.dispatch} />
            </View>
          );
        })}
        {currentChild.type !== 'SCENE' &&
          <Tabs style={{ backgroundColor: 'white' }} onSelect={_tabSelect}>
            {this._tabs.map((tab, index) => {
              let tabRenderer = tab.props.icon || this._renderDefaultTab;
              return tabRenderer(tab.props, index, navigationState.selectedTab);
            })}
          </Tabs>
        }
        <Renderer show={currentChild.type === 'SCENE'} scene={currentChild}>
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
