// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import { Path } from 'react-native-art-svg';
import { colorForIndex } from '../../style';

export var baseUnit = 24;
export var baseDimension = 192; // 24 * 8
export var sliceWidth = (baseUnit / 6);
export var sliceImportantWidth = (baseUnit / 2);

export var propTypes = {
  activeIndex: PropTypes.number,
  max: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  }).isRequired,
  min: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string
  }).isRequired,
  // size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string,
    important: PropTypes.bool,
    onClick: PropTypes.func
  })).isRequired,
  total: PropTypes.number.isRequired,
  units: PropTypes.string
};

export function polarToCartesian (centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

export function arcCommands (centerX, centerY, radius, startAngle, endAngle) {
  // handle that we can't draw a complete circle
  if (endAngle - startAngle >= 360) {
    endAngle = startAngle + 359.99;
  }
  var start = polarToCartesian(centerX, centerY, radius, endAngle);
  var end = polarToCartesian(centerX, centerY, radius, startAngle);
  var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  var d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join(" ");
  return d;
};

export function translateEndAngle (startAngle, anglePer, value) {
  return Math.min(360, Math.max(0, startAngle + (anglePer * value)));
}

export function buildPath (itemIndex, commands, colorIndex, active) {
  const strokeWidth = (active ? sliceImportantWidth : sliceWidth);
  return (
    <Path key={itemIndex} d={commands} stroke={colorForIndex(colorIndex)}
      strokeWidth={strokeWidth} />
  );
}
