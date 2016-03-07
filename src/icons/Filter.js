// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { Image } from 'react-native';

const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAYAAABu3ppsAAAABGdBTUEAALGPC/xhBQAAAcVJREFUaAXtWUtOAzEMZRBSLwBngDXHqeBIfE7E5yZl33VZgp9gVI/HmSR1flPFktVkYsfPz3Y1aoeLP/n5/1zbx3C5NsQS79kk8C0zW8F+gvmBAGMOuL7T/qqBRIABWDg2rIF5Is+0k0avE4s6G2CQuIB1Jsj0jVQaP84syz1AbIkHGJ2dcU2HO+F0oP09aWlBTPQ5T2BHe2BcFDgCNHf8ov3NolfaQ8RCTI4hikhtqBdLlxB/8ND6Yr4IBsBGiaEOHlpfAq6hnn19+S6KOE9eeQyMqRcjwLtmzzu0vhjZLmaBsxOVvLQMfLFWzTXU2tAiVnLJwVTOyqoEpOzVErOlJpEicEoiVJC+h5bS52hFH171XBvqkOE71U8FYXl4CpOWylmwOn1dvexy0N5ycUdVwVDz116sXSLt4GuSweR9dJagXfeG2h1v9qzO5mcVT57tHvcK1K5Nr0CvgJGB3kJGAs3uvQJmCo0X9ApEEHgbYVvcVL4mjwA2tNiSfpBKG/lmSib1RIK7IyhPpHtSecb39RCLyBxUyBqJIcFmJAQ0bD5J0VJoraZkKQGwjT/l0FbNipZAs2xrLI4JjL3dNNtaAtXY/gWv6xHQ575UwQAAAABJRU5ErkJggg==';

export default Filter = (props) => (
  <Image source={{uri: IMAGE, scale: 2}} style={{width: 24, height: 24}} />
);
