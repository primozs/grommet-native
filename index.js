// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import Box from './components/Box';
import Button from './components/Button';
import Chart from './components/Chart';
import Footer from './components/Footer';
import FormField from './components/FormField';
import FormFields from './components/FormFields';
import Header from './components/Header';
import Heading from './components/Heading';
import Menu from './components/Menu';
import Meter from './components/Meter';
import Notification from './components/Notification';
import Query from './utils/Query';
import Search from './components/Search';
import Text from './components/Text';
import TextInput from './components/TextInput';
import Title from './components/Title';
import { colorForIndex, padSize, spacingUnit, errorText, fontFamily,
  formFieldTextInput } from './style';
import * as icons from './components/icons/index';

const style = {
  colorForIndex: colorForIndex,
  errorText: errorText,
  fontFamily: fontFamily,
  formFieldTextInput: formFieldTextInput,
  padSize: padSize,
  spacingUnit: spacingUnit
};

export { Box, Button, Chart, Footer, FormField, FormFields, Header, Heading,
  Menu, Meter, Notification, Query, Search, Text, TextInput, Title, style,
  icons };
