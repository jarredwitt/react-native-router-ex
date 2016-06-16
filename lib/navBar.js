import React, { PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';

import { pop } from './navigationHelper';

const {
  Header: NavigationHeader,
} = NavigationExperimental;

const propTypes = {
  scene: PropTypes.object,
};

/* eslint react/prop-types: 0 */
const navBar = (dispatch) => (props) => {
  // Fix ghosting issue when popping back.
  if (props.scene.index !== props.scenes.length - 1) {
    return (
      <NavigationHeader
        { ...props }
        renderTitleComponent={() => true}
        renderLeftComponent={() => true}
        renderRightComponent={() => true}
      />
    );
  }

  let scene = props.scene.navigationState.props;

  if (scene.hideNavBar) {
    return null;
  }

  let title = scene.title || '';

  let renderTitle;
  if (scene.renderTitle) {
    renderTitle = () => scene.renderTitle(scene, dispatch);
  } else {
    renderTitle = () => <NavigationHeader.Title textStyle={scene.titleStyle}>{title}</NavigationHeader.Title>;
  }
  let renderLeftButton = (navProps) => {
    if (navProps.navigationState.index !== 0) {
      if (scene.renderBackButton) {
        return scene.renderBackButton(scene, dispatch);
      }

      return <NavigationHeader.BackButton onNavigate={() => dispatch(pop())} />;
    }

    return scene.renderLeftButton && scene.renderLeftButton(scene, dispatch);
  };

  let renderRightButton = () => scene.renderRightButton(scene, dispatch);

  return (
    <NavigationHeader
      { ...props }
      renderTitleComponent={renderTitle}
      renderLeftComponent={renderLeftButton}
      renderRightComponent={scene.renderRightButton && renderRightButton}
    />
  );
};

navBar.propTypes = propTypes;

export default navBar;
