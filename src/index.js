// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import Box from './Box';
import Button from './Button';
import FormField from './FormField';
import FormFields from './FormFields';
import Header from './Header';
import Heading from './Heading';
import Meter from './Meter';
import Title from './Title';
import { colorForIndex, padSize, spacingUnit, errorText, formFieldTextInput } from './style';
import * as icons from './icons/index';

const style = {
  colorForIndex: colorForIndex,
  errorText: errorText,
  formFieldTextInput: formFieldTextInput,
  padSize: padSize,
  spacingUnit: spacingUnit
};

export { Box, Button, FormField, FormFields, Header, Heading, Meter, Title, style, icons };
