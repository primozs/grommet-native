// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react-native';
import { Path } from 'react-native-art-svg';
import { colorForIndex } from '../../../style';
import Icon from '../Icon';

export default class Warning extends Component {

  render () {
    const { size } = this.props;
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill="none" strokeWidth="2" strokeLinecap="butt"
          stroke={colorForIndex('colored')}
          d="M12,8 L12,14 M12,16 L12,18" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Path stroke="none" fill={colorForIndex('warning')}
          d="M12,0 L0,22 L24,22 L12,0 L12,0 Z" />
        {detail}
      </Icon>
    );
  }
};

Warning.propTypes = {
  size: Icon.propTypes.size
};

Warning.icon = true;
