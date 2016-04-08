// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component } from 'react-native';
import { Circle, Path } from 'react-native-art-svg';
import { colorForIndex } from '../../../style';
import Icon from '../Icon';

export default class OK extends Component {

  render () {
    const { size } = this.props;
    let detail;
    if ('small' !== size) {
      detail = (
        <Path stroke="none" fill={colorForIndex('colored')}
          d="M10,17.4 L5.3,12.7 L6.7,11.3 L10,14.6 L17.3,7.3 L18.7,8.7 L10,17.4 Z" />
      );
    } else {
      detail = <Path stroke="none" fill="none" />;
    }
    return (
      <Icon size={size}>
        <Circle cx="12" cy="12" r="12" stroke="none" fill={colorForIndex('ok')} />
        {detail}
      </Icon>
    );
  }
};

OK.propTypes = {
  size: Icon.propTypes.size
};

OK.icon = true;
