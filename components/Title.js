// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View, Text } from 'react-native';
import { spacingUnit, padSize, colorForIndex } from '../style';

export default class Title extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = {
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
    };
    if (props.pad) {
      style.view.paddingHorizontal = padSize(props.pad);
    }
    if (props.colorIndex) {
      style.text.color = colorForIndex(props.colorIndex);
    }
    return style; //StyleSheet.create(style);
  }

  render () {
    return (
      <View style={{...this.state.style.view, ...this.props.style}}>
        <Text style={this.state.style.text}>
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
