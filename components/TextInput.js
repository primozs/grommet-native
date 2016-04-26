// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { TextInput, StyleSheet } from 'react-native';
import { fontFamily } from '../style';

export default GrommetTextInput = (props) => {
  return (
    <TextInput {...props} style={[STYLE.text, props.style]} />
  );
};

const STYLE = StyleSheet.create({
  text: {
    fontFamily: fontFamily
  }
});
