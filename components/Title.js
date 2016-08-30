// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Style from '../Style';

let _style;
Style.connect((nextStyle) => {
  _style = StyleSheet.create({
    text: {
      fontSize: nextStyle.fontSize(5),
      fontWeight: '600',
      textAlign: 'center'
    },
    view: {
      alignItems: 'center',
      flexDirection: 'row',
      flex: 1,
      height: (nextStyle.spacingUnit * 2),
      justifyContent: 'center'
    }
  });
});

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
      style.view.paddingHorizontal = Style.padSize(props.pad);
    }
    if (props.colorIndex) {
      style.text.color = Style.colorForIndex(props.colorIndex);
    }
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <View style={[_style.view, style.view]}>
        <Text style={[_style.text, style.text]}>
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
