// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, StyleSheet } from 'react-native';
import TextInput from './TextInput';
import Box from './Box';
import Text from './Text';
import SearchIcon from './icons/Search';
import { formFieldTextInput, padSize } from '../style';

export default Search = (props) => {
  let placeholder;
  if (! props.value) {
    placeholder = <Text style={STYLE.placeholder}>Search</Text>;
  }

  return (
    <Box style={STYLE.box} direction="row" align="center" pad="small">
      {placeholder}
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
  placeholder: {
    position: 'absolute',
    left: padSize('medium'),
    top: padSize('small'),
    fontSize: 20,
    fontWeight: '100'
  },
  box: {
    flex: 1,
    paddingLeft: 0
  }
});
