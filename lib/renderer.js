import React, { Animated, Component, Dimensions, PropTypes, NavigationExperimental } from 'react-native';

let { width, height } = Dimensions.get('window');

const {
  AnimatedView: NavigationAnimatedView,
  Card: NavigationCard,
  Header: NavigationHeader,
} = NavigationExperimental;

class Renderer extends Component {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      animatedHeight: new Animated.Value(height),
      show: props.show,
    };
  }
  componentDidMount() {
    let _height = this.props.show ? 0 : height;

    Animated.timing(
      this.state.animatedHeight,
      {
        toValue: _height,
        duration: 400,
      },
    ).start();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
      children: nextProps.children || this.state.children,
    });
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.show !== this.state.show) {
      return true;
    }

    return false;
  }
  componentDidUpdate() {
    let _height = this.state.show ? 0 : height;

    Animated.timing(
      this.state.animatedHeight,
      {
        toValue: _height,
        duration: 400,
      },
    ).start(() => {
      if (!this.state.show && this.state.children) {
        this.setState({
          children: null,
        });
        this.forceUpdate();
      }
    });
  }
  render() {
    return (
      <Animated.View style={[{ position: 'absolute', top: this.state.animatedHeight, left: 0, overflow: 'hidden', height, width }]}>
        {this.state.children}
      </Animated.View>
    );
  }
}

export default Renderer;
