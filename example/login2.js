import React, { Component, View, Text, TouchableOpacity } from 'react-native';

class LoginPage extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount(){
    console.log('unm');
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'blue', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ marginBottom: 10 }}>Login Page</Text>
          <TouchableOpacity onPress={this._navigate}>
            <View style={{ backgroundColor: 'pink' }}>
              <Text style={{ padding: 20 }}>{this.props.data}</Text>
            </View>
          </TouchableOpacity>
      </View>
    );
  }
  _navigate = () => this.props.navigate({ type: 'back' });
}

export default LoginPage;
