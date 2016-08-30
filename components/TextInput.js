// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Style from '../Style';

let _style;
Style.connect((nextStyle) => {
  _style = StyleSheet.create({
    textInput: {
      height: nextStyle.spacingUnit * 2,
      marginHorizontal: nextStyle.spacingUnit
    }
  });
});

export default class GrommetTextInput extends Component {

  setNativeProps (nativeProps) {
    this._input.setNativeProps(nativeProps);
  }

  render () {
    return (
      <TextInput ref={(c) => this._input = c} {...this.props}
        underlineColorAndroid="transparent"
        style={[_style.textInput, this.props.style]}>
        {this.props.children}
      </TextInput>
    );
  }
};
