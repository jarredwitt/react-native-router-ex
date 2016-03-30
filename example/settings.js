import React, { PropTypes, Text, TouchableOpacity, View } from 'react-native';

const propTypes = {
  data: PropTypes.any,
  navigate: PropTypes.func,
};

let Settings = (props) => {
  let modalNavigate = () => props.navigate({ type: 'push', key: 'page', title: 'Pushed from settings tab', data: 'Some data from the settings tab' });

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Settings Page</Text>
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={modalNavigate}>
        <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
          <Text style={{ padding: 20 }}>Push Page</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Settings.propTypes = propTypes;

export default Settings;
