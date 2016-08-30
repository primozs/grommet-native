// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import TextInput from './TextInput';
import Box from './Box';
import Button from './Button';
import SearchIcon from './icons/Search';
import Style from '../Style';

let _style;
Style.connect((nextStyle) => {
  _style = StyleSheet.create({
    text: {
      height: nextStyle.spacingUnit * 2,
      marginHorizontal: nextStyle.spacingUnit,
      fontSize: nextStyle.fontSize(4),
      fontWeight: '600',
      flex: 1
    },
    box: {
      flex: 1,
      paddingLeft: 0
    }
  });
});

export default class Search extends Component {

  constructor () {
    super();
    this._onToggle = this._onToggle.bind(this);
  }

  _onToggle () {
    if (this._input.isFocused()) {
      this._input.blur();
    } else {
      this._input.focus();
    }
  }

  render () {
    return (
      <Box style={_style.box} direction="row" align="center">
        <TextInput ref={(c) => this._input = c} style={_style.text}
          placeholder="Search"
          placeholderTextColor={Style.colorForIndex('secondary')}
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
