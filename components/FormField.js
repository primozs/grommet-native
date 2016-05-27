// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { colorForIndex, spacingUnit } from '../style';

export default class FormField extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ style: this._styleFromProps(nextProps) });
  }

  _styleFromProps (props) {
    let style = {
      view: {
        borderColor: colorForIndex('border'),
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: -1
      },
      label: {
        color: colorForIndex('secondary'),
        paddingHorizontal: spacingUnit,
        paddingVertical: spacingUnit / 4
      },
      error: {
        color: colorForIndex('error'),
        paddingHorizontal: spacingUnit,
        paddingBottom: spacingUnit / 4
      }
    };
    if (props.error) {
      style.view.borderColor = colorForIndex('error');
      style.label.paddingBottom = 0;
    }
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    let error;
    if (this.props.error) {
      error = <Text style={style.error}>{this.props.error}</Text>;
    }
    return (
      <View style={style.view}>
        <Text style={style.label}>{this.props.label}</Text>
        {error}
        {this.props.children}
      </View>
    );
  }

}

FormField.propTypes = {
  error: PropTypes.node,
  help: PropTypes.node,
  hidden: PropTypes.bool,
  label: PropTypes.string,
  required: PropTypes.bool
};
