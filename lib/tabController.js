import React, { Component, PropTypes, NavigationExperimental, Text, View } from 'react-native';
import Tabs from 'react-native-tabs';

import TabView from './tabView';

const {
  Reducer: NavigationReducer,
  RootContainer: NavigationRootContainer,
} = NavigationExperimental;

class TabController extends Component {
  static propTypes = {
    index: PropTypes.number,
    scenes: PropTypes.array.isRequired,
    rootNavigate: PropTypes.func,
  };

  static defaultProps = {
    index: 0,
  };

  constructor(props, context) {
    super(props, context);

    this._tabs = props.scenes.filter(s => s.type === 'TAB');
    this._reducer = NavigationReducer.TabsReducer({
      tabReducers: this._tabs.map(t => (lastRoute) => lastRoute || { key: t.key }),
    });
  }
  render() {
    return (
      <NavigationRootContainer
        reducer={this._reducer}
        renderNavigation={this._renderNavigation}
        style={{ flex: 1 }}
      />
    );
  }
  _renderNavigation = (navigationState, onNavigate) => {
    if (!navigationState) { return null; }
    let _tabSelect = (el) => {
      let tabKey = el.key;
      let sceneIndex = navigationState.children.findIndex(c => c.key === tabKey);

      onNavigate(NavigationReducer.TabsReducer.JumpToAction(sceneIndex));
    };

    return (
      <View style={{ flex: 1 }}>
        {this._tabs.map((tab, index) => {
          let style = { flex: 1 };
          if (index !== navigationState.index) {
            style = { height: 0, overflow: 'hidden' };
          }

          let sceneKey = navigationState.children[index].key;
          let tabScene = this.props.scenes.find(s => s.key === sceneKey);

          return (
            <View key={index} style={style}>
              <TabView scene={tabScene} scenes={this.props.scenes} rootNavigate={this.props.rootNavigate} />
            </View>
          );
        })}
        <Tabs style={{ backgroundColor: 'white' }} onSelect={_tabSelect}>
          {this._tabs.map((tab, index) => {
            let tabRenderer = tab.icon || this._renderDefaultTab;
            return tabRenderer(tab, index, navigationState.index);
          })}
        </Tabs>
      </View>
    );
  };
  _renderDefaultTab = (tab, index, selectedIndex) => {
    let color = selectedIndex === index ? 'red' : 'black';
    return <Text style={{ color }} key={tab.key}>{tab.title}</Text>;
  }
}

export default TabController;
