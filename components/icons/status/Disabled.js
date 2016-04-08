// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react-native';
import { Path } from 'react-native-art-svg';
import { colorForIndex } from '../../../style';
import Icon from '../Icon';

export default class Disabled extends Component {

  render () {
    const { size } = this.props;
    let detail;
    if ('small' !== size) {
      detail = (
        <Path fill="none" strokeWidth="2" strokeLinecap="butt"
          stroke={colorForIndex('colored')}
          d="M6,12 L18,12" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Path stroke="none" fill={colorForIndex('disabled')}
          d="M21,24 L3,24 C1.3,24 0,22.7 0,21 L0,3 C0,1.3 1.3,0 3,0 L21,0 C22.7,0 24,1.3 24,3 L24,21 C24,22.7 22.7,24 21,24 L21,24 Z" />
        {detail}
      </Icon>
    );
  }
};

Disabled.propTypes = {
  size: Icon.propTypes.size
};

Disabled.icon = true;
