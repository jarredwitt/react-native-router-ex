import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { NavActions } from '../../lib';

const propTypes = {
  data: PropTypes.any,
  parent: PropTypes.string,
  dispatch: PropTypes.func,
};

let Nested = (props) => {
  let push = () => props.dispatch(NavActions.push('nested', { title: 'Pushed from within page', data: 'Some data from the pushed page tab', parent: props.parent }));

  let popTo = () => props.dispatch(NavActions.popTo(props.parent));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>A nested page</Text>
        <Text style={{ marginBottom: 10 }}>{props.data}</Text>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={push}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Push Page</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={popTo}>
          <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
            <Text style={{ padding: 20 }}>Pop to Parent Tab</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

Nested.propTypes = propTypes;

export default connect()(Nested);
