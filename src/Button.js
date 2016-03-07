// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, TouchableHighlight, View, Text,
  StyleSheet } from 'react-native';
import { colorIndex, padSize } from './style';

export default class Button extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = {
      view: {
        paddingHorizontal: padSize('medium'),
        paddingVertical: padSize('small')
      },
      text: {
        color: colorIndex('text'),
        fontSize: 19,
        fontWeight: '600'
      }
    };
    if (props.icon) {
      style.view.paddingHorizontal = padSize('small');
    } else if (props.primary) {
      style.view.backgroundColor = colorIndex('brand');
      style.text.color = colorIndex('colored-text');
    } else if (props.accent) {
      style.view.backgroundColor = colorIndex('accent-3');
      style.text.color = colorIndex('colored-text');
    } else {
      style.view.borderWidth = 4;
      style.view.borderStyle = 'solid';
      style.view.borderColor = colorIndex('brand');
    }
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    let label;
    if (this.props.label) {
      label = <Text style={style.text}>{this.props.label}</Text>;
    }
    let icon = this.props.icon;
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={style.view}>
          {icon}
          {label}
        </View>
      </TouchableHighlight>
    );
  }

}

Button.propTypes = {
  accent: PropTypes.bool,
  fill: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.node,
  onPress: PropTypes.func,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool
};
