import React, { PropTypes, Text, View, ScrollView } from 'react-native';

const propTypes = {
  data: PropTypes.any,
};

let Page = (props) => (
  <View style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>A pushed page</Text>
      <Text style={{ marginBottom: 10 }}>{props.data}</Text>
    </ScrollView>
  </View>
);

Page.propTypes = propTypes;

export default Page;
