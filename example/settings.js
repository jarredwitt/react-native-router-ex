import React, { PropTypes, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

const propTypes = {
  data: PropTypes.any,
  navigate: PropTypes.object,
  dispatch: PropTypes.func,
};

let Settings = (props) => {
  let push = () => props.dispatch(props.navigate.push('page', { title: 'Pushed from settings tab', data: 'Some data from the settings tab', parent: 'settingsTab' }));

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Settings Page</Text>
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={push}>
        <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
          <Text style={{ padding: 20 }}>Push Page</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Settings.propTypes = propTypes;

export default connect()(Settings);
