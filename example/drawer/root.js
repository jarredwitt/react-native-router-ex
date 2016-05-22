import React from 'react';
import { Alert, Image, Platform, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { DrawerScene, Reducer, Router, RootScene, Scene, Schema } from '../../lib';
import Home from './home';
import Profile from './profile';
import Settings from './settings';
import Login from './login';
import Page from './page';
import Nested from './nested';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: Platform.OS === 'ios' ? 10 : 16,
  },
  customTitle: {
    color: 'white',
    fontSize: 14,
  },
  customTitleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

import icon from '../bullsEye@2x.png';

const renderBackButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.pop());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Back</Text>
    </TouchableOpacity>
  );
};

const renderLeftButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.toggleLeftDrawer());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Left Menu</Text>
    </TouchableOpacity>
  );
};

const renderRightButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.toggleRightDrawer());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Right Menu</Text>
    </TouchableOpacity>
  );
};

/* eslint react/prop-types: 0 */
const renderTitle = (props) => (
  <View style={styles.customTitleContainer}>
    <Text style={styles.customTitle}>
      {props.title}
    </Text>
  </View>
);

const scenes = (
  <RootScene type="drawer">
    <Schema key="drawer" renderLeftButton={renderLeftButton} renderRightButton={renderRightButton} />
    <Schema key="default" titleStyle={{ fontSize: 17, fontFamily: 'avenir', color: '#4A4A4A', fontWeight: '400' }} renderBackButton={renderBackButton} />
    <DrawerScene key="home" schema="drawer" position="left" title="Drawer One" component={Home} />
    <DrawerScene key="profile" schema="drawer" position="left" title="Drawer Two" component={Profile} />
    <DrawerScene key="settings" schema="drawer" position="right" title="Drawer Three" component={Settings} />
    <Scene key="login" schema="default" component={Login} title="Login" />
    <Scene key="page" schema="default" component={Page} />
    <Scene key="nested" schema="default" component={Nested} />
  </RootScene>
);

const mapStateToProps = (state) => ({
  navState: state.navState,
});

let RouterScene = connect(mapStateToProps)(Router);

let reducers = combineReducers({
  navState: Reducer,
});

let store = createStore(reducers);

const Root = () => (
  <Provider store={store}>
    <RouterScene scenes={scenes} />
  </Provider>
);

export default Root;
