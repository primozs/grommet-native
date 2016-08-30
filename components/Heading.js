// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';
import Style from '../Style';

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

  componentWillReceiveProps (nextProps) {
    this.setState({ style: this._styleFromProps(nextProps) });
  }

  _styleFromProps (props) {
    let style = { text: {fontSize: Style.fontSize(props.level)} };
    if (props.strong) {
      style.text.fontWeight = '600';
    }
    if (props.align) {
      style.text.textAlign = ALIGN_MAP[props.align];
    }
    style.text.marginBottom = Style.padSize(props.margin || 'medium');
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <Text style={style.text}>{this.props.children}</Text>
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
