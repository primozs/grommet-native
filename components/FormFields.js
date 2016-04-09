// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View } from 'react-native';
import { padSize } from '../style';

export default class FormFields extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = { marginBottom: padSize('large') };
    if (props.flex) {
      style.flex = 1;
    }
    return style; //StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <View style={style}>
        {this.props.children}
      </View>
    );
  }
}

FormFields.propTypes = {
  flex: PropTypes.bool
};
