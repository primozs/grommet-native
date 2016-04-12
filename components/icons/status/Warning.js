// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react-native';
import { Path } from 'react-native-art-svg';
import { colorForIndex } from '../../../style';
import Icon from '../Icon';

export default class Warning extends Component {

  render () {
    const { inverse, size } = this.props;
    let fill, detailStroke;
    if (inverse) {
      fill = colorForIndex('colored');
      detailStroke = colorForIndex('warning');
    } else {
      fill = colorForIndex('warning');
      detailStroke = colorForIndex('colored');
    }
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill="none" strokeWidth="2" strokeLinecap="butt"
          stroke={detailStroke}
          d="M12,8 L12,14 M12,16 L12,18" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Path stroke="none" fill={fill}
          d="M12,0 L0,22 L24,22 L12,0 L12,0 Z" />
        {detail}
      </Icon>
    );
  }
};

Warning.propTypes = {
  inverse: PropTypes.bool,
  size: Icon.propTypes.size
};

Warning.icon = true;
