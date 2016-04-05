// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

const SPACING_UNIT = 24;

const PAD_MAP = {
  small: SPACING_UNIT / 2,
  medium: SPACING_UNIT,
  large: SPACING_UNIT * 2,
  none: 0
};

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
  'text': '#333333',
  'secondary': '#777777',
  'colored-text': 'rgba(255, 255, 255, 0.85)',
  'border': 'rgba(0, 0, 0, 0.15)'
};

export const spacingUnit = SPACING_UNIT;

export function colorForIndex (name) {
  return COLOR_MAP[name];
};

export function padSize (name) {
  return PAD_MAP[name];
};

export const formFieldTextInput = {
  height: SPACING_UNIT,
  paddingHorizontal: SPACING_UNIT
};

export const errorText = {
  color: colorForIndex('error')
};
