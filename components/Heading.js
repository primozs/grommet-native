// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Text, StyleSheet } from 'react-native';
import { padSize } from '../style';

const FONT_SIZE_MAP = [64, 48, 36, 24, 18, 18];

const ALIGN_MAP = {
  start: 'left',
  center: 'center',
  end: 'right'
};

export default class Heading extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = { fontSize: FONT_SIZE_MAP[props.level] };
    if (props.strong) {
      style.fontWeight = '600';
    }
    if (props.align) {
      style.textAlign = ALIGN_MAP[props.align];
    }
    style.marginBottom = padSize(props.margin || 'medium');
    return style; //StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <Text style={style}>{this.props.children}</Text>
    );
  }

}

Heading.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  strong: PropTypes.bool,
  level: PropTypes.oneOf([1, 2, 3, 4, 5])
};

Heading.defaultProps = {
  level: 1
};
