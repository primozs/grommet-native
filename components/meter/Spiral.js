// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import { G, Text } from 'react-native-svg';
import {baseUnit, baseDimension, translateEndAngle, arcCommands} from './utils';
import Graphic from './Graphic';

var SPIRAL_WIDTH = baseDimension;
var SPIRAL_RADIUS = (baseDimension / 2) - (baseUnit / 2);
var RING_THICKNESS = baseUnit;
// Allow for active value content next to a spiral meter
var SPIRAL_TEXT_PADDING = (baseUnit * 2);

export default class Spiral extends Graphic {

  constructor (props) {
    super(props);
    //needed in Graphic.js to fix minification issues
    this.displayName = 'Spiral';
  }

  _stateFromProps (props) {
    const viewBoxHeight = Math.max(SPIRAL_WIDTH,
      RING_THICKNESS * (props.series.length + 1) * 2);
    const viewBoxWidth = viewBoxHeight + (2 * SPIRAL_TEXT_PADDING);

    const state = {
      startAngle: 0,
      anglePer: 270.0 / props.max.value,
      angleOffset: 180,
      // The last spiral ends out near but not quite at the edge of the view box.
      startRadius: Math.max(SPIRAL_RADIUS,
        RING_THICKNESS * (props.series.length + 0.5)) -
          (Math.max(0, (props.series.length - 1)) * RING_THICKNESS),
      viewBoxWidth: viewBoxWidth,
      viewBoxHeight: viewBoxHeight
    };

    return state;
  }

  _sliceCommands (trackIndex, item, startValue) {
    const startAngle = translateEndAngle(this.state.startAngle, this.state.anglePer, startValue);
    const endAngle = translateEndAngle(startAngle, this.state.anglePer, item.value);
    const radius = Math.min(SPIRAL_RADIUS, this.state.startRadius + (trackIndex * RING_THICKNESS));
    return arcCommands(SPIRAL_WIDTH / 2, SPIRAL_WIDTH / 2, radius,
      startAngle + this.state.angleOffset,
      endAngle + this.state.angleOffset);
  }

  _renderThresholds () {
    return <G />;
  }

  _renderTopLayer () {
    let x = SPIRAL_RADIUS + RING_THICKNESS;
    let y = SPIRAL_RADIUS + (RING_THICKNESS * 2.2);
    const labels = this.props.series.map(function (item, index) {

      const textX = x;
      const textY = y;

      y += RING_THICKNESS;

      return (
        <Text key={item.label || index} x={textX} y={textY}
          textAnchor="start" fontSize={16} >
          {item.label}
        </Text>
      );
    }, this);

    return (
      <G>
        {labels}
      </G>
    );
  }
}

Spiral.defaultProps = {
  thresholds: []
};

//needed in Graphic.js to fix minification issues
Spiral.displayName = 'Spiral';
