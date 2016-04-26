// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View, StatusBar, StyleSheet } from 'react-native';
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

  componentWillReceiveProps (nextProps) {
    this.setState({ style: this._styleFromProps(nextProps) });
  }

  _styleFromProps (props) {
    let style = { view: {} };
    if (props.direction) {
      style.view.flexDirection = props.direction;
    }
    if (props.align) {
      style.view.alignItems = ALIGN_MAP[props.align];
    }
    if (props.justify) {
      style.view.justifyContent = JUSTIFY_MAP[props.justify];
    }
    if (typeof props.pad === 'string') {
      style.view.padding = padSize(props.pad);
    } else if (typeof props.pad === 'object') {
      if (props.pad.horizontal) {
        style.view.paddingHorizontal = padSize(props.pad.horizontal);
      }
      if (props.pad.vertical) {
        style.view.paddingVertical = padSize(props.pad.vertical);
      }
    }
    if (props.separator) {
      style.view.borderColor = colorForIndex('border');
      if ('top' === props.separator) {
        style.view.borderTopWidth = 1;
      } else if ('bottom' === props.separator) {
        style.view.borderBottomWidth = 1;
      } else if ('left' === props.separator) {
        style.view.borderLeftWidth = 1;
      } else if ('right' === props.separator) {
        style.view.borderRightWidth = 1;
      } else if ('horizontal' === props.separator) {
        style.view.borderTopWidth = 1;
        style.view.borderBottomWidth = 1;
      } else if ('vertical' === props.separator) {
        style.view.borderLeftWidth = 1;
        style.view.borderRightWidth = 1;
      }
    }
    if (props.flex) {
      style.view.flex = 1;
    }
    if (props.colorIndex) {
      style.view.backgroundColor = colorForIndex(props.colorIndex);
    }
    if (props.statusBar) {
      style.view.paddingTop = style.view.paddingVertical + 12;
    }
    return StyleSheet.create(style);
  };

  setNativeProps (nativeProps) {
    this.refs.view.setNativeProps(nativeProps);
  }

  render () {
    const { style } = this.state;
    let statusBar;
    if (this.props.statusBar) {
      const barStyle = (this.props.colorIndex ? 'light-content' : 'default');
      statusBar = <StatusBar barStyle={barStyle} />;
    }
    return (
      <View ref="view" style={[style.view, this.props.style]}>
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
