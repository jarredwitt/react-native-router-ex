import React, { View, Text, TouchableOpacity } from 'react-native';

let Settings = (props) => {
  let navigate = () => props.navigate({ type: 'back' });

  return (
    <View style={{ flex: 1, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Login Page</Text>
        <TouchableOpacity onPress={navigate}>
          <View style={{ backgroundColor: 'pink' }}>
            <Text style={{ padding: 20 }}>{props.data}</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};

export default Settings;
