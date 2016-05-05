import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

const propTypes = {
  data: PropTypes.any,
  navigate: PropTypes.object,
  dispatch: PropTypes.func,
};

let LoginModal = (props) => {
  let pop = () => props.dispatch(props.navigate.pop());

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'grey' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>Login Modal</Text>
        <Text style={{ marginBottom: 10 }}>{props.data}</Text>
        <TouchableOpacity onPress={pop}>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
            <Text style={{ padding: 20 }}>Close Modal</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

LoginModal.propTypes = propTypes;

export default connect()(LoginModal);
