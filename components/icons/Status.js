// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react-native';
import OK from './status/OK';
import Critical from './status/Critical';
import Warning from './status/Warning';
import Disabled from './status/Disabled';
import Unknown from './status/Unknown';
// import Blank from './status/Blank';
// import Label from './status/Label';

const COMPONENT = {
  critical: Critical,
  disabled: Disabled,
  ok: OK,
  unknown: Unknown,
  warning: Warning
};

export default class Status extends Component {

  render () {
    const { size, value } = this.props;
    const Component = COMPONENT[value.toLowerCase()] || COMPONENT.unknown;
    return <Component size={size} />;
  }
};

Status.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge'])
};

Status.icon = true;
