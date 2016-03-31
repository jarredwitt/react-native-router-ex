import React, { PropTypes, Text, TouchableOpacity, View } from 'react-native';

const propTypes = {
  data: PropTypes.any,
  navigate: PropTypes.object,
};

let Home = (props) => {
  let push = () => props.navigate.push('page', { title: 'Pushed from home tab', data: 'Some data from the home tab' });

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ marginBottom: 10 }}>Home Page</Text>
      <TouchableOpacity style={{ marginBottom: 10 }} onPress={push}>
        <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
          <Text style={{ padding: 20 }}>Push Page</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

Home.propTypes = propTypes;

export default Home;
