// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Image } from 'react-native';

const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAALBJREFUaAXtmEEKgDAMBNX//1lRPJW9jV0pjLcGkqUz8dJ9m/edw+h9OH9yPD6Z8uMQL/Aj/CdaAxqABFwhCBC3awAjhAM0AAHidg1ghHCABiBA3K4BjBAO0AAEiNuXN3C/FIyvB5hKc8DyBrxAc11S1pTXsjdo/LemZLlCSWuzpoEm7ZSlgUSlWdNAk3bK0kCi0qxpoEk7ZWkgUWnWNNCknbI0kKg0axpo0k5Zyxu4AF3cA13U8MDxAAAAAElFTkSuQmCC';

export default Add = (props) => (
  <Image source={{uri: IMAGE, scale: 2}} style={{width: 24, height: 24}} />
);
