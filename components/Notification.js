// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, Text } from 'react-native';
import Box from './Box';
import StatusIcon from './icons/Status';
import { colorForIndex, padSize, spacingUnit } from '../style';


export default Notification = (props) => {
  return (
    <Box {...props} colorIndex={props.status} direction="row">
      <StatusIcon value={props.status} inverse={true} />
      <Box direction="column" style={{marginLeft: padSize('small')}}>
        <Text style={{color: colorForIndex('colored'), marginTop: (spacingUnit / 6)}}>
          {props.message}
        </Text>
        {props.children}
      </Box>
    </Box>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['critical', 'disabled', 'ok', 'unknown', 'warning']),
  ...Box.propTypes
};

Notification.defaultProps = {
  pad: 'medium',
  status: 'unknown'
};
