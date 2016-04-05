// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes, View, Text } from 'react-native';
import { colorForIndex } from './style';
import { baseDimension, baseUnit } from './meter/utils';
import Bar from './meter/Bar';
import Circle from './meter/Circle';
import Arc from './meter/Arc';
import Spiral from './meter/Spiral';

const TYPE_COMPONENT = {
  'bar': Bar,
  'circle': Circle,
  'arc': Arc,
  'spiral': Spiral
};

export default class Meter extends Component {

  constructor (props) {
    super(props);

    this.state = this._stateFromProps(props);
    if (this.state.placeLegend) {
      this.state.legendPlacement = 'bottom';
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState(this._stateFromProps(nextProps));
  }

  _normalizeSeries (props, min, max, thresholds) {
    let series = [];
    if (props.series) {
      series = props.series;
    } else if (props.value || props.value === 0) {
      series = [
        {value: props.value, important: true}
      ];
    }

    // set color index
    if (series.length === 1 && props.thresholds) {
      let item = series[0];
      if (! item.colorIndex) {
        // see which threshold color index to use
        let cumulative = 0;
        thresholds.some(function (threshold) {
          cumulative += threshold.value;
          if (item.value < cumulative) {
            item.colorIndex = threshold.colorIndex || 'graph-1';
            return true;
          }
          return false;
        });
      }
    } else {
      series.forEach(function (item, index) {
        if (! item.colorIndex) {
          item.colorIndex = `graph-${index + 1}`;
        }
      });
    }

    return series;
  }

  _normalizeThresholds (props, min, max) {
    let thresholds = [];
    if (props.thresholds) {
      // Convert thresholds from absolute values to cummulative,
      // so we can re-use the series drawing code.
      let priorValue = min.value;
      thresholds.push({ hidden: true });
      for (let i = 0; i < props.thresholds.length; i += 1) {
        let threshold = props.thresholds[i];
        // The value for the prior threshold ends at the beginning of this
        // threshold. Series drawing code expects the end value.
        thresholds[i].value = threshold.value - priorValue;
        thresholds.push({
          label: threshold.label,
          colorIndex: threshold.colorIndex,
          ariaLabel: `${threshold.value} ${props.units || ''} ${threshold.label || ''}`
        });
        priorValue = threshold.value;
        if (i === (props.thresholds.length - 1)) {
          thresholds[thresholds.length-1].value = max.value - priorValue;
        }
      }
    } else if (props.threshold) {
      // let remaining = max.value - props.threshold;
      thresholds = [
        { value: props.threshold, hidden: true },
        {
          value: max.value - props.threshold,
          colorIndex: 'critical',
          ariaLabel: `${props.threshold} ${props.units || ''}`
        }
      ];
    }
    return thresholds;
  }

  _importantIndex (props, series) {
    let result = null;
    if (series.length === 1) {
      result = 0;
    }
    if (props.hasOwnProperty('important')) {
      result = props.important;
    }
    series.some(function (data, index) {
      if (data.important) {
        result = index;
        return true;
      }
      return false;
    });
    return result;
  }

  // Normalize min or max to an object.
  _terminal (terminal) {
    if (typeof terminal === 'number') {
      terminal = {value: terminal};
    }
    return terminal;
  }

  _seriesTotal (series) {
    let total = 0;
    series.some(function (item) {
      total += item.value;
    });
    return total;
  }

  _seriesMax (series) {
    let max = 0;
    series.some(function (item) {
      max = Math.max(max, item.value);
    });
    return max;
  }

  _styleFromProps (props) {
    let style = {
      view: {},
      active: {
        view: {
          flexDirection: 'column'
        },
        valueView: {
          flexDirection: 'row',
          alignItems: 'center'
        },
        value: {
          fontSize: 36,
          fontWeight: '700',
          paddingRight: (baseUnit / 4)
        },
        units: {
          fontSize: 20,
          color: colorForIndex('secondary')
        },
        label: {
          fontSize: 16
        }
      }
    };
    if ('bar' === props.type) {
      style.view = {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      };
      style.active.view = {
        paddingLeft: (baseUnit / 2),
        alignItems: 'flex-start'
      };
    } else if ('circle' === props.type) {
      style.active.view = {
        position: 'absolute',
        top: 0,
        width: baseDimension,
        height: baseDimension,
        alignItems: 'center',
        justifyContent: 'center'
      };
    } else if ('arc' === props.type) {
      style.view.paddingBottom = (baseUnit * 2);
      style.view.backgroundColor = "#f2f2f2";
      style.active.view = {
        position: 'absolute',
        bottom: - (baseDimension * 0.65),
        width: baseDimension,
        height: baseDimension,
        alignItems: 'center'
      };
    }
    return style;
  }

  // Generates state based on the provided props.
  _stateFromProps (props) {
    let total;
    if (props.series && props.series.length > 1) {
      total = this._seriesTotal(props.series);
    } else if (props.max && props.max.value) {
      total = props.max.value;
    } else {
      total = 100;
    }
    let seriesMax;
    if (props.series && 'spiral' === props.type) {
      seriesMax = this._seriesMax(props.series);
    }
    // Normalize min and max
    let min = this._terminal(props.min || 0);
    // Max could be provided in props or come from the total of
    // a multi-value series.
    let max = this._terminal(props.max || seriesMax || total);
    // Normalize simple threshold prop to an array, if needed.
    let thresholds = this._normalizeThresholds(props, min, max);
    // Normalize simple value prop to a series, if needed.
    let series = this._normalizeSeries(props, min, max, thresholds);
    // Determine important index.
    let importantIndex = this._importantIndex(props, series);

    let state = {
      importantIndex: importantIndex,
      activeIndex: importantIndex,
      series: series,
      thresholds: thresholds,
      min: min,
      max: max,
      total: total,
      style: this._styleFromProps(props)
    };

    // legend
    state.placeLegend = ! (props.legend && props.legend.placement);
    if (! state.placeLegend) {
      state.legendPlacement = props.legend.placement;
    }

    return state;
  }

  _getActiveFields () {
    let fields;
    if (null === this.state.activeIndex) {
      fields = {
        value: this.state.total,
        label: 'Total'
      };
    } else {
      let active = this.state.series[this.state.activeIndex];
      if (!active) {
        active = this.state.series[0];
      }
      fields = {
        value: active.value,
        label: active.label,
        onClick: active.onClick
      };
    }
    return fields;
  }

  _renderActiveValue () {
    let { style } = this.state;
    let fields = this._getActiveFields();
    let units;
    if (this.props.units) {
      units = (
        <Text style={style.active.units}>
          {this.props.units}
        </Text>
      );
    }

    return (
      <View style={style.active.view}>
        <View style={style.active.valueView}>
          <Text style={style.active.value}>
            {fields.value}
          </Text>
          {units}
        </View>
        <Text style={style.active.label}>
          {fields.label}
        </Text>
      </View>
    );
  }

  render () {
    const { style } = this.state;
    let GraphicComponent = TYPE_COMPONENT[this.props.type];
    let graphic = (
      <GraphicComponent
        activeIndex={this.state.activeIndex}
        min={this.state.min} max={this.state.max}
        legend={this.props.legend}
        onActivate={this._onActivate}
        series={this.state.series}
        stacked={this.props.stacked}
        thresholds={this.state.thresholds}
        total={this.state.total}
        units={this.props.units}
        vertical={this.props.vertical} />
    );
    const activeValue = this._renderActiveValue();
    return (
      <View style={style.view}>
        {graphic}
        {activeValue}
      </View>
    );
  }

}

Meter.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  margin: PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  strong: PropTypes.bool,
  level: PropTypes.oneOf([1, 2, 3, 4, 5])
};

Meter.defaultProps = {
  level: 1
};
