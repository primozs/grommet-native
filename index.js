// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import Box from './components/Box';
import Button from './components/Button';
import FormField from './components/FormField';
import FormFields from './components/FormFields';
import Header from './components/Header';
import Heading from './components/Heading';
import Meter from './components/Meter';
import Title from './components/Title';
import { colorForIndex, padSize, spacingUnit, errorText, formFieldTextInput } from './style';
import * as icons from './components/icons/index';

const style = {
  colorForIndex: colorForIndex,
  errorText: errorText,
  formFieldTextInput: formFieldTextInput,
  padSize: padSize,
  spacingUnit: spacingUnit
};

export { Box, Button, FormField, FormFields, Header, Heading, Meter, Title, style, icons };
