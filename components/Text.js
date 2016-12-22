// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import { Text, StyleSheet } from 'react-native';
import Style from '../Style';

let _style;
Style.connect((nextStyle) => {
  _style = StyleSheet.create({
    error: {
      marginVertical: nextStyle.padSize('small'),
      color: nextStyle.colorForIndex('error')
    },
    text: {
      fontFamily: nextStyle.fontFamily,
      fontSize: Style.fontSize(5)
    }
  });
});

export default GrommetText = (props) => {
  const { error } = props;

  let styles = [_style.text];
  if (error) {
    styles.push(_style.error);
  }
  styles.push(props.style);

  return (
    <Text {...props} style={styles}>
      {props.children}
    </Text>
  );
};

GrommetText.propTypes = {
  error: PropTypes.bool
};
