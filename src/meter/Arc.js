// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React from 'react';
import { Path } from 'react-native-art-svg';
import { baseUnit, baseDimension, translateEndAngle, arcCommands, polarToCartesian } from './utils';
import Graphic from './Graphic';

const ARC_WIDTH = baseDimension;
const ARC_HEIGHT = Math.round(baseDimension * 0.75);
const ARC_RADIUS = (baseDimension / 2) - (baseUnit / 2);
const INDICATOR_HUB_RADIUS = (baseUnit / 4);
const RING_THICKNESS = baseUnit;

function singleIndicatorCommands (centerX, centerY, radius, startAngle, endAngle, length) {
  const point = polarToCartesian(centerX, centerY, radius - (length - INDICATOR_HUB_RADIUS), endAngle - 1);
  const start = polarToCartesian(centerX, centerY, radius, endAngle - 1);
  const d = [
    "M", centerX, centerY - INDICATOR_HUB_RADIUS,
    "A", INDICATOR_HUB_RADIUS, INDICATOR_HUB_RADIUS, 0, 1, 1,
    centerX, (centerY + INDICATOR_HUB_RADIUS),
    "A", INDICATOR_HUB_RADIUS, INDICATOR_HUB_RADIUS, 0, 1, 1,
    centerX, (centerY - INDICATOR_HUB_RADIUS),
    "M", point.x, point.y,
    "L", start.x, start.y
  ].join(" ");
  return d;
}

export default class Arc extends Graphic {

  constructor (props) {
    super(props);
    //needed in Graphic.js to fix minification issues
    this.displayName = 'Arc';
  }

  _viewBoxDimensions (props) {
    let viewBoxWidth;
    let viewBoxHeight;
    if (props.vertical) {
      viewBoxWidth = ARC_HEIGHT;
      viewBoxHeight = ARC_WIDTH;
    } else {
      viewBoxWidth = ARC_WIDTH;
      viewBoxHeight = ARC_HEIGHT;
    }
    return [viewBoxWidth, viewBoxHeight];
  }

  _stateFromProps (props) {
    const viewBoxDimensions = this._viewBoxDimensions(props);

    const state = {
      startAngle: 60,
      anglePer: (! props.max) ? 0 : 240.0 / (props.max.value - props.min.value),
      angleOffset: 180,
      viewBoxWidth: viewBoxDimensions[0],
      viewBoxHeight: viewBoxDimensions[1]
    };
    if (props.vertical) {
      state.angleOffset = 90;
    } else {
      state.angleOffset = 180;
    }

    return state;
  }

  _sliceCommands (trackIndex, item, startValue) {
    const startAngle = translateEndAngle(this.state.startAngle, this.state.anglePer, startValue);
    const endAngle = Math.max(startAngle + (item.value > 0 ? (RING_THICKNESS / 2) : 0),
      translateEndAngle(startAngle, this.state.anglePer, item.value));
    const radius = Math.max(1, ARC_RADIUS - (trackIndex * RING_THICKNESS));
    return arcCommands(ARC_WIDTH / 2, ARC_WIDTH / 2, radius,
      startAngle + this.state.angleOffset,
      endAngle + this.state.angleOffset);
  }

  _renderTopLayer () {
    let indicator;
    if (this.props.series.length === 1) {
      const item = this.props.series[0];
      const startAngle = this.state.startAngle;
      const endAngle = translateEndAngle(startAngle, this.state.anglePer, item.value);
      const length = ARC_RADIUS;
      const x = ARC_WIDTH / 2;
      const y = ARC_WIDTH / 2;
      const indicatorCommands =
        singleIndicatorCommands(x, y, ARC_RADIUS,
          startAngle + this.state.angleOffset,
          endAngle + this.state.angleOffset,
          length);
      indicator = (
        <Path fill="none" d={indicatorCommands} />
      );
    } else {
      indicator = <Path />;
    }

    return indicator;
  }
}
