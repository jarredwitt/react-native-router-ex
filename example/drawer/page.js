import React, { PropTypes } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { NavActions } from '../../lib';

const propTypes = {
  data: PropTypes.any,
  parent: PropTypes.string,
  modal: PropTypes.bool,
  dispatch: PropTypes.func,
};

let Page = (props) => {
  let push = () => props.dispatch(NavActions.push('nested', { title: 'Pushed from within page', data: 'Some data from the pushed page tab', parent: props.parent }));
  let closeModal = () => props.dispatch(NavActions.modalPop());

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>A pushed page</Text>
        <Text style={{ marginBottom: 10 }}>{props.data}</Text>
        {props.modal ?
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={closeModal}>
            <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
              <Text style={{ padding: 20 }}>Close Modal</Text>
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={push}>
            <View style={{ backgroundColor: 'rgba(0, 0, 255, 0.6)' }}>
              <Text style={{ padding: 20 }}>Push Page</Text>
            </View>
          </TouchableOpacity>
        }
      </ScrollView>
    </View>
  );
};

Page.propTypes = propTypes;

export default connect((state) => ({ navState: state.navState }))(Page);
