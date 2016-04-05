// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Svg, { G, Path } from 'react-native-art-svg';
import { buildPath, propTypes } from './utils';

export default class Graphic extends Component {

  constructor(props) {
    super();
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps (newProps) {
    this.setState(this._stateFromProps(newProps));
  }

  // override
  _stateFromProps (props) {
    return {};
  }

  // override
  _sliceCommands (trackIndex, item, startValue) {
    return "";
  }

  _renderSlice (trackIndex, item, itemIndex, startValue, threshold) {
    let path;
    if (! item.hidden) {
      let commands = this._sliceCommands(trackIndex, item, startValue);
      path = buildPath(itemIndex, commands, item.colorIndex, item.important);
    }

    return path;
  }

  _renderSlices (series, trackIndex, threshold) {
    let startValue = this.props.min.value;

    let paths = series.map(function (item, itemIndex) {
      let path = this._renderSlice(trackIndex, item, itemIndex, startValue, threshold);
      startValue += item.value;
      return path;
    }, this);

    return paths;
  }

  _loadingCommands () {
    return this._sliceCommands(0, this.props.max, this.props.min.value);
  }

  _renderLoading () {
    let commands = this._loadingCommands();
    return [
      <Path key="loading" d={commands} />
    ];
  }

  _renderValues () {
    let values;
    if (this.props.stacked) {
      values = this._renderSlices(this.props.series, 0);
    } else {
      values = this.props.series.map((item, index) => {
        return this._renderSlice(index, item, index, this.props.min.value);
      });
    }
    if (values.length === 0) {
      values = this._renderLoading();
    }
    return (
      <G fill="none" strokeLinecap="butt">
        {values}
      </G>
    );
  }

  _renderTracks () {
    const trackValue = { value: this.props.max.value, colorIndex: 'unset' };
    let tracks;
    if (this.props.stacked) {
      tracks = this._renderSlice(0, trackValue, 0, this.props.min.value, true);
    } else {
      tracks = this.props.series.map((item, index) => {
        return this._renderSlice(index, trackValue, index, this.props.min.value, true);
      });
    }
    return (
      <G fill="none" strokeLinecap="butt">
        {tracks}
      </G>
    );
  }

  _renderThresholds () {
    let thresholds = this._renderSlices(this.props.thresholds, -0.4, true);
    return <G>{thresholds}</G>;
  }

  _renderTopLayer () {
    return <G />;
  }

  _renderInlineLegend () {
    return <G />;
  }

  render () {
    const tracks = this._renderTracks();
    const values = this._renderValues();
    const thresholds = this._renderThresholds();
    const topLayer = this._renderTopLayer();
    const inlineLegend = this._renderInlineLegend();

    return (
      <Svg
        width={this.state.viewBoxWidth}
        height={this.state.viewBoxHeight}
        viewBox={"0 0 " + this.state.viewBoxWidth +
          " " + this.state.viewBoxHeight}
        preserveAspectRatio="xMidYMid meet">
        {thresholds}
        {tracks}
        {values}
        {topLayer}
        {inlineLegend}
      </Svg>
    );
  }
}

Graphic.propTypes = {
  stacked: PropTypes.bool,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })).isRequired,
  vertical: PropTypes.bool,
  ...propTypes
};

Graphic.contextTypes = {
  intl: PropTypes.object
};
