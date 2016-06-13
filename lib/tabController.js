import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import Tabs from './tabBar/tabBar';

import { NAVINIT } from './constants';
import { replace } from './navigationHelper';
import Renderer from './renderer';
import Modal from './modal';

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
    let selectedContainer = 0;
    let children = this._tabs;
    let initialScene = props.initialScene || this._tabs[0].key;
    let initialSceneIsModal = false;

    if (props.initialScene) {
      let scene = props.scenes.find(s => s.key === props.initialScene);
      if (scene.type.toUpperCase() === 'TAB') {
        selectedContainer = this._tabs.findIndex(t => t.key === scene.key);
      } else if (scene.type.toUpperCase() === 'SCENE') {
        let { key, schema, ...otherProps } = scene; // eslint-disable-line no-unused-vars
        children = [...children];
        children.push({
          key,
          props: { ...otherProps },
        });

        index = children.length - 1;
        initialSceneIsModal = true;
      }
    }

    props.dispatch({
      type: NAVINIT,
      state: {
        activeKey: initialScene,
        children,
        index,
        key: 'tabController',
        modal: initialSceneIsModal,
        modalState: {
          children: [],
          index: 0,
          key: 'modal',
        },
        scenes: props.scenes,
        selectedContainer,
        containerState: this._tabs.map(t => {
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
      },
    });
  }
  render() {
    if (!this.props.navState.children) {
      return <View />;
    }

    return this._renderNavigation(this.props.navState);
  }
  _renderNavigation = (navigationState) => {
    if (!navigationState) { return null; }
    let _tabSelect = (index, key) => this.props.dispatch(replace(index, key));

    let currentChild = navigationState.children[navigationState.index];
    let scene;

    if (navigationState.modal) {
      currentChild = navigationState.modalState.children[0];
      scene = (
        <View style={{ flex: 1 }}>
          <Renderer navState={navigationState.modalState} dispatch={this.props.dispatch} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {this._tabs.map((tab, index) => {
          let style = { flex: 1 };
          if (index !== navigationState.selectedContainer) {
            style = { height: 0, overflow: 'hidden' };
          }

          return (
            <View key={index} style={style}>
              <Renderer navState={navigationState.containerState[index]} dispatch={this.props.dispatch} />
            </View>
          );
        })}
        <Tabs style={{ backgroundColor: 'white' }} onSelectTab={_tabSelect}>
          {this._tabs.map((tab, index) => {
            let tabRenderer = tab.props.icon || this._renderDefaultTab;
            return tabRenderer(tab.props, index, tab.key, navigationState.selectedContainer);
          })}
        </Tabs>
        <Modal show={navigationState.modal} navState={navigationState.modalState} direction={currentChild.props.direction} scene={currentChild}>
          {scene}
        </Modal>
      </View>
    );
  };
  _renderDefaultTab = (tab, index, key, selectedIndex) => {
    let color = selectedIndex === index ? 'red' : 'black';
    return <Text style={{ color }} index={index} key={key}>{tab.title}</Text>;
  }
}

export default TabController;
