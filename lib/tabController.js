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
    let initialScene = props.initialScene || this._tabs[0].key;
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
      activeKey: initialScene,
      index,
      selectedTab,
      children,
      modal: initialSceneIsModal,
      scenes: props.scenes,
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
      let index = el.props.index * 1;
      let key = el.key;

      this.props.dispatch({ type: 'switch', index, key });
    };

    let currentChild = navigationState.children[navigationState.index];
    let scene;
    if (currentChild.props.type === 'SCENE') {
      let { component, ...otherProps } = currentChild.props;
      let SceneComponent = component;
      scene = (
        <View style={{ flex: 1 }}>
          <SceneComponent {...otherProps} navigate={navigationHelper()} />
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
              <TabView navState={navigationState.tabState[index]} dispatch={this.props.dispatch} />
            </View>
          );
        })}
        {currentChild.type !== 'SCENE' &&
          <Tabs style={{ backgroundColor: 'white' }} onSelect={_tabSelect}>
            {this._tabs.map((tab, index) => {
              let tabRenderer = tab.props.icon || this._renderDefaultTab;
              return tabRenderer(tab.props, index, tab.key, navigationState.selectedTab);
            })}
          </Tabs>
        }
        <Renderer show={currentChild.props.type === 'SCENE'} direction={currentChild.props.direction} scene={currentChild}>
          {scene}
        </Renderer>
      </View>
    );
  };
  _renderDefaultTab = (tab, index, key, selectedIndex) => {
    let color = selectedIndex === index ? 'red' : 'black';
    return <Text style={{ color }} index={index} key={key}>{tab.title}</Text>;
  }
}

export default TabController;
