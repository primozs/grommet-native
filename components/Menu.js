// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, Children } from 'react';
import { StyleSheet } from 'react-native';
import Box from './Box';
import { colorForIndex } from '../style';

export default Menu = (props) => {
  // TODO: Add separator between children
  const children = Children.map(props.children, (element, index) => {
    let result;
    if (element) {
      let style = (0 === index) ? [STYLE.child, STYLE.firstChild] : STYLE.child;
      result = React.cloneElement(element, {style: style});
    }
    return result;
  });
  return (
    <Box fill={true}>
      {children}
    </Box>
  );
};

Menu.propTypes = {
  inline: PropTypes.bool
};

const STYLE = StyleSheet.create({
  child: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: colorForIndex('border')
  },
  firstChild: {
    borderTopWidth: 1
  }
});
