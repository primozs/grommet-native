// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react-native';
import Box from './Box';

export default Footer = (props) => {
  return (
    <Box {...props}>{props.children}</Box>
  );
};

Footer.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  ...Box.propTypes
};

Footer.defaultProps = {
  pad: { horizontal: 'none', vertical: 'none', between: 'small'},
  direction: 'row',
  align: 'center'
};
