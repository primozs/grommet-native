// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import Icon from './Icon';
export default class Cube extends Icon {};
Cube.defaultProps = { ...Icon.defaultProps,
  pathCommands: "M2,6.118l10-5l10,5v12l-10,5l-10-5V6.118z M2,6.118 l10,5l10-5 M12,11.118v12"
};
