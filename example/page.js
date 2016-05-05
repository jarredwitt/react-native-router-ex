import React, { PropTypes } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

const propTypes = {
  data: PropTypes.any,
  navigate: PropTypes.object,
  parent: PropTypes.string,
  dispatch: PropTypes.func,
};

let Page = (props) => {
  let push = () => props.dispatch(props.navigate.push('nested', { title: 'Pushed from within page', data: 'Some data from the pushed page tab', parent: props.parent }));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>A pushed page</Text>
        <Text style={{ marginBottom: 10 }}>{props.data}</Text>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={push}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Push Page</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

Page.propTypes = propTypes;

export default connect((state) => ({ navState: state.navState }))(Page);
