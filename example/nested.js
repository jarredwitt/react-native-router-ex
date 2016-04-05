import React, { PropTypes, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

const propTypes = {
  data: PropTypes.any,
  navigate: PropTypes.object,
  dispatch: PropTypes.func,
};

let Nested = (props) => (
  <View style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>A nested page</Text>
      <Text style={{ marginBottom: 10 }}>{props.data}</Text>
    </ScrollView>
  </View>
);

Nested.propTypes = propTypes;

export default connect()(Nested);
