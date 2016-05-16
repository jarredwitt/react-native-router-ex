#React-Native-Router-Ex
---
React native router that uses NavigationExperimental.

**Highlights**

 - Simple configuration
 - Keep all routes in a single, well laid out flat hierarchy.
 - Supports tabs and modal scenes.
 - Schema support.
 - Fully integrated with Redux.


###Example
---
Simple three tab application with a login modal.

![Router gif](https://dl.dropboxusercontent.com/u/1837891/router.gif)

The following code produces the previous gif:
```
import { Reducer, Router, RootScene, Scene, Schema, TabScene } from 'react-native-router-ex';

// ----------------------------------------------------------------------------
// Buttons and pages removed for brevity. Check example for full configuration.
// ----------------------------------------------------------------------------

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

const mapStateToProps = (state) => ({
  navState: state.navState,
});

let RouterScene = connect(mapStateToProps)(Router);

let reducers = combineReducers({
  navState: Reducer,
});

let store = createStore(reducers);

let Root = () => (
  <Provider store={store}>
    <RouterScene scenes={scenes} />
  </Provider>
);
```

##Getting started

Install
```
npm install react-native-router-ex --save
```
Import into your root scene
```
import { Reducer, Router, RootScene, Scene, Schema, TabScene } from 'react-native-router-ex';
```
---
####RootScene
The root component of the router.


**type**{string}
The type of router experience for the app. Only value accepted for now is "tabs".

**initialScene**{string}
The key for the initial string. Can be any scene key.

---
####Scene

The base for all navigation screens.
#####Properties
**key**{string} - required

The name of the scene. Must be unique.


**direction**{string}

The direction of the animation when the scene is pushed onto the stack as a modal.
- vertical (default)
- horizontal

**hideNavBar**{boolean}

Whether or not to hide the top navigation bar. Useful for modal screens. Default value is false.

**schema**{string}

The schema key that the scene inherits properties from.

**renderBackButton**{closure}

Controls how the back button is rendered when the scene has the ability to be popped back to in the navigation stack. Must return an element that is wrapped in a touchable element.

- props - properties for the scene
- navigate - navigation helper methods
- dispatch - redux dispatch function
```
const renderBackButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.pop());

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Back</Text>
    </TouchableOpacity>
  );
};
```

**renderLeftButton**{closure}

Controls how the left button is rendered. This is overridden by the back button if the scene is pushed on the navigation stack. Best use case is for tab scenes or modal scenes that show the navigation bar.

- props - properties for the scene
- navigate - navigation helper methods
- dispatch - redux dispatch function
```
const renderLeftButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.push('search'));

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>Search</Text>
    </TouchableOpacity>
  );
};
```
**renderRightButton**{closure}

Controls how the right button is rendered.

- props - properties for the scene
- navigate - navigation helper methods
- dispatch - redux dispatch function
```
const renderRightButton = (props, navigate, dispatch) => {
  let handleNavigation = () => dispatch(navigate.push('new'));

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handleNavigation}>
      <Text style={styles.button}>New</Text>
    </TouchableOpacity>
  );
};
```
**renderTitle**{closure}

Controls how the title section is rendered in the navigation bar. Useful if you want to render a control in the title instead of the title string.

- props - properties for the scene
- navigate - navigation helper methods
- dispatch - redux dispatch function
```
const renderTitle = (props) => (
  <View style={styles.customTitleContainer}>
    <Text style={styles.customTitle}>
      {props.title}
    </Text>
  </View>
);
```

**titleStyle**{Text.propTypes.style}

Controls the styling for the title string that is rendered in the navigation bar. Use this if you just want to change the text styling for the title string. Can take any Text style properties.
