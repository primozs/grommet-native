// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import Icon from './Icon';
export default class Close extends Icon {};
Close.defaultProps = { ...Icon.defaultProps,
  pathCommands: "M3,21L21,3 M3,3l18,18"
};
