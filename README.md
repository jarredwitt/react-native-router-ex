# react-native-router-ex
React native router that uses NavigationExperimental. This router is still in heavy development.
API changes are going to be fairly sporadic since NavigationExperimental is still being developed as well. The router does rely on redux for navState management. Checkout the example/root.js to see the setup.

![Router gif](https://dl.dropboxusercontent.com/u/1837891/router.gif)

There is a fully working example in the example folder. API docs are in progress.

###Sample Configuration
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

###API - In Progress

####Router
Prop | Type | Description |
--- | --- | --- |
scenes | object | The root scene component and children.
navState | object | The navState object in your redux store. Pass this in using react-redux connect.

####RootScene
Prop | Type | Description |
--- | --- | --- |
type | string | The type of root scene to use. Currently, the only type is tabs.

####Scene
Prop | Type | Description |
--- | --- | --- |
title | string | Title that will be rendered in the navbar for the scene.
titleStyle | Text.propTypes.style | Text style for the title.
schema | string | Schema key that the scene inherits properties from.
direction | string | Animation direction. horizontal or vertical. Default is vertical. Note: This only works for modals right now.
renderBackButton | closure | Closure to render a back button. Only shown when the scene is pushed onto the nav stack. Arguments passed are props (Scene properties), navigate (navigation action creators), and dispatch (redux dispatch). The closure must return a component.
renderLeftButton | closure | Closure to render a left button. If scene is pushed to this will not render. The back button will take precedence. Arguments passed are props (Scene properties), navigate (navigation action creators), and dispatch (redux dispatch). The closure must return a component.
renderBackButton | closure | Closure to render a right button. Arguments passed are props (Scene properties), navigate (navigation action creators), and dispatch (redux dispatch). The closure must return a component.
