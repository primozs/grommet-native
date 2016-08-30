// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, Children } from 'react';
import { StyleSheet } from 'react-native';
import Box from './Box';
import Style from '../Style';

let _style;
Style.connect((nextStyle) => {
  _style = StyleSheet.create({
    child: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: nextStyle.colorForIndex('border')
    },
    firstChild: {
      borderTopWidth: 1
    }
  });
});

export default Menu = (props) => {
  // TODO: Add separator between children
  const children = Children.map(props.children, (element, index) => {
    let result;
    if (element) {
      let style = (0 === index) ?
        [_style.child, _style.firstChild] : _style.child;
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
