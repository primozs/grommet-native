// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontFamily } from '../style';

export default GrommetText = (props) => {
  return (
    <Text {...props} style={[STYLE.text, props.style]}>
      {props.children}
    </Text>
  );
};

const STYLE = StyleSheet.create({
  text: {
    fontFamily: fontFamily
  }
});
