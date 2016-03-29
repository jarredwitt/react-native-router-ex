import React, { View, ScrollView, Text, TouchableOpacity } from 'react-native';

let Settings = (props) => {
  let navigate = () => props.navigate({ type: 'pop' });
  let push = () => props.navigate({ type: 'push', key: 'profile', title: 'beer', coords: { lat: 0.0, long: 0.0 } });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'grey' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>A pushed page</Text>
          <TouchableOpacity style={{ marginBottom: 20 }} onPress={navigate}>
            <View style={{ backgroundColor: 'pink' }}>
              <Text style={{ padding: 20 }}>Pop Back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={push}>
            <View style={{ backgroundColor: 'pink' }}>
              <Text style={{ padding: 20 }}>Push</Text>
            </View>
          </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Settings;
