// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { Circle, Path } from 'react-native-svg';
import { svgColorForIndex } from '../../../style';
import Icon from '../Icon';

export default class OK extends Component {

  render () {
    const { inverse, disabled, size } = this.props;
    let fill, detailFill;
    if (disabled) {
      fill = svgColorForIndex('unset');
      detailFill = svgColorForIndex('colored');
    } else if (inverse) {
      fill = svgColorForIndex('colored');
      detailFill = svgColorForIndex('ok');
    } else {
      fill = svgColorForIndex('ok');
      detailFill = svgColorForIndex('colored');
    }
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill={detailFill.color} fillOpacity={detailFill.opacity}
          d="M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 L10,17.4 Z" />
      );
    } else {
      detail = <Path fill="none" />;
    }
    return (
      <Icon size={size}>
        <Circle cx="12" cy="12" r="12" fill={fill.color} fillOpacity={fill.opacity} />
        {detail}
      </Icon>
    );
  }
};

OK.propTypes = {
  disabled: PropTypes.bool,
  inverse: PropTypes.bool,
  size: Icon.propTypes.size
};

OK.icon = true;
