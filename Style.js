// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import { PixelRatio } from 'react-native';

// Styles are handled in a way that allows the theme to be changed at
// runtime.

const SPACING_UNIT = 24;

const PAD_SIZES = {
  small: SPACING_UNIT / 2,
  medium: SPACING_UNIT,
  large: SPACING_UNIT * 2,
  none: 0
};

const SCALE = (PixelRatio.get() >= 3) ? 1.0 : 1.2;

const FONT_SIZES = [
  64 * SCALE,
  48 * SCALE,
  36 * SCALE,
  24 * SCALE,
  18 * SCALE,
  16 * SCALE
];

// Remember that react-native-art-svg can't handle rgba()
const COLORS = {
  brand: '#865CD6',
  'neutral-1': '#0A64A0',
  'neutral-2': '#DC2878',
  'neutral-3': '#501EB4',
  // 'neutral-4': '#767676',
  'accent-1': '#00CCEB',
  'accent-2': '#FF7D28',
  // 'accent-3': '#ff8d6d',
  critical: '#FF324D',
  error: '#FF324D',
  warning: '#FFD602',
  ok: '#8CC800',
  unknown: '#a8a8a8',
  disabled: '#a8a8a8',
  unset: '#DDDDDD',
  'grey-1': '#333333',
  'grey-2': '#3B3B3B',
  'grey-3': '#434343',
  'grey-4': '#666666',
  'light-1': '#FFFFFF',
  'light-2': '#F5F5F5',
  'text': '#333333',
  'secondary': '#777777',
  'border': 'rgba(0, 0, 0, 0.15)',
  'icon': 'rgba(0, 0, 0, 0.35)',
  'colored': 'rgba(255, 255, 255, 0.9)',
  'colored-inactive': 'rgba(255, 255, 255, 0.5)',
  'active': '#000000',
  'colored-active': '#FFFFFF',
  'pressed': '#DDDDDD'
};

const THEMES = {

  aruba: {
    fontFamily: 'Open Sans',
    colors: {
      brand: '#ff8300',
      'neutral-1': '#646569',
      'neutral-2': '#004876',
      'neutral-3': '#9FD4C9',
      'accent-1': '#9fd4c9',
      'accent-2': '#d5d848',
      critical: '#FF4C00',
      error: '#FF4C00',
      warning: '#D5D654',
      ok: '#008375',
      unknown: '#C3C5C8',
      disabled: '#C3C5C8',
      'grey-1': '#646569',
      'grey-2': '#C3C5C8',
      'grey-3': '#F6F6F7'
    }
  },

  hpe: {
    fontFamily: 'MetricHPE',
    colors: {
      brand: '#01a982',
      'neutral-1': '#425563',
      'neutral-2': '#5F7A76',
      'neutral-3': '#80746E',
      'neutral-4': '#767676',
      'accent-1': '#2AD2C9',
      'accent-2': '#614767',
      'accent-3': '#ff8d6d',
      critical: '#F04953',
      error: '#F04953',
      warning: '#FFD144',
      ok: '#01a982',
      unknown: '#CCCCCC',
      disabled: '#CCCCCC'
    }
  },

  hpinc: {
    fontFamily: 'HP Simplified',
    colors: {
      brand: '#0096D6',
      'neutral-1': '#006996',
      'neutral-2': '#A65336',
      'neutral-3': '#A69136',
      'neutral-4': '#774677',
      'accent-1': '#E6734B',
      'accent-2': '#E6C84B',
      'accent-3': '#915591',
      critical: '#F04B37',
      error: '#F04B37',
      warning: '#F0AA3C',
      ok: '#509137',
      unknown: '#848484',
      disabled: '#848484'
    }
  }
};

let _colors = COLORS;
//
// function _generateStyle () {
//   return ({
//     errorText: {
//       marginVertical: PAD_SIZES.small,
//       color: colorForIndex('error')
//     },
//     formFieldTextInput: {
//       height: SPACING_UNIT * 2,
//       marginHorizontal: SPACING_UNIT
//       // underlineColorAndroid: 'transparent'
//     },
//     text: {
//       fontFamily: _fontFamily
//     }
//   });
// }

export function colorForIndex (name) {
  return _colors[name];
};

// react-native-art-svg doesn't understand rgba() color values. So, we parse
// them to set strokeOpacity.
const RGBA = new RegExp(/rgba\(([^,]+,[^,]+,[^,]+),\s*([^\)]+)\)/);

export function svgColorForIndex (name) {
  let color = colorForIndex(name);
  const match = RGBA.exec(color);
  let opacity = 1;
  if (match) {
    color = `rgb(${match[1]})`;
    opacity = parseFloat(match[2]);
  }
  return { color: color, opacity: opacity };
}

export function padSize (name) {
  return PAD_SIZES[name];
};

export function fontSize (level) {
  return FONT_SIZES[level];
}

let _style = {
  colorForIndex: colorForIndex,
  fontSize: fontSize,
  padSize: padSize,
  spacingUnit: SPACING_UNIT,
  svgColorForIndex: svgColorForIndex
};
let _listeners = [];

export function theme (opt) {
  const theme = (typeof opt === 'string') ? THEMES[opt] : opt;
  _fontFamily = theme.fontFamily;
  _colors = { ...COLORS, ...theme.colors };
  _style.fontFamily = theme.fontFamily;
  // notify that the theme may have changed things
  _listeners.forEach(listener => listener(_style));
}

export function connect (func) {
  _listeners.push(func);
  return func(_style);
}

export default {
  ..._style,
  connect: connect,
  theme: theme
};

// export function formFieldTextInput () {
//   return _style.formFieldTextInput;
// };
//
// export function errorText () {
//   return _style.errorText;
// };
//
// export function text () {
//   return _style.text;
// };
