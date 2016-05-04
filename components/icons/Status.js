// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react-native';
import OK from './status/OK';
import Critical from './status/Critical';
import Warning from './status/Warning';
import Disabled from './status/Disabled';
import Unknown from './status/Unknown';
// import Blank from './status/Blank';
// import Label from './status/Label';

const TYPE = {
  critical: Critical,
  disabled: Disabled,
  ok: OK,
  unknown: Unknown,
  warning: Warning
};

export default class Status extends Component {

  render () {
    const { inverse, size, value, disabled } = this.props;
    const Type = TYPE[value.toLowerCase()] || TYPE.unknown;
    return <Type size={size} inverse={inverse} disabled={disabled} />;
  }
};

Status.propTypes = {
  disabled: PropTypes.bool,
  inverse: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
  value: PropTypes.oneOf(['critical', 'Critical', 'disabled', 'Disabled',
    'ok', 'OK', 'unknown', 'Unknown', 'warning', 'Warning'])
};

Status.defaultProps = {
  value: 'unknown'
};

Status.icon = true;
