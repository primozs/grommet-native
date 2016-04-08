// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, Text } from 'react-native';
import { padSize } from '../style';

export default class Title extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = { fontSize: 24, fontWeight: '600' };
    if (props.pad) {
      style.paddingHorizontal = padSize(props.pad);
    }
    return style; //StyleSheet.create(style);
  }

  render () {
    return (
      <Text style={{...this.state.style, ...this.props.style}}>{this.props.children}</Text>
    );
  }
}

Title.propTypes = {
  pad: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
};
