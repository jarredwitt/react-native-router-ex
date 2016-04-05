import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

let createReducer = (currentState = {}, action = {}) => {
  let findScene = (key) => {
    let scene = currentState.scenes.find(s => s.key === key);
    if (!scene) {
      throw new Error(`Scene not found for key: ${key}`);
    }

    return scene;
  };

  switch (action.type) {
    case 'NAVINIT': {
      return action.state;
    }
    case 'switch': {
      let state = Object.assign({}, currentState, { selectedTab: action.index });
      return NavigationStateUtils.jumpToIndex(state, action.index);
    }
    case 'push': {
      let selectedTabState = currentState.tabState[currentState.selectedTab];
      let scene = findScene(action.key);
      let props = Object.assign({}, scene, { ...action.props });
      let newSelectedTabState = NavigationStateUtils.push(selectedTabState, { key: action.key, props });
      let newTabState = [...currentState.tabState];
      newTabState[currentState.selectedTab] = newSelectedTabState;

      return Object.assign({}, currentState, { tabState: newTabState });
    }
    case 'modal': {
      let scene = findScene(action.key);
      let props = Object.assign({}, scene, { ...action.props });
      let navState = NavigationStateUtils.push(currentState, { key: action.key, props });
      return Object.assign({}, navState, { modal: true });
    }
    case 'back':
    case 'BackAction':
    case 'pop': {
      if (!currentState.modal) {
        let selectedTabState = currentState.tabState[currentState.selectedTab];
        let newSelectedTabState = NavigationStateUtils.pop(selectedTabState, { key: action.key, props: action.props });
        let newTabState = [...currentState.tabState];
        newTabState[currentState.selectedTab] = newSelectedTabState;

        return Object.assign({}, currentState, { tabState: newTabState });
      }

      let navState = currentState.index > 0 ? NavigationStateUtils.pop(currentState) : currentState;
      return Object.assign({}, navState, { modal: false });
    }
    default:
      return currentState;
  }
};

export default createReducer;
