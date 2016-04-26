// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, StyleSheet } from 'react-native';
import TextInput from './TextInput';
import Box from './Box';
import SearchIcon from './icons/Search';
import { formFieldTextInput } from '../style';

export default Search = (props) => {

  return (
    <Box style={STYLE.box} direction="row" align="center" pad="small">
      <TextInput style={STYLE.text}
        value={props.value} onChangeText={props.onChange} />
      <SearchIcon />
    </Box>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};

const STYLE = StyleSheet.create({
  text: {
    ...formFieldTextInput,
    fontSize: 24,
    fontWeight: '600',
    flex: 1
  },
  box: {
    flex: 1,
    paddingLeft: 0
  }
});
