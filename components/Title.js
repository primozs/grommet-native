// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { spacingUnit, padSize, colorForIndex } from '../style';

export default class Title extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ style: this._styleFromProps(nextProps) });
  }

  _styleFromProps (props) {
    let style = { view: {}, text: {} };
    if (props.pad) {
      style.view.paddingHorizontal = padSize(props.pad);
    }
    if (props.colorIndex) {
      style.text.color = colorForIndex(props.colorIndex);
    }
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <View style={[STYLE.view, style.view]}>
        <Text style={[STYLE.text, style.text]}>
          {this.props.children}
        </Text>
      </View>
    );
  }
}

Title.propTypes = {
  colorIndex: PropTypes.string,
  pad: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
};

const STYLE = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    height: (spacingUnit * 2),
    justifyContent: 'center'
  }
});
