import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions } from 'react-native';

let { width, height } = Dimensions.get('window');


class Drawer extends Component {
  static propTypes = {
    position: PropTypes.string,
    navState: PropTypes.object,
    show: PropTypes.bool,
    width: PropTypes.number,
  };

  static defaultProps = {
    position: 'left',
    width,
  };

  constructor(props) {
    super(props);

    let animatedValue = this.props.width * -1;
    this.isRight = props.position === 'right';

    this.state = {
      animatedValue: new Animated.Value(animatedValue),
    };
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }
  componentDidUpdate() {
    let _animatedValue = this.props.show ? 0 : this.props.width * -1;

    Animated.timing(
      this.state.animatedValue,
      {
        toValue: _animatedValue,
        duration: 400,
      },
    ).start();
  }
  render() {
    let top = 0;
    let side = 'left';
    if (this.isRight) {
      side = 'right';
    }

    return (
      <Animated.View style={[{ position: 'absolute', top, [side]: this.state.animatedValue, overflow: 'hidden', height, width: this.props.width, backgroundColor: 'white' }]}>

      </Animated.View>
    );
  }
}

export default Drawer;
