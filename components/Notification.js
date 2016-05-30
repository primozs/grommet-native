// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';
import Box from './Box';
import Meter from './Meter';
import Timestamp from './Timestamp';
import StatusIcon from './icons/Status';
import { colorForIndex, spacingUnit } from '../style';

export default class Notification extends Component {

  setNativeProps (nativeProps) {
    this.refs.box.setNativeProps(nativeProps);
  }

  render () {
    let context;
    if (this.props.context) {
      context = <Text style={STYLE.context}>{this.props.context}</Text>;
    }

    let timestamp;
    if (this.props.timestamp) {
      timestamp = <Timestamp value={this.props.timestamp} style={STYLE.timestamp} />;
    }

    let state;
    if (this.props.state) {
      state = <Text style={STYLE.state}>{this.props.state}</Text>;
    }

    let progress;
    if (this.props.percentComplete || 0 === this.props.percentComplete) {
      progress = (
        <Meter units="%"
          series={[{
            value: this.props.percentComplete,
            label: '',
            colorIndex: 'light-1'
          }]}
          size="large" colorIndex="colored" />
      );
    }

    return (
      <Box ref="box" {...this.props} colorIndex={this.props.status} direction="row">
        <StatusIcon value={this.props.status} inverse={true} />
        <Box direction="column" flex={true} pad={{horizontal: 'medium'}}>
          <Text style={STYLE.message}>
            {this.props.message}
          </Text>
          {context}
          {timestamp}
          {state}
          {progress}
          {this.props.children}
        </Box>
      </Box>
    );
  }
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
