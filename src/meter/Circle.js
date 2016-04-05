// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import Graphic from './Graphic';
import { baseDimension, baseUnit, translateEndAngle, arcCommands } from './utils';

const CIRCLE_WIDTH = baseDimension;
const CIRCLE_RADIUS = (baseDimension / 2) - (baseUnit / 2);
const RING_THICKNESS = baseUnit;

export default class Circle extends Graphic {

  constructor (props) {
    super(props);
    //needed in Graphic.js to fix minification issues
    this.displayName = 'Circle';
  }

  _stateFromProps (props) {
    if (! props.stacked &&
      (props.series.length - 1) * RING_THICKNESS > CIRCLE_RADIUS) {
      console.warn("You cannot have more than " +
        Math.round(CIRCLE_RADIUS / RING_THICKNESS) +
        " data values in a circle Meter");
    }

    const state = {
      startAngle: 0,
      anglePer: (! props.max) ? 0 : 360 / (props.max.value - props.min.value),
      angleOffset: 180,
      viewBoxWidth: CIRCLE_WIDTH,
      viewBoxHeight: CIRCLE_WIDTH
    };

    return state;
  }

  _sliceCommands (trackIndex, item, startValue) {
    const startAngle = translateEndAngle(this.state.startAngle, this.state.anglePer, startValue);
    const endAngle = Math.max(startAngle + (item.value > 0 ? (RING_THICKNESS / 2) : 0),
      translateEndAngle(startAngle, this.state.anglePer, item.value));
    const radius = Math.max(1, CIRCLE_RADIUS - (trackIndex * RING_THICKNESS));
    return arcCommands(CIRCLE_WIDTH / 2, CIRCLE_WIDTH / 2, radius,
      startAngle + this.state.angleOffset,
      endAngle + this.state.angleOffset);
  }
}

//needed in Graphic.js to fix minification issues
Circle.displayName = 'Circle';
