// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react-native';
import Box from './Box';

export default Header = (props) => {
  return (
    <Box {...props}>{props.children}</Box>
  );
};

Header.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Header.defaultProps = {
  pad: { horizontal: 'none', vertical: 'none', between: 'small'},
  direction: 'row',
  align: 'center'
};
