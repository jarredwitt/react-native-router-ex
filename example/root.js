import React, { Platform, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Router, RootScene, Scene, TabScene } from '../lib';
import Home from './home';
import Profile from './profile';
import Settings from './settings';
import Login from './login';
import Login2 from './login2';

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

const tabIcon = (tab, index, selectedIndex) => {
  let color = index === selectedIndex ? '#F7CB1B' : '#979797';

  return (
    <View key={tab.key} style={{ flex: 1, alignItems: 'center', marginTop: 7 }}>
      <Image source={icon} />
      <Text style={{ color }}>{tab.title}</Text>
    </View>
  );
};

const renderBackButton = (props, onNavigate) => {
  let navigate = () => onNavigate({ type: 'pop' });
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={navigate}>
      <Text style={styles.button}>Back</Text>
    </TouchableOpacity>
  );
};

const scenes = (
  <RootScene type="tabs">
    <TabScene key="homeTab" title="Home" component={Home} titleStyle={{ fontSize: 17, fontFamily: 'avenir', color: '#4A4A4A' }} />
    <TabScene key="profileTab" title="Profile" component={Profile} titleStyle={{ color: 'white' }} icon={tabIcon} />
    <TabScene key="settingsTab" title="Settings" component={Settings} titleStyle={{ color: 'blue' }} />
    <Scene key="login" title="Login" component={Login} titleStyle={{ color: 'yellow' }} renderBackButton={renderBackButton} renderRightButton={renderBackButton} />
    <Scene key="login2" title="Login 2" component={Login2} direction="vertical" hideNavBar />
  </RootScene>
);

let Root = () => <Router scenes={scenes} />;

export default Root;
