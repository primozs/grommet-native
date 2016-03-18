// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import Box from './Box';
import Button from './Button';
import FormField from './FormField';
import FormFields from './FormFields';
import Header from './Header';
import Heading from './Heading';
import Title from './Title';
import { colorIndex, padSize, spacingUnit, errorText, formFieldTextInput } from './style';
import * as icons from './icons/index';

const style = {
  colorIndex: colorIndex,
  errorText: errorText,
  formFieldTextInput: formFieldTextInput,
  padSize: padSize,
  spacingUnit: spacingUnit
};

export { Box, Button, FormField, FormFields, Header, Heading, Title, style, icons };
