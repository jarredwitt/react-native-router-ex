import React, { Alert, Image, Platform, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import { Reducer, Router, RootScene, Scene, Schema, TabScene } from '../lib';
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
});

import icon from './bullsEye@2x.png';

const tabIcon = (tab, index, key, selectedIndex) => {
  let color = index === selectedIndex ? 'rgba(0, 0, 255, 0.6)' : '#979797';

  return (
    <View index={index} key={key} style={{ flex: 1, alignItems: 'center', marginTop: 7 }}>
      <Image source={icon} />
      <Text style={{ color }}>{tab.title}</Text>
    </View>
  );
};

const renderLeftButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.modal('login', { title: 'Modal Login', data: 'Some data from the home tab' }));

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Login</Text>
    </TouchableOpacity>
  );
};

const renderRightButton = () => {
  let handleNavigation = () => Alert.alert('Alert', 'You pressed the right button', [{ text: 'OK' }]);

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Alert</Text>
    </TouchableOpacity>
  );
};

const renderBackButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.pop());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Back</Text>
    </TouchableOpacity>
  );
};

const scenes = (
  <RootScene type="tabs">
    <Schema key="default" titleStyle={{ fontSize: 17, fontFamily: 'avenir', color: '#4A4A4A' }} icon={tabIcon} renderBackButton={renderBackButton} />
    <TabScene key="homeTab" schema="default" title="Home" component={Home} renderLeftButton={renderLeftButton} renderRightButton={renderRightButton} />
    <TabScene key="profileTab" schema="default" title="Profile" component={Profile} />
    <TabScene key="settingsTab" schema="default" title="Settings" component={Settings} />
    <Scene key="login" schema="default" component={Login} />
    <Scene key="page" schema="default" component={Page} />
    <Scene key="nested" schema="default" component={Nested} />
  </RootScene>
);

let select = (state) => ({
  navState: state.navState,
});
let RouterScene = connect(select)((props) => <Router dispatch={props.dispatch} navState={props.navState} scenes={scenes} />);

let reducers = combineReducers({
  navState: Reducer,
});

let store = createStore(reducers);

let Root = () => (
  <Provider store={store}>
    <RouterScene />
  </Provider>
);

export default Root;
