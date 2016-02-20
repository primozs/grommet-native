// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View } from 'react-native';

const ALIGN_MAP = {
  start: 'align-start',
  end: 'align-end',
  center: 'center'
};

const JUSTIFY_MAP = {
  start: 'align-start',
  end: 'align-end',
  center: 'center',
  between: 'justify-between'
};

export default class Box extends Component {

  constructor(props) {
    super(props);
    let style = {};
    if (props.align) {
      style.alignItems = ALIGN_MAP[props.align];
    }
    if (props.justify) {
      style.justifyContent = JUSTIFY_MAP[props.justify];
    }
    this.setState({ style: style });
  }

  _styleFromProps (props) {
    let style = {};
    if (props.align) {
      style.alignItems = ALIGN_MAP[props.align];
    }
    if (props.justify) {
      style.justifyContent = JUSTIFY_MAP[props.justify];
    }
    return StyleSheet.create(style);
  }

  render () {
    return (
      <View style={this.state.style}>
        {texture}
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
