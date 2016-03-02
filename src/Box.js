// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View } from 'react-native';
import { styleFromProps } from './style';

export default class Box extends Component {

  constructor (props) {
    super(props);
    this.state = { style: styleFromProps(props) };
  }

  render () {
    return (
      <View style={{...this.state.style, ...this.props.style}}>
        {this.props.children}
      </View>
    );
  }

}

Box.propTypes = {
  a11yTitle: PropTypes.string,
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  backgroundImage: PropTypes.string,
  colorIndex: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  justify: PropTypes.oneOf(['start', 'center', 'between', 'end']),
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    PropTypes.shape({
      between: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      horizontal: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      vertical: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
    })
  ]),
  primary: PropTypes.bool,
  reverse: PropTypes.bool,
  separator: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all']),
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  texture: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  wrap: PropTypes.bool
};

Box.defaultProps = {
  a11yTitle: 'Box',
  direction: 'column',
  pad: 'none'
};
