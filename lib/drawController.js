import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

import { NAVINIT } from './constants';
import Renderer from './renderer';
import Modal from './modal';
import DrawerContainer from './drawerContainer';

/* eslint no-use-before-define: 0 */
class DrawerController extends Component {
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

    this.drawers = props.scenes.filter(s => s.type === 'DRAWER').map(t => {
      let { key, ...otherProps } = t;
      return {
        key,
        props: { ...otherProps },
      };
    });

    this.leftDrawers = this.drawers.filter(d => d.props.position === 'left');
    this.rightDrawers = this.drawers.filter(d => d.props.position === 'right');

    let index = 0;
    let selectedContainer = 0;
    let children = this.drawers;
    let initialScene = props.initialScene || this.drawers[0].key;
    let initialSceneIsModal = false;

    if (props.initialScene) {
      let scene = props.scenes.find(s => s.key === props.initialScene);
      if (scene.type.toUpperCase() === 'TAB') {
        selectedContainer = this.drawers.findIndex(t => t.key === scene.key);
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

    props.dispatch({
      type: NAVINIT,
      state: {
        activeKey: initialScene,
        children,
        index,
        key: 'DrawerController',
        modal: initialSceneIsModal,
        modalState: {
          children: [],
          index: 0,
          key: 'modal',
        },
        scenes: props.scenes,
        selectedContainer,
        leftDrawerVisible: false,
        rightDrawerVisible: false,
        containerState: this.drawers.map(t => {
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
        <View style={{ flex: 1 }}>
          <Renderer navState={navigationState.containerState[navigationState.index]} dispatch={this.props.dispatch} />
        </View>
        <DrawerContainer show={navigationState.leftDrawerVisible} width={300} position="left" scenes={this.leftDrawers} />
        <DrawerContainer show={navigationState.rightDrawerVisible} width={300} position="right" scenes={this.rightDrawers} navState={navigationState.modalState} />
        <Modal show={navigationState.modal} navState={navigationState.modalState} direction={currentChild.props.direction} scene={currentChild}>
          {scene}
        </Modal>
      </View>
    );
  };
}

export default DrawerController;
