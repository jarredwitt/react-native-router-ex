import React, { Component, PropTypes } from 'react';
import { Animated, NavigationExperimental } from 'react-native';

import navBar from './navBar';
import navigationHelper from './navigationHelper';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Container: NavigationContainer,
} = NavigationExperimental;

class Renderer extends Component {
  static propTypes = {
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

    this.setState({
      navState: props.navState,
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
  _renderCard = (props) => (
    <NavigationCard
      panHandlers={null}
      {...props}
      key={`card_${props.scene.navigationState.key}`}
      renderScene={this._renderScene}
    />
  );
  /* eslint no-use-before-define: 0 */
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

export default NavigationContainer.create(Renderer);
