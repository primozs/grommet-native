// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react-native';
import { Circle, Path, Rect } from 'react-native-svg';
import { svgColorForIndex } from '../../../style';
import Icon from '../Icon';

export default class OK extends Component {

  render () {
    const { inverse, size } = this.props;
    let fill, detailFill;
    if (inverse) {
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
    // TODO: Remove Rect once Circle with fill works again :(
    return (
      <Icon size={size}>
        <Circle cx="12" cy="12" r="12" fill={fill.color} fillOpacity={fill.opacity} />
        <Rect x="3" y="3" width="18" height="18"
          fill={fill.color} fillOpacity={fill.opacity} />
        {detail}
      </Icon>
    );
  }
};

OK.propTypes = {
  inverse: PropTypes.bool,
  size: Icon.propTypes.size
};

OK.icon = true;
