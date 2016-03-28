import React, { View, Text, TouchableOpacity } from 'react-native';

let Settings = (props) => {
  let navigate = () => props.navigate({ type: 'pop' });
  return (
    <View style={{ flex: 1, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Settings Page</Text>
    </View>
  );
};

export default Settings;
