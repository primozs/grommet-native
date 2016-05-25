// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, TouchableHighlight, View,
  StyleSheet } from 'react-native';
import Text from './Text';
import { colorForIndex, padSize } from '../style';

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
        paddingHorizontal: padSize('medium'),
        paddingVertical: padSize('small'),
        justifyContent: 'center',
        alignItems: 'center'
      },
      text: {
        color: colorForIndex('text'),
        fontSize: 19,
        fontWeight: '600'
      }
    };
    if (props.icon && ! props.label) {
      style.view.paddingHorizontal = padSize('small');
    } else if (props.primary) {
      style.view.backgroundColor = colorForIndex('brand');
      style.text.color = colorForIndex('colored');
    } else if (props.colorIndex) {
      style.text.color = colorForIndex(props.colorIndex);
    } else if (props.fill) {
      if (props.accent) {
        style.view.backgroundColor = colorForIndex('accent-3');
        style.text.color = colorForIndex('colored');
      }
    } else if (! props.fill) {
      style.view.borderWidth = 4;
      style.view.borderStyle = 'solid';
      if (props.secondary) {
        style.view.borderColor = colorForIndex('border');
      } else if (props.accent) {
        style.view.borderColor = colorForIndex('accent-3');
      } else {
        style.view.borderColor = colorForIndex('brand');
      }
    }
    if ('between' === props.justify) {
      style.view.justifyContent = 'space-between';
    }
    if (props.fill) {
      style.view.flex = 1;
      if (props.icon && props.label && props.reverse) {
        delete style.view.paddingHorizontal;
        style.view.paddingRight = padSize('small');
        style.view.paddingLeft = padSize('medium');
      }
    }
    if (props.label && props.icon) {
      if (props.reverse) {
        style.text.paddingRight = padSize('small');
      } else {
        style.text.paddingLeft = padSize('small');
      }
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
      <TouchableHighlight style={this.props.style} onPress={this.props.onPress}>
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
