// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Path, Rect, Circle, Line, Text } from 'react-native-svg';
import { fontSize, colorForIndex } from '../style';

const DEFAULT_WIDTH = 384;
const DEFAULT_HEIGHT = 192;
const XAXIS_HEIGHT = 24;
const YAXIS_WIDTH = 12;
const BAR_PADDING = 2;
const MIN_LABEL_WIDTH = 48;
const SPARKLINE_STEP_WIDTH = 6;
const SPARKLINE_BAR_PADDING = 1;
const POINT_RADIUS = 6;
const BAR_SEGMENT_HEIGHT = 18; // 12 + 6 tied to stroke-dashoffset in CSS

export default class Chart extends Component {

  constructor(props) {
    super(props);
    this._onLayout = this._onLayout.bind(this);
    this.state = this._stateFromProps(props, DEFAULT_WIDTH, DEFAULT_HEIGHT);
  }

  componentWillReceiveProps (newProps) {
    let state = this._stateFromProps(newProps,
      this.state.width, this.state.height);
    this.setState(state);
  }

  // Performs some initial calculations to make subsequent calculations easier.
  _bounds (series, xAxisArg, width, height) {
    // normalize xAxis
    let xAxis;
    if (xAxisArg) {
      if (xAxisArg.data) {
        xAxis = xAxisArg;
      } else {
        xAxis = {
          data: xAxisArg,
          placement: 'top'
        };
      }
    } else {
      xAxis = {data: []};
    }

    // analyze series data
    let minX = null;
    let maxX = null;
    let minY = null;
    let maxY = null;

    series.forEach((item) => {
      item.values.forEach((value, xIndex) => {
        let x, y;
        if (Array.isArray(value)) {
          x = value[0];
          y = value[1];
        } else {
          x = value.x;
          y = value.y;
        }

        if (null === minX) {
          minX = x;
          maxX = x;
          minY = y;
          maxY = y;
        } else {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
        if (xIndex >= xAxis.data.length) {
          xAxis.data.push({value: x, label: ''});
        }
      });
    });

    if (null === minX) {
      minX = 0;
      maxX = 1;
      minY = 0;
      maxY = 100;
    }

    if ('bar' === this.props.type) {
      xAxis.data.forEach((obj, xIndex) => {
        let sumY = 0;
        series.forEach((item) => {
          const value = item.values[xIndex];
          const y = (Array.isArray(value) ? value[1] : value.y);
          sumY += y;
        });
        maxY = Math.max(maxY, sumY);
      });
    }

    if (this.props.threshold) {
      minY = Math.min(minY, this.props.threshold);
      maxY = Math.max(maxY, this.props.threshold);
    }
    if (this.props.thresholds) {
      this.props.thresholds.forEach((obj) => {
        maxY = Math.max(maxY, obj.value);
      });
    }
    if (this.props.hasOwnProperty('min')) {
      minY = this.props.min;
    }
    if (this.props.hasOwnProperty('max')) {
      maxY = this.props.max;
    }
    let spanX = maxX - minX;
    let spanY = maxY - minY;

    if (this.props.sparkline) {
      width = spanX * (SPARKLINE_STEP_WIDTH + SPARKLINE_BAR_PADDING);
    }

    let graphWidth = width;
    let graphHeight = height;
    if (this.props.thresholds) {
      graphWidth -= YAXIS_WIDTH;
    }
    if (xAxis.placement) {
      graphHeight -= XAXIS_HEIGHT;
    }
    let graphTop = ('top' === xAxis.placement ? XAXIS_HEIGHT : 0);
    // graphBottom is the bottom graph Y value
    let graphBottom = ('bottom' === xAxis.placement ?
      (height - XAXIS_HEIGHT) : height);

    let graphLeft = 0;
    let graphRight = graphWidth;
    if (this.props.points) {
      graphLeft += POINT_RADIUS + 2;
      graphRight -= POINT_RADIUS + 2;
    }

    let scaleX = (graphWidth / spanX);
    let xStepWidth = Math.round(graphWidth / (xAxis.data.length - 1));
    if ('bar' === this.props.type) {
      // allow room for bar width for last bar
      scaleX = (graphWidth / (spanX + (spanX / (xAxis.data.length - 1))));
      xStepWidth = Math.round(graphWidth / xAxis.data.length);
    }
    let scaleY = (graphHeight / spanY);
    let barPadding = Math.max(BAR_PADDING, Math.round(xStepWidth / 8));
    if (this.props.sparkline) {
      xStepWidth = SPARKLINE_STEP_WIDTH;
      barPadding = SPARKLINE_BAR_PADDING;
    }

    let result = {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      spanX: spanX,
      spanY: spanY,
      scaleX: scaleX,
      scaleY: scaleY,
      graphWidth: graphWidth,
      graphHeight: graphHeight,
      graphTop: graphTop,
      graphBottom: graphBottom,
      graphLeft: graphLeft,
      graphRight: graphRight,
      xStepWidth: xStepWidth,
      barPadding: barPadding,
      xAxis: xAxis
    };

    return result;
  }

  // Adjusts the legend position and set the width, height, and
  // redo the bounds calculations.
  // Called whenever the browser resizes or new properties arrive.
  _onLayout (event) {
    if (this.props.legend && 'overlay' === this.props.legend.position) {
      this._alignLegend();
    }
    var rect = event.nativeEvent.layout;
    if (rect.width !== this.state.width || rect.height !== this.state.height) {
      let bounds = this._bounds(this.props.series, this.props.xAxis,
        rect.width, rect.height);
      let width = rect.width;
      if (this.props.sparkline) {
        width = bounds.graphWidth;
      }
      this.setState({
        width: width,
        height: rect.height,
        bounds: bounds
      });
    }
  }

  // Generates state based on the provided props.
  _stateFromProps (props, width, height) {
    let bounds = this._bounds(props.series, props.xAxis, width, height);
    let defaultXIndex = -1;
    if (props.series && props.series.length > 0) {
      defaultXIndex = 0;
    }
    if (props.hasOwnProperty('important')) {
      defaultXIndex = props.important;
    }
    let highlightXIndex = defaultXIndex;
    if (this.state && this.state.highlightXIndex >= 0) {
      highlightXIndex = this.state.highlightXIndex;
    }
    // normalize size
    let size = props.size ||
      (props.small ? 'small' :
        (props.large ? 'large' : null));
    return {
      bounds: bounds,
      defaultXIndex: defaultXIndex,
      highlightXIndex: highlightXIndex,
      width: width,
      height: height,
      size: size
    };
  }

  // Translates X value to X coordinate.
  _translateX (x) {
    let bounds = this.state.bounds;
    return Math.max(bounds.graphLeft,
      Math.min(bounds.graphRight, Math.round((x - bounds.minX) * bounds.scaleX)));
  }

  // Translates Y value to Y coordinate.
  _translateY (y) {
    let bounds = this.state.bounds;
    // leave room for line width since strokes are aligned to the center
    return Math.max(1,
      (bounds.graphBottom - Math.max(1, this._translateHeight(y))));
  }

  // Translates Y value to graph height.
  _translateHeight (y) {
    let bounds = this.state.bounds;
    return Math.round((y - bounds.minY) * bounds.scaleY);
  }

  // Translates X and Y values to X and Y coordinates.
  _coordinates (value) {
    let x, y;
    if (Array.isArray(value)) {
      x = value[0];
      y = value[1];
    } else {
      x = value.x;
      y = value.y;
    }
    return [this._translateX(x), this._translateY(y)];
  }

  // Uses the provided colorIndex or provides one based on the seriesIndex.
  _itemColorIndex (item, seriesIndex) {
    return item.colorIndex || ('graph-' + (seriesIndex + 1));
  }

  // Determines what the appropriate control coordinates are on
  // either side of the coordinate at the specified index.
  // This calculation is a simplified smoothing function that
  // just looks at whether the line through this coordinate is
  // ascending, descending or not. Peaks, valleys, and flats are
  // treated the same.
  _controlCoordinates (coordinates, index) {
    let current = coordinates[index];
    // Use previous and next coordinates when available, otherwise use
    // the current coordinate for them.
    let previous = current;
    if (index > 0) {
      previous = coordinates[index - 1];
    }
    let next = current;
    if (index < coordinates.length - 1) {
      next = coordinates[index + 1];
    }

    // Put the control X coordinates midway between the coordinates.
    let deltaX = (current[0] - previous[0]) / 2;
    let deltaY;

    // Start with a flat slope. This works for peaks, valleys, and flats.
    let first = [current[0] - deltaX, current[1]];
    let second = [current[0] + deltaX, current[1]];

    if (previous[1] < current[1] && current[1] < next[1]) {
      // Ascending, use the minimum positive slope.
      deltaY = Math.min(((current[1] - previous[1]) / 2),
        ((next[1] - current[1]) / 2));
      first[1] = current[1] - deltaY;
      second[1] = current[1] + deltaY;
    } else if (previous[1] > current[1] && current[1] > next[1]) {
      // Descending, use the minimum negative slope.
      deltaY = Math.min(((previous[1] - current[1]) / 2),
        ((current[1] - next[1]) / 2));
      first[1] = current[1] + deltaY;
      second[1] = current[1] - deltaY;
    }
    return [first, second];
  }

  // Converts the series data into paths for line or area types.
  _renderLinesOrAreas () {
    let bounds = this.state.bounds;
    let values = this.props.series.map((item, seriesIndex) => {

      // Get all coordinates up front so they are available
      // if we are drawing a smooth chart.
      let coordinates = item.values.map((value) => {
        return this._coordinates(value);
      });

      let colorIndex = this._itemColorIndex(item, seriesIndex);
      let commands = null;
      let controlCoordinates = null;
      let previousControlCoordinates = null;
      let points = [];

      // Build the commands for this set of coordinates.
      coordinates.forEach((coordinate, index) => {
        if (this.props.smooth) {
          controlCoordinates = this._controlCoordinates(coordinates, index);
        }
        if (0 === index) {
          commands = "M" + coordinate.join(',');
        } else {
          if (this.props.smooth) {
            // Use the previous right control coordinate and the current
            // left control coordinate. We do this because we calculate
            // the left and right sides for a particular index together,
            // so the path is smooth but the SVG C command needs the
            // right one from the previous index and the left one from
            // the current index.
            commands += " C" + previousControlCoordinates[1].join(',') + " " +
              controlCoordinates[0].join(',') + " " + coordinate.join(',');
          } else {
            commands += " L" + coordinate.join(',');
          }
        }

        if (this.props.points && ! this.props.sparkline) {
          let x = Math.max(POINT_RADIUS + 1,
            Math.min(bounds.graphWidth - (POINT_RADIUS + 1), coordinate[0]));
          const value = item.values[index];
          points.push(
            <Circle key={index}
              cx={x} cy={coordinate[1]} r={POINT_RADIUS} onClick={value.onClick} />
          );
        }

        previousControlCoordinates = controlCoordinates;
      });

      let linePath;
      if ('line' === this.props.type || this.props.points) {
        linePath = (
          <Path fill="none" d={commands} />
        );
      }

      let areaPath;
      if ('area' === this.props.type) {
        // For area charts, close the path by drawing down to the bottom
        // and across to the bottom of where we started.
        let close = 'L' + coordinates[coordinates.length - 1][0] +
          ',' + bounds.graphBottom +
          'L' + coordinates[0][0] + ',' + bounds.graphBottom + 'Z';
        let areaCommands = commands + close;
        areaPath = (
          <Path stroke="none" d={areaCommands} />
        );
      }

      return (
        <G key={`line_group_${seriesIndex}`} onClick={item.onClick}>
          {areaPath}
          {linePath}
          {points}
        </G>
      );
    });

    return values;
  }

  // Converts the series data into rects for bar types.
  _renderBars () {
    const { segmented } = this.props;
    const { bounds } = this.state;

    let values = bounds.xAxis.data.map((obj, xIndex) => {
      let baseY = bounds.minY;
      let legend = [];
      let stepBars = this.props.series.map((item, seriesIndex) => {

        const colorIndex = item.colorIndex || `graph-${(seriesIndex + 1)}`;
        const value = item.values[xIndex];
        let valueX, valueY;
        if (Array.isArray(value)) {
          valueX = value[0];
          valueY = value[1];
        } else {
          valueX = value.x;
          valueY = value.y;
        }
        let stepBarHeight = this._translateHeight(valueY);
        let stepBarBase = this._translateHeight(baseY);
        baseY += valueY;

        if ('bottom' === bounds.xAxis.placement) {
          stepBarBase += XAXIS_HEIGHT;
        }

        const width = bounds.xStepWidth - (2 * bounds.barPadding);
        const x = (this._translateX(valueX) + bounds.barPadding) +
          (width / 2);
        if (segmented) {
          stepBarBase =
            Math.floor(stepBarBase / BAR_SEGMENT_HEIGHT) * BAR_SEGMENT_HEIGHT;
          stepBarHeight =
            Math.floor(stepBarHeight / BAR_SEGMENT_HEIGHT) * BAR_SEGMENT_HEIGHT;
        }
        const y = this.state.height - (stepBarHeight + stepBarBase);

        if (this.props.legend && 'inline' === this.props.legend.position) {
          legend.push(
            <Text key={'bar-value_' + item.label || seriesIndex}
              x={x} y={y} role="presentation" textAnchor="middle"
              fontSize={fontSize(4)}>
              {value[1]}
            </Text>
          );
        }

        return (
          <Line key={'bar_' + item.label || seriesIndex}
            x1={x} y1={y + stepBarHeight} x2={x} y2={y}
            strokeWidth={width} onClick={value.onClick} />
        );
      });

      return (
        <G key={'bar_' + xIndex}>
          {stepBars}
          {legend}
        </G>
      );
    });

    return values;
  }

  // Converts the threshold value into a line.
  _renderThreshold () {
    let y = this._translateY(this.props.threshold);
    let commands = 'M0,' + y + 'L' + this.state.width + ',' + y;
    return (
      <G role="presentation">
        <Path fill="none" d={commands} />
      </G>
    );
  }

  _labelPosition (valueX, bounds) {
    let x = this._translateX(valueX);
    let startX = x;
    let anchor;
    if ('line' === this.props.type || 'area' === this.props.type) {
      // Place the text in the middle for line and area type charts.
      anchor = 'middle';
      startX = x - (MIN_LABEL_WIDTH / 2);
    }
    if (x <= 0) {
      // This is the first data point, align the text to the left edge.
      x = 0;
      startX = x;
      anchor = 'start';
    }
    if (x >= (bounds.graphWidth - MIN_LABEL_WIDTH)) {
      // This is the last data point, align the text to the right edge.
      x = bounds.graphWidth;
      startX = x - MIN_LABEL_WIDTH;
      anchor = 'end';
    } else if ('bar' === this.props.type) {
      x += bounds.barPadding;
      startX = x;
    }
    return {x: x, anchor: anchor, startX: startX, endX: startX + MIN_LABEL_WIDTH};
  }

  _labelOverlaps (pos1, pos2) {
    return (pos1 && pos2 && pos1.endX > pos2.startX && pos1.startX < pos2.endX);
  }

  // Converts the xAxis labels into texts.
  _renderXAxis () {
    let bounds = this.state.bounds;
    let labelY;
    if ('bottom' === bounds.xAxis.placement) {
      labelY = this.state.height - Math.round(XAXIS_HEIGHT * 0.3);
    } else {
      labelY = Math.round(XAXIS_HEIGHT * 0.6);
    }
    let priorPosition = null;
    let highlightPosition = null;
    if (this.state.highlightXIndex >= 0 &&
      bounds.xAxis.data.length > this.state.highlightXIndex) {
      highlightPosition =
        this._labelPosition(bounds.xAxis.data[this.state.highlightXIndex].value, bounds);
    }
    let lastPosition = null;
    if (bounds.xAxis.data.length > 0) {
      lastPosition =
        this._labelPosition(bounds.xAxis.data[bounds.xAxis.data.length - 1].value, bounds);
    }

    let labels = bounds.xAxis.data.map((obj, xIndex) => {
      let position = this._labelPosition(obj.value, bounds);

      // Ensure we don't overlap labels. But, make sure we show the first and
      // last ones.
      if (this._labelOverlaps(position, highlightPosition) ||
        (xIndex !== 0 && xIndex !== (bounds.xAxis.data.length - 1) &&
          (this._labelOverlaps(position, priorPosition) ||
          this._labelOverlaps(position, lastPosition)))) {
        // classes.push(`${CLASS_ROOT}__xaxis-index--eclipse`);
      } else {
        priorPosition = position;
      }

      return (
        <G key={'x_axis_' + xIndex}>
          <Text x={position.x} y={labelY} role="presentation"
            textAnchor={position.anchor} fontSize={fontSize(6)}>
            {obj.label}
          </Text>
        </G>
      );
    });

    return (
      <G ref="xAxis">
        {labels}
      </G>
    );
  }

  // Vertical bars for thresholds.
  _renderYAxis () {
    let bounds = this.state.bounds;
    let start = bounds.minY;
    let end;
    let width = Math.max(4, YAXIS_WIDTH / 2);

    let bars = this.props.thresholds.map((item, index) => {
      if (index < (this.props.thresholds.length - 1)) {
        end = this.props.thresholds[index + 1].value;
      } else {
        end = bounds.maxY;
      }
      let height = this._translateHeight(end - start);
      let y = this._translateY(end);
      start = end;

      return (
        <Rect
          x={this.state.width - width}
          y={y}
          width={width}
          height={height} />
      );
    });

    return (
      <G ref="yAxis">
        {bars}
      </G>
    );
  }

  render () {
    let values = <G />;
    if ('line' === this.props.type || 'area' === this.props.type) {
      values = this._renderLinesOrAreas();
    } else if ('bar' === this.props.type) {
      values = this._renderBars();
    }

    if (values.length === 0) {
      let commands = "M0," + (this.state.height / 2) +
        " L" + this.state.width + "," + (this.state.height / 2);
      values.push(
        <G key="loading">
          <Path stroke="none" d={commands} />
        </G>
      );
    }

    let threshold = <G />;
    if (this.props.threshold) {
      threshold = this._renderThreshold();
    }

    let xAxis = <G />;
    if (this.props.xAxis) {
      xAxis = this._renderXAxis();
    }

    let yAxis = <G />;
    if (this.props.thresholds) {
      yAxis = this._renderYAxis();
    }

    return (
      <View onLayout={this._onLayout}>
        <Svg viewBox={"0 0 " + this.state.width + " " + this.state.height}
          preserveAspectRatio="none">
          {xAxis}
          {yAxis}
          <G>{values}</G>
          {threshold}
        </Svg>
      </View>
    );
  }

}

Chart.propTypes = {
  important: PropTypes.number,
  max: PropTypes.number,
  min: PropTypes.number,
  points: PropTypes.bool,
  segmented: PropTypes.bool,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      colorIndex: PropTypes.string,
      onClick: PropTypes.func,
      label: PropTypes.string,
      units: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.arrayOf(
            PropTypes.oneOfType([
              PropTypes.number,
              PropTypes.object // Date
            ])
          ),
          PropTypes.shape({
            onClick: PropTypes.func,
            x: PropTypes.oneOfType([
              PropTypes.number,
              PropTypes.object // Date
            ]).isRequired,
            y: PropTypes.number.isRequired
          })
        ])
      ).isRequired
    })
  ).isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  smooth: PropTypes.bool,
  sparkline: PropTypes.bool,
  threshold: PropTypes.number,
  thresholds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    colorIndex: PropTypes.string
  })),
  type: PropTypes.oneOf(['line', 'bar', 'area']),
  units: PropTypes.string,
  xAxis: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object // Date
      ]).isRequired,
      label: PropTypes.string.isRequired
    })),
    PropTypes.shape({
      placement: PropTypes.oneOf(['top', 'bottom']),
      data: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.object // Date
        ]).isRequired,
        label: PropTypes.string.isRequired
      }).isRequired)
    })
  ])
};

Chart.defaultProps = {
  min: 0,
  type: 'line'
};
