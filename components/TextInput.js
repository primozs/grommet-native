// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

// import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { fontFamily } from '../style';

export default class GrommetTextInput extends TextInput {};

const STYLE = StyleSheet.create({
  text: {
    fontFamily: fontFamily
  }
});

GrommetTextInput.defaultProps = {
  style: STYLE.text
};
