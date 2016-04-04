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
    scene: PropTypes.object.isRequired,
    scenes: PropTypes.array.isRequired,
    navState: PropTypes.object,
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

    return (
      <SceneComponent {...otherProps} navigate={navigationHelper(props.onNavigate)} />
    );
  };
  _handleNavigation = (action) => {
    /* eslint no-use-before-define: 0 */
    let { key, type, ...actionProps } = action;
    let scene = this.props.scenes.find(s => s.key === key);
    let sceneAction = Object.assign({}, { key, type }, { props: Object.assign({}, scene, { ...actionProps }) });

    this.props.dispatch(sceneAction);
  };
}

export default NavigationContainer.create(TabView);
