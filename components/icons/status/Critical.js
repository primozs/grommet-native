// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react-native';
import { Path } from 'react-native-svg';
import { svgColorForIndex } from '../../../style';
import Icon from '../Icon';

export default class Critical extends Component {

  render () {
    const { inverse, disabled, size } = this.props;
    let fill, detailStroke;
    if (disabled) {
      fill = svgColorForIndex('unset');
      detailStroke = svgColorForIndex('colored');
    } else if (inverse) {
      fill = svgColorForIndex('colored');
      detailStroke = svgColorForIndex('critical');
    } else {
      fill = svgColorForIndex('critical');
      detailStroke = svgColorForIndex('colored');
    }
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill="none" strokeWidth="2" strokeLinecap="butt"
          stroke={detailStroke.color} strokeOpacity={detailStroke.opacity}
          d="M8,8 L16,16 M8,16 L16,8" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Path fill={fill.color} fillOpacity={fill.opacity}
          d="M12,0 L24,12 L12,24 L0,12 Z" />
        {detail}
      </Icon>
    );
  }
};

Critical.propTypes = {
  disabled: PropTypes.bool,
  inverse: PropTypes.bool,
  size: Icon.propTypes.size
};

Critical.icon = true;
