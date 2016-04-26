// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View, StyleSheet } from 'react-native';
import { padSize } from '../style';

export default class FormFields extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = { view: {marginBottom: padSize('large')} };
    if (props.flex) {
      style.view.flex = 1;
    }
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <View style={style.view}>
        {this.props.children}
      </View>
    );
  }
}

FormFields.propTypes = {
  flex: PropTypes.bool
};
