// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

const SPACING_UNIT = 24;

const FONT_FAMILY = 'MetricHPE';

const PAD_MAP = {
  small: SPACING_UNIT / 2,
  medium: SPACING_UNIT,
  large: SPACING_UNIT * 2,
  none: 0
};

// Remember that react-native-art-svg can't handle rgba()
const COLOR_MAP = {
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
  disabled: '#CCCCCC',
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
  'colored-active': '#FFFFFF'
};

export const spacingUnit = SPACING_UNIT;

export function colorForIndex (name) {
  return COLOR_MAP[name];
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
  return PAD_MAP[name];
};

export const formFieldTextInput = {
  height: SPACING_UNIT,
  paddingHorizontal: SPACING_UNIT
};

export const errorText = {
  paddingVertical: PAD_MAP.small,
  color: colorForIndex('error')
};

export const fontFamily = FONT_FAMILY;
