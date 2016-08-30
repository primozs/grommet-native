// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Style from '../Style';

let _style;
Style.connect((nextStyle) => {
  _style = StyleSheet.create({
    error: {
      color: nextStyle.colorForIndex('error'),
      marginHorizontal: nextStyle.spacingUnit,
      marginBottom: nextStyle.spacingUnit / 4
    },
    label: {
      color: nextStyle.colorForIndex('secondary'),
      marginHorizontal: nextStyle.spacingUnit,
      marginVertical: nextStyle.spacingUnit / 4
    },
    labelError: {
      marginBottom: 0
    },
    view: {
      borderColor: nextStyle.colorForIndex('border'),
      borderStyle: 'solid',
      borderWidth: 1,
      marginBottom: -1
    },
    viewError: {
      borderColor: nextStyle.colorForIndex('error')
    }
  });
});

export default class FormField extends Component {
  render () {
    let viewStyles = [_style.view];
    let labelStyles = [_style.label];
    let error;
    if (this.props.error) {
      error = <Text style={_style.error}>{this.props.error}</Text>;
      viewStyles.push(_style.viewError);
      labelStyles.push(_style.labelError);
    }
    return (
      <View style={viewStyles}>
        <Text style={labelStyles}>{this.props.label}</Text>
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
