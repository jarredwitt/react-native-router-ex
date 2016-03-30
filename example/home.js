import React, { View, Text, TouchableOpacity } from 'react-native';

let Home = (props) => {
  let modalNavigate = () => props.navigate({ type: 'push', key: 'login' });
  let pushNavigate = () => props.navigate({ type: 'modal', key: 'login2', title: 'Modal Login', data: 'Some data...' });

  return (
    <View style={{ flex: 1, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Home Page</Text>
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={modalNavigate}>
        <View style={{ backgroundColor: 'green' }}>
          <Text style={{ padding: 20 }}>Push Page</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={pushNavigate}>
        <View style={{ backgroundColor: 'green' }}>
          <Text style={{ padding: 20 }}>Login Modal</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
