// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View, Text, StyleSheet } from 'react-native';
import { colorIndex, spacingUnit } from './style';

export default class Button extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = {
      view: {
        paddingHorizontal: spacingUnit,
        paddingVertical: spacingUnit / 3
      },
      text: {}
    };
    if (props.primary) {
      style.view.backgroundColor = colorIndex('brand');
      style.text.color = colorIndex('colored-text');
    } else if (props.accent) {
      style.view.backgroundColor = colorIndex('accent-3');
      style.text.color = colorIndex('colored-text');
    } else {
      style.view.borderWidth = 4;
      style.view.borderStyle = 'solid';
      style.view.borderColor = colorIndex('brand');
      style.text.color = colorIndex('text');
    }
    return StyleSheet.create(style);
  }

  render () {
    const { style } = this.state;
    return (
      <View style={style.view} onClick={this.props.onClick}>
        <Text style={style.text}>{this.props.label}</Text>
      </View>
    );
  }

}

Button.propTypes = {
  a11yTitle: PropTypes.string,
  accent: PropTypes.bool,
  fill: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.node,
  onClick: PropTypes.func,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'reset', 'submit']) // deprecate icon
};

Button.defaultProps = {
  a11yTitle: 'Button',
  type: 'button'
};
