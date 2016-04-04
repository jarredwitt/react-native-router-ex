import React, { Animated, Component, PropTypes, NavigationExperimental } from 'react-native';

import navBar from './navBar';
import navigationHelper from './navigationHelper';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Container: NavigationContainer,
} = NavigationExperimental;

class TabView extends Component {
  static propTypes = {
    scenes: PropTypes.array.isRequired,
    navState: PropTypes.object,
    dispatch: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      navState: props.navState,
    };
  }
  componentWillReceiveProps(props) {
    if (props.navState.index === this.state.navState.index) {
      return;
    }

    let sceneKey = props.navState.children[props.navState.index].key;
    let scene = this.props.scenes.find(s => s.key === sceneKey);
    let newProps = Object.assign({}, scene, props.navState.children[props.navState.index].props);

    let children = [...props.navState.children];
    children[props.navState.index] = Object.assign({}, scene, { props: newProps });

    let navState = Object.assign({}, props.navState, { children });

    this.setState({
      navState,
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.navState.index !== this.state.navState.index;
  }
  render() {
    let duration = 300;

    let animation = (pos, navState) => {
      Animated.timing(pos, { toValue: navState.index, duration }).start();
    };

    return (
      <NavigationAnimatedView
        navigationState={this.state.navState}
        onNavigate={this._handleNavigation}
        applyAnimation={animation}
        renderOverlay={navBar(navigationHelper(this._handleNavigation), this.props.dispatch)}
        renderScene={this._renderCard}
        style={{ flex: 1 }}
      />
    );
  }
  _renderCard = (props) => {
    return (
      <NavigationCard
        panHandlers={null}
        {...props}
        key={`card_${props.scene.navigationState.key}`}
        renderScene={this._renderScene}
      />
    );
  }
  _renderScene = (props) => {
    let { component, ...otherProps } = props.scene.navigationState.props;
    let SceneComponent = component;

    return (
      <SceneComponent {...otherProps} navigate={navigationHelper(this._handleNavigation)} />
    );
  };
  _handleNavigation = (action) => {
    let { key, type, ...otherProps } = action;
    let sceneAction = { key, type, props: otherProps };
    return sceneAction;
  };
}

export default NavigationContainer.create(TabView);
