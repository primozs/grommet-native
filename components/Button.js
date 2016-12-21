// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { TouchableHighlight, View, StyleSheet } from 'react-native';
import Text from './Text';
import Style from '../Style';

export default class Button extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ style: this._styleFromProps(nextProps) });
  }

  _styleFromProps (props) {
    let style = {
      view: {
        flexDirection: 'row',
        paddingHorizontal: Style.padSize('medium'),
        paddingVertical: Style.padSize('small'),
        justifyContent: 'center',
        alignItems: 'center'
      },
      text: {
        color: Style.colorForIndex('text'),
        fontSize: Style.fontSize(5),
        fontWeight: '600'
      }
    };
    if (props.icon && ! props.label) {
      style.view.paddingHorizontal = Style.padSize('small');
    } else if (props.primary) {
      style.view.backgroundColor = Style.colorForIndex('brand');
      style.text.color = Style.colorForIndex('colored');
    } else if (props.colorIndex) {
      style.text.color = Style.colorForIndex(props.colorIndex);
    } else if (props.fill) {
      if (props.accent) {
        style.view.backgroundColor = Style.colorForIndex('accent-3');
        style.text.color = Style.colorForIndex('colored');
      }
    } else if (! props.fill) {
      style.view.borderWidth = 4;
      style.view.borderStyle = 'solid';
      if (props.secondary) {
        style.view.borderColor = Style.colorForIndex('border');
      } else if (props.accent) {
        style.view.borderColor = Style.colorForIndex('accent-3');
      } else {
        style.view.borderColor = Style.colorForIndex('brand');
      }
    }
    if ('between' === props.justify) {
      style.view.justifyContent = 'space-between';
    }
    if (props.fill) {
      // style.view.flex = 1;
      if (props.icon && props.label && props.reverse) {
        delete style.view.paddingHorizontal;
        style.view.paddingRight = Style.padSize('small');
        style.view.paddingLeft = Style.padSize('medium');
      }
    }
    if (props.label && props.icon) {
      if (props.reverse) {
        style.text.paddingRight = Style.padSize('small');
      } else {
        style.text.paddingLeft = Style.padSize('small');
      }
    }
    if (! props.onPress) {
      style.view.opacity = 0.2;
    }

    return StyleSheet.create(style);
  }

  render () {
    const { reverse } = this.props;
    const { style } = this.state;
    let label;
    if (this.props.label) {
      label = <Text style={style.text}>{this.props.label}</Text>;
    }
    const icon = this.props.icon;
    const first = reverse ? label : icon;
    const second = reverse ? icon : label;
    return (
      <TouchableHighlight style={this.props.style} onPress={this.props.onPress}
        underlayColor={Style.colorForIndex('pressed')}>
        <View style={style.view}>
          {first}
          {second}
        </View>
      </TouchableHighlight>
    );
  }

}

Button.propTypes = {
  accent: PropTypes.bool,
  colorIndex: PropTypes.string,
  fill: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.node,
  justify: PropTypes.oneOf(['center', 'between']),
  onPress: PropTypes.func,
  plain: PropTypes.bool,
  primary: PropTypes.bool,
  reverse: PropTypes.bool,
  secondary: PropTypes.bool
};

Button.defaultProps = {
  justify: 'center'
};
