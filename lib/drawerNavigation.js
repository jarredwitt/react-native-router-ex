import { PropTypes } from 'react';

import RootScene from './rootScene';

const propTypes = {
  ...RootScene.propTypes,
  leftMenuComponent: PropTypes.object,
  leftMenuWidth: PropTypes.number,
  rightMenuComponent: PropTypes.object,
  rightMenuWidth: PropTypes.number,
};

const defaultProps = {
  type: 'DRAWER',
};

const DrawerNavigation = () => null;

DrawerNavigation.propTypes = propTypes;
DrawerNavigation.defaultProps = defaultProps;

export default DrawerNavigation;
