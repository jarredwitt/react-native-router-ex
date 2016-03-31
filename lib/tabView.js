import React, { Animated, Component, PropTypes, NavigationExperimental } from 'react-native';

import navBar from './navBar';
import navigationHelper from './navigationHelper';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Container: NavigationContainer,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const createReducer = (initialState) => (currentState, action = {}) => {
  switch (action.type) {
    case 'InitialAction':
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

class TabView extends Component {
  static propTypes = {
    scene: PropTypes.object.isRequired,
    scenes: PropTypes.array.isRequired,
    onNavigate: PropTypes.func,
    rootNavigate: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this._reducer = createReducer({
      index: 0,
      children: [{
        key: this.props.scene.key,
        props: this.props.scene.props,
      }],
      key: this.props.scene.key,
    });

    this.state = {
      navState: this._reducer(null, { type: 'InitialAction' }),
      prevState: null,
    };
  }
  componentWillReceiveProps(props) {
    if (props.scene.key === this.state.navState.key) {
      return;
    }

    let _navState = Object.assign({}, {
      index: 0,
      children: [{
        key: props.scene.key,
        props: props.scene.props,
      }],
      key: props.scene.key,
    }, this.state.prevState);

    if (this.state.prevState) {
      this.restoringState = true;
    }

    let prevState = null;
    if (this.state.navState.index > 0) {
      prevState = this.state.navState;
    }

    this.tabSwitch = props.scene.key !== this.state.navState.key;
    this.setState({
      navState: _navState,
      prevState,
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.navState.index !== this.state.navState.index;
  }
  render() {
    let duration = 300;
    if (this.restoringState || this.tabSwitch) {
      duration = 0;
      this.restoringState = false;
      this.tabSwitch = false;
    }

    let animation = (pos, navState) => {
      Animated.timing(pos, { toValue: navState.index, duration }).start();
    };

    return (
      <NavigationAnimatedView
        navigationState={this.state.navState}
        applyAnimation={animation}
        renderOverlay={navBar(navigationHelper(this._handleNavigation))}
        renderScene={this._renderCard}
        style={{ flex: 1 }}
      />
    );
  }
  _renderCard = (props) => (
    <NavigationCard
      panHandlers={null}
      {...props}
      key={`card_${props.scene.navigationState.key}`}
      renderScene={this._renderScene}
    />
  );
  _renderScene = (props) => {
    let { component, ...otherProps } = props.scene.navigationState.props;
    let SceneComponent = component;

    let navigate = navigationHelper(this._handleNavigation);

    return (
      <SceneComponent {...otherProps} navigate={navigate} />
    );
  };
  _handleNavigation = (action) => {
    /* eslint no-use-before-define: 0 */
    let { key, type, ...actionProps } = action;
    let scene = this.props.scenes.find(s => s.key === key);
    let sceneAction = Object.assign({}, { key, type }, { props: Object.assign({}, scene, { ...actionProps }) });

    if (sceneAction.type === 'modal') {
      this.props.rootNavigate(sceneAction);
      return;
    }

    this.setState({
      navState: this._reducer(this.state.navState, sceneAction),
    });
  };
}

export default NavigationContainer.create(TabView);
