// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { Path } from 'react-native-svg';
import Style from '../../../Style';
import Icon from '../Icon';

export default class Warning extends Component {

  render () {
    const { inverse, disabled, size } = this.props;
    let fill, detailStroke;
    if (disabled) {
      fill = Style.svgColorForIndex('unset');
      detailStroke = Style.svgColorForIndex('colored');
    } else if (inverse) {
      fill = Style.svgColorForIndex('colored');
      detailStroke = Style.svgColorForIndex('warning');
    } else {
      fill = Style.svgColorForIndex('warning');
      detailStroke = Style.svgColorForIndex('colored');
    }
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill="none" strokeWidth="2" strokeLinecap="butt"
          stroke={detailStroke.color} strokeOpacity={detailStroke.opacity}
          d="M12,8 L12,14 M12,16 L12,18" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Path fill={fill.color} fillOpacity={fill.opacity}
          d="M12,0 L0,22 L24,22 L12,0 L12,0 Z" />
        {detail}
      </Icon>
    );
  }
};

Warning.propTypes = {
  disabled: PropTypes.bool,
  inverse: PropTypes.bool,
  size: Icon.propTypes.size
};

Warning.icon = true;
