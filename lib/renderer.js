import React, { Component, PropTypes } from 'react';
import { Animated, NavigationExperimental } from 'react-native';

import navBar from './navBar';
import navigationHelper from './navigationHelper';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
} = NavigationExperimental;

class Renderer extends Component {
  static propTypes = {
    navState: PropTypes.object,
    dispatch: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return (nextProps.navState.key && nextProps.navState.index) !== (this.props.navState.key && this.props.navState.index);
  }
  render() {
    let duration = 300;
    let animation = (pos, navState) => {
      Animated.timing(pos, { toValue: navState.index, duration }).start();
    };

    return (
      <NavigationAnimatedView
        navigationState={this.props.navState}
        onNavigate={this._handleNavigation}
        applyAnimation={animation}
        renderOverlay={navBar(navigationHelper(), this.props.dispatch)}
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

    return (
      <SceneComponent {...otherProps} navigate={navigationHelper()} />
    );
  };
  _handleNavigation = (action) => action;
}

export default Renderer;
