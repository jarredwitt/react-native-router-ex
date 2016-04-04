import React, { PropTypes, NavigationExperimental } from 'react-native';

const {
  Header: NavigationHeader,
} = NavigationExperimental;

const propTypes = {
  scene: PropTypes.object,
};

let navBar = (navigate, dispatch) => (props) => {
  let scene = props.scene.navigationState.props;

  if (scene.hideNavBar) {
    return null;
  }

  let title = scene.title || '';

  let renderTitle = () => <NavigationHeader.Title textStyle={scene.titleStyle}>{title}</NavigationHeader.Title>;
  let renderLeftButton = (navProps, navScene) => {
    if (navProps.navigationState.index !== 0) {
      return scene.renderBackButton && scene.renderBackButton(navScene, navigate, dispatch);
    }

    return scene.renderLeftButton && scene.renderLeftButton(navScene, navigate, dispatch);
  };

  let renderRightButton = (navProps, navScene) => scene.renderRightButton(navScene, navigate, dispatch);

  return (
    <NavigationHeader
      navigationProps={props}
      renderTitleComponent={renderTitle}
      renderLeftComponent={(scene.renderLeftButton || scene.renderBackButton) && renderLeftButton}
      renderRightComponent={scene.renderRightButton && renderRightButton}
    />
  );
};

navBar.propTypes = propTypes;

export default navBar;
