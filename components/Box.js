// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View, StatusBar } from 'react-native';
import { padSize, colorForIndex } from '../style';

const ALIGN_MAP = {
  start: 'align-start',
  end: 'align-end',
  center: 'center'
};

const JUSTIFY_MAP = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between'
};

export default class Box extends Component {

  constructor (props) {
    super(props);
    this.state = { style: this._styleFromProps(props) };
  }

  _styleFromProps (props) {
    let style = {};
    if (props.direction) {
      style.flexDirection = props.direction;
    }
    if (props.align) {
      style.alignItems = ALIGN_MAP[props.align];
    }
    if (props.justify) {
      style.justifyContent = JUSTIFY_MAP[props.justify];
    }
    if (typeof props.pad === 'string') {
      style.padding = padSize(props.pad);
    } else if (typeof props.pad === 'object') {
      if (props.pad.horizontal) {
        style.paddingHorizontal = padSize(props.pad.horizontal);
      }
      if (props.pad.vertical) {
        style.paddingVertical = padSize(props.pad.vertical);
      }
    }
    if (props.flex) {
      style.flex = 1;
    }
    if (props.colorIndex) {
      style.backgroundColor = colorForIndex(props.colorIndex);
    }
    if (props.statusBar) {
      style.paddingTop = style.paddingVertical + 12;
    }
    return style; //StyleSheet.create(style);
  };

  render () {
    let statusBar;
    if (this.props.statusBar) {
      const barStyle = (this.props.colorIndex ? 'light-content' : 'default');
      statusBar = <StatusBar barStyle={barStyle} />;
    }
    return (
      <View style={{...this.state.style, ...this.props.style}}>
        {statusBar}
        {this.props.children}
      </View>
    );
  }

}

Box.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end', 'stretch']),
  backgroundImage: PropTypes.string,
  colorIndex: PropTypes.string,
  direction: PropTypes.oneOf(['row', 'column']),
  flex: PropTypes.bool,
  full: PropTypes.oneOf([true, 'horizontal', 'vertical', false]),
  justify: PropTypes.oneOf(['start', 'center', 'between', 'end']),
  pad: PropTypes.oneOfType([
    PropTypes.oneOf(['none', 'small', 'medium', 'large']),
    PropTypes.shape({
      between: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      horizontal: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
      vertical: PropTypes.oneOf(['none', 'small', 'medium', 'large'])
    })
  ]),
  primary: PropTypes.bool,
  reverse: PropTypes.bool,
  separator: PropTypes.oneOf(['top', 'bottom', 'left', 'right', 'horizontal', 'vertical', 'all']),
  statusBar: PropTypes.bool,
  textAlign: PropTypes.oneOf(['left', 'center', 'right']),
  texture: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string
  ]),
  wrap: PropTypes.bool
};

Box.defaultProps = {
  direction: 'column',
  pad: 'none'
};
