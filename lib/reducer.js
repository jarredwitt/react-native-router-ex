import { NavigationExperimental } from 'react-native';

import * as actions from './constants';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const createReducer = (currentState = {}, action = {}) => {
  // Make sure that we don't have two modals on top of each other.
  if (action.type === actions.MODAL) {
    if (action.key === currentState.activeKey) {
      return currentState;
    }
  }
  let findScene = (key) => {
    let scene = currentState.scenes.find(s => s.key === key);
    if (!scene) {
      throw new Error(`Scene not found for key: ${key}`);
    }

    return scene;
  };

  let setActiveKey = (state, activeKey) => Object.assign({}, state, { activeKey });

  switch (action.type) {
    case actions.NAVINIT: {
      return action.state;
    }
    case actions.REPLACE: {
      const childIndex = currentState.children.findIndex(c => c.key === action.key);
      let state = Object.assign({}, currentState, {
        selectedContainer: childIndex,
        leftDrawerVisible: false,
        rightDrawerVisible: false,
      });
      return setActiveKey(NavigationStateUtils.jumpToIndex(state, childIndex), action.key);
    }
    case actions.PUSH: {
      let scene = findScene(action.key);
      let props = Object.assign({}, scene, { ...action.props });
      let key = action.key;

      if (currentState.modal) {
        let exists = currentState.modalState.children.filter(c => c.key === key || c.key.includes(`${key}_`));
        if (exists.length) {
          key = `${key}_${exists.length}`;
        }
        let newModalState = NavigationStateUtils.push(currentState.modalState, { key, props });
        let navState = Object.assign({}, currentState, { modalState: newModalState });

        return setActiveKey(Object.assign({}, navState), action.key);
      }

      let selectedContainerState = currentState.containerState[currentState.selectedContainer];
      let exists = selectedContainerState.children.filter(c => c.key === key || c.key.includes(`${key}_`));
      if (exists.length) {
        key = `${key}_${exists.length}`;
      }
      let newselectedContainerState = NavigationStateUtils.push(selectedContainerState, { key, props });
      let newcontainerState = [...currentState.containerState];
      newcontainerState[currentState.selectedContainer] = newselectedContainerState;

      return setActiveKey(Object.assign({}, currentState, { containerState: newcontainerState }), action.key);
    }
    case actions.MODAL: {
      let scene = findScene(action.key);
      let props = Object.assign({}, scene, { ...action.props });
      let modalState = NavigationStateUtils.push(currentState.modalState, { key: action.key, props });
      let navState = Object.assign({}, currentState, { modalState });
      return setActiveKey(Object.assign({}, navState, { modal: true }), action.key);
    }
    case actions.MODAL_POP: {
      let modalState = {
        children: [],
        index: 0,
        key: 'modal',
      };

      let navState = Object.assign({}, currentState, { modalState, modal: false });

      let activeKey = navState.containerState[navState.selectedContainer].children[navState.containerState[navState.selectedContainer].index].key;

      return setActiveKey(navState, activeKey);
    }
    case actions.BACK:
    case actions.BACK_ACTION:
    case actions.POP: {
      if (!currentState.modal) {
        let selectedContainerState = currentState.containerState[currentState.selectedContainer];
        let newselectedContainerState = NavigationStateUtils.pop(selectedContainerState, { key: action.key, props: action.props });
        let newcontainerState = [...currentState.containerState];
        newcontainerState[currentState.selectedContainer] = newselectedContainerState;
        let activeKey = newselectedContainerState.children[newselectedContainerState.index].key;
        return setActiveKey(Object.assign({}, currentState, { containerState: newcontainerState }), activeKey);
      }

      let modalState = NavigationStateUtils.pop(currentState.modalState);
      let navState = Object.assign({}, currentState, { modalState });
      let selectedContainer = navState.containerState[navState.selectedContainer];
      let activeKey = selectedContainer.children[selectedContainer.index].key;

      return setActiveKey(Object.assign({}, navState, { modal: navState.modalState.children.length > 0 }), activeKey);
    }
    case actions.POP_TO: {
      if (!currentState.modal) {
        let selectedContainerState = currentState.containerState[currentState.selectedContainer];
        let index = selectedContainerState.children.findIndex(c => c.key === action.key);
        if (index === -1) {
          throw new Error(`Could not find key for ${action.key} for navigate action popTo`);
        }
        let children = selectedContainerState.children.slice(0, index + 1);
        let newselectedContainerState = Object.assign({}, selectedContainerState, { children, index });
        let newcontainerState = [...currentState.containerState];
        newcontainerState[currentState.selectedContainer] = newselectedContainerState;
        let activeKey = newselectedContainerState.children[newselectedContainerState.index].key;
        return setActiveKey(Object.assign({}, currentState, { containerState: newcontainerState }), activeKey);
      }

      console.warn('You called popTo within a modal. This is not supported.');
      return currentState;
    }
    case actions.TOGGLE_LEFT_DRAWER: {
      let newState = Object.assign({}, currentState, {
        leftDrawerVisible: !currentState.leftDrawerVisible,
        rightDrawerVisible: false,
      });

      return newState;
    }
    case actions.TOGGLE_RIGHT_DRAWER: {
      let newState = Object.assign({}, currentState, {
        leftDrawerVisible: false,
        rightDrawerVisible: !currentState.rightDrawerVisible,
      });

      return newState;
    }
    default:
      return currentState;
  }
};

export default createReducer;
