import React, { View, Text, TouchableOpacity } from 'react-native';

let Profile = (props) => {
  let pushNavigate = () => props.navigate({ type: 'modal', key: 'login2', title: 'Modal Login', data: 'Some data...' });
  return (
    <View style={{ flex: 1, backgroundColor: 'pink', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Profile Page</Text>
        <TouchableOpacity style={{ marginBottom: 10 }} onPress={pushNavigate}>
          <View style={{ backgroundColor: 'green' }}>
            <Text style={{ padding: 20 }}>Modal Page</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
};

export default Profile;
