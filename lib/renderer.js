import React, { Animated, PropTypes, NavigationExperimental, StyleSheet } from 'react-native';

import TabController from './tabController';

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader,
} = NavigationExperimental;

const propTypes = {
  navigationState: PropTypes.object,
  onNavigate: PropTypes.func,
};

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
  },
  scrollView: {
    marginTop: NavigationHeader.HEIGHT,
  },
});

let Renderer = (props) => {
  if (props.navigationState.component) {
    let SceneComponent = props.navigationState.component;
    return <SceneComponent {...props.navigationState} navigate={props.onNavigate} />;
  }

  if (props.navigationState.children && props.navigationState.children[0].tabController) {
    const newState = Object.assign({}, props.navigationState.children[0], { scenes: props.navigationState.scenes });
    return <TabController {...newState} navigate={props.onNavigate} />;
  }

  let _renderScene = (sceneProps) => {
    return (
      <Renderer key={sceneProps.scene.navigationState.key} navigationState={sceneProps.scene.navigationState} onNavigate={sceneProps.onNavigate} />
    );
  };

  let _renderCard = (cardProps) => {
    return (
      <NavigationCard
        {...cardProps}
        key={'card_' + cardProps.scene.navigationState.key}
        renderScene={_renderScene}
      />
    );
  };

  return (
    <NavigationAnimatedView
      navigationState={props.navigationState}
      style={styles.animatedView}
      setTiming={(pos, navState) => Animated.timing(pos, { toValue: navState.index, duration: 300 }).start()}
      renderScene={_renderCard}
    />
  );
};

Renderer.propTypes = propTypes;

export default Renderer;
