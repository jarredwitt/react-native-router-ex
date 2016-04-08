import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

let createReducer = (currentState = {}, action = {}) => {
  if (currentState.activeKey && action.key === currentState.activeKey) {
    return currentState;
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
    case 'NAVINIT': {
      return action.state;
    }
    case 'switch': {
      let state = Object.assign({}, currentState, { selectedTab: action.index });
      return setActiveKey(NavigationStateUtils.jumpToIndex(state, action.index), action.key);
    }
    case 'push': {
      let selectedTabState = currentState.tabState[currentState.selectedTab];
      let scene = findScene(action.key);
      let props = Object.assign({}, scene, { ...action.props });
      let newSelectedTabState = NavigationStateUtils.push(selectedTabState, { key: action.key, props });
      let newTabState = [...currentState.tabState];
      newTabState[currentState.selectedTab] = newSelectedTabState;

      return setActiveKey(Object.assign({}, currentState, { tabState: newTabState }), action.key);
    }
    case 'modal': {
      let scene = findScene(action.key);
      let props = Object.assign({}, scene, { ...action.props });
      let navState = NavigationStateUtils.push(currentState, { key: action.key, props });
      return setActiveKey(Object.assign({}, navState, { modal: true }), action.key);
    }
    case 'back':
    case 'BackAction':
    case 'pop': {
      if (!currentState.modal) {
        let selectedTabState = currentState.tabState[currentState.selectedTab];
        let newSelectedTabState = NavigationStateUtils.pop(selectedTabState, { key: action.key, props: action.props });
        let newTabState = [...currentState.tabState];
        newTabState[currentState.selectedTab] = newSelectedTabState;
        let activeKey = newSelectedTabState.children[newSelectedTabState.index].key;
        return setActiveKey(Object.assign({}, currentState, { tabState: newTabState }), activeKey);
      }

      let navState = currentState.index > 0 ? NavigationStateUtils.pop(currentState) : currentState;
      let selectedTab = navState.tabState[navState.selectedTab];
      let activeKey = selectedTab.children[selectedTab.index].key;
      return setActiveKey(Object.assign({}, navState, { modal: false }), activeKey);
    }
    default:
      return currentState;
  }
};

export default createReducer;
