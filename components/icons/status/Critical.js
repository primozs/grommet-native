// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react-native';
import { Path } from 'react-native-art-svg';
import { colorForIndex } from '../../../style';
import Icon from '../Icon';

export default class Critical extends Component {

  render () {
    const { inverse, size } = this.props;
    let fill, detailStroke;
    if (inverse) {
      fill = colorForIndex('colored');
      detailStroke = colorForIndex('critical');
    } else {
      fill = colorForIndex('critical');
      detailStroke = colorForIndex('colored');
    }
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill="none" strokeWidth="2" strokeLinecap="butt"
          stroke={detailStroke}
          d="M8,8 L16,16 M8,16 L16,8" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Path stroke="none" fill={fill}
          d="M12,0 L24,12 L12,24 L0,12 Z" />
        {detail}
      </Icon>
    );
  }
};

Critical.propTypes = {
  inverse: PropTypes.bool,
  size: Icon.propTypes.size
};

Critical.icon = true;
