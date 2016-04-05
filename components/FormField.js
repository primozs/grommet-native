// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View, Text, StyleSheet } from 'react-native';
import { colorForIndex, spacingUnit } from '../style';

export default class FormField extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
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
      }
    };
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <View style={style.view}>
        <Text style={style.label}>{this.props.label}</Text>
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
