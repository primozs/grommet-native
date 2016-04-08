// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, TextInput } from 'react-native';
import Box from './Box';
import SearchIcon from './icons/Search';
import { formFieldTextInput } from '../style';

export default class Search extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = { fontSize: 24, fontWeight: '600' };
    return style; //StyleSheet.create(style);
  }

  render () {
    return (
      <Box style={this.props.style} direction="row" align="center" pad="small">
        <TextInput style={{ ...formFieldTextInput, flex: 1, paddingLeft: 0 }}
          value={this.props.value} onChangeText={this.props.onChange} />
        <SearchIcon />
      </Box>
    );
  }

}

Search.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
