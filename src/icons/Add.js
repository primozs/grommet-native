// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, Image } from 'react-native';

const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAALBJREFUaAXtmEEKgDAMBNX//1lRPJW9jV0pjLcGkqUz8dJ9m/edw+h9OH9yPD6Z8uMQL/Aj/CdaAxqABFwhCBC3awAjhAM0AAHidg1ghHCABiBA3K4BjBAO0AAEiNuXN3C/FIyvB5hKc8DyBrxAc11S1pTXsjdo/LemZLlCSWuzpoEm7ZSlgUSlWdNAk3bK0kCi0qxpoEk7ZWkgUWnWNNCknbI0kKg0axpo0k5Zyxu4AF3cA13U8MDxAAAAAElFTkSuQmCC';
const IMAGE_COLORED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABGdBTUEAALGPC/xhBQAAALpJREFUaAXtmEEKhDAQBB0/s/9/zr4me7EhBOYi2W4C5WXMgNOmKl6s60/XGOM7j66qz7zedX/vGpSawwZS5JWLAZFIVQykyCsXAyKRqhhIkVcuBkQiVTGQIq9cDIhEqmIgRV65GBCJVK3170HqRd7mcoTektv13PEGaheJdc76bfFnbiX0rI8/QmygMWtrY8CGugnCQAPG1saADXUThIEGjK2NARvqJggDDRhbGwM21E0QBhowtvbxBn5AHAw0JLj78QAAAABJRU5ErkJggg==';

export default Add = (props) => (
  <Image source={{uri: (props.colored ? IMAGE_COLORED : IMAGE), scale: 2}}
    style={{width: 24, height: 24}} />
);

Add.propTypes = {
  colored: PropTypes.bool
};
