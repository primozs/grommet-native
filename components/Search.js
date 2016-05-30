// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import TextInput from './TextInput';
import Box from './Box';
import Button from './Button';
import SearchIcon from './icons/Search';
import { formFieldTextInput, fontSize, spacingUnit, colorForIndex } from '../style';

export default class Search extends Component {

  constructor () {
    super();
    this._onToggle = this._onToggle.bind(this);
  }

  _onToggle () {
    if (this.refs.input.isFocused()) {
      this.refs.input.blur();
    } else {
      this.refs.input.focus();
    }
  }

  render () {
    return (
      <Box style={STYLE.box} direction="row" align="center">
        <TextInput ref="input" style={STYLE.text}
          placeholder="Search" placeholderTextColor={colorForIndex('secondary')}
          selectTextOnFocus={true}
          value={this.props.value} onChangeText={this.props.onChange} />
        <Button icon={<SearchIcon />} onPress={this._onToggle} />
      </Box>
    );
  }
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

const STYLE = StyleSheet.create({
  text: {
    ...formFieldTextInput,
    height: spacingUnit * 2,
    fontSize: fontSize(4),
    fontWeight: '600',
    flex: 1
  },
  box: {
    flex: 1,
    paddingLeft: 0
  }
});
