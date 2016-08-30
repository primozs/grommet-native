// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { Path } from 'react-native-svg';
import Style from '../../../Style';
import Icon from '../Icon';

export default class Disabled extends Component {

  render () {
    const { inverse, disabled, size } = this.props;
    let fill, detailStroke;
    if (disabled) {
      fill = Style.svgColorForIndex('unset');
      detailStroke = Style.svgColorForIndex('colored');
    } else if (inverse) {
      fill = Style.svgColorForIndex('colored');
      detailStroke = Style.svgColorForIndex('disabled');
    } else {
      fill = Style.svgColorForIndex('disabled');
      detailStroke = Style.svgColorForIndex('colored');
    }
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill="none" strokeWidth="2" strokeLinecap="butt"
          stroke={detailStroke.color} strokeOpacity={detailStroke.opacity}
          d="M6,12 L18,12" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Path fill={fill.color} fillOpacity={fill.opacity}
          d={"M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 " +
            "C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z"} />
        {detail}
      </Icon>
    );
  }
};

Disabled.propTypes = {
  disabled: PropTypes.bool,
  inverse: PropTypes.bool,
  size: Icon.propTypes.size
};

Disabled.icon = true;
