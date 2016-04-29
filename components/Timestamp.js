// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, StyleSheet } from 'react-native';
import Text from './Text';

export default class Timestamp extends Component {

  render () {
    let value = typeof this.props.value === 'string' ?
      new Date(this.props.value) : this.props.value;
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = value.toLocaleDateString('en-US', dateOptions);
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const time = value.toLocaleTimeString('en-US', timeOptions);
    return (
      <Text style={STYLE.text}>
        {date} {time}
      </Text>
    );
  }
}

Timestamp.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.object, // Date
    PropTypes.string
  ])
};

const STYLE = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '100',
    textAlign: 'right'
  }
});
