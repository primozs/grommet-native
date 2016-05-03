// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, StyleSheet } from 'react-native';
import Text from './Text';
import Box from './Box';
import Meter from './Meter';
import Timestamp from './Timestamp';
import StatusIcon from './icons/Status';
import { colorForIndex, padSize, spacingUnit } from '../style';

export default Notification = (props) => {

  let context;
  if (props.context) {
    context = <Text style={STYLE.context}>{props.context}</Text>;
  }

  let timestamp;
  if (props.timestamp) {
    timestamp = <Timestamp value={props.timestamp} style={STYLE.timestamp} />;
  }

  let state;
  if (props.state) {
    state = <Text style={STYLE.state}>{props.state}</Text>;
  }

  let progress;
  if (props.percentComplete || 0 === props.percentComplete) {
    progress = (
      <Meter units="%"
        series={[{
          value: props.percentComplete,
          label: '',
          colorIndex: 'light-1'
        }]}
        size="large" colorIndex="colored" />
    );
  }

  return (
    <Box {...props} colorIndex={props.status} direction="row">
      <StatusIcon value={props.status} inverse={true} />
      <Box direction="column" style={{marginLeft: padSize('small')}}>
        <Text style={STYLE.message}>
          {props.message}
        </Text>
        {context}
        {timestamp}
        {state}
        {progress}
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

const STYLE = StyleSheet.create({
  context: {
    color: colorForIndex('colored'),
    fontWeight: '600'
  },
  message: {
    color: colorForIndex('colored'),
    marginTop: (spacingUnit / 6),
    marginBottom: (spacingUnit / 6)
  },
  state: {
    color: colorForIndex('colored')
  },
  timestamp: {
    color: colorForIndex('colored')
  }
});
