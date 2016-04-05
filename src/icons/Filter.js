// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes, Image } from 'react-native';

const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAYAAABu3ppsAAAABGdBTUEAALGPC/xhBQAAAcVJREFUaAXtWUtOAzEMZRBSLwBngDXHqeBIfE7E5yZl33VZgp9gVI/HmSR1flPFktVkYsfPz3Y1aoeLP/n5/1zbx3C5NsQS79kk8C0zW8F+gvmBAGMOuL7T/qqBRIABWDg2rIF5Is+0k0avE4s6G2CQuIB1Jsj0jVQaP84syz1AbIkHGJ2dcU2HO+F0oP09aWlBTPQ5T2BHe2BcFDgCNHf8ov3NolfaQ8RCTI4hikhtqBdLlxB/8ND6Yr4IBsBGiaEOHlpfAq6hnn19+S6KOE9eeQyMqRcjwLtmzzu0vhjZLmaBsxOVvLQMfLFWzTXU2tAiVnLJwVTOyqoEpOzVErOlJpEicEoiVJC+h5bS52hFH171XBvqkOE71U8FYXl4CpOWylmwOn1dvexy0N5ycUdVwVDz116sXSLt4GuSweR9dJagXfeG2h1v9qzO5mcVT57tHvcK1K5Nr0CvgJGB3kJGAs3uvQJmCo0X9ApEEHgbYVvcVL4mjwA2tNiSfpBKG/lmSib1RIK7IyhPpHtSecb39RCLyBxUyBqJIcFmJAQ0bD5J0VJoraZkKQGwjT/l0FbNipZAs2xrLI4JjL3dNNtaAtXY/gWv6xHQ575UwQAAAABJRU5ErkJggg==';
const IMAGE_COLORED = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAuCAYAAABu3ppsAAAABGdBTUEAALGPC/xhBQAAAsNJREFUaAXtWbtOHDEUZRAKLUpHSigoIqUjfAIVSghCiGZXqelDtT+QNMsXsFtEiYLyaiLxCSAqpBQUtEmH0iZCWs4ZbOnmjndmPPbMaNFYsnxt38c5176zs7vJHNpkMrniOGstSZK1+VkDrfE+GAJ/NbMZmKeYFwzQAca3CvQ55q9xz27VeqNT1CcxHqM/V4GJeS69QgD5HfKIC6LR4FDM2xKJQYMfGcz3BAyydxjPFMoeMvBSrTU2NbF7KiAxEmvaEitwhMFjDJ/Rn3BuGu/aPhj/tAtNjMDyFHE+oj8S8X5B3gGWG7v2HwEuGsMPEBetEsbf6K+kodiLLppEfoHjZeHcmcjMY9RkOi0QYUxHQzi2RS+24oomxhG8SvAMMnDdggwBakKRRT2mLNoG5CaKOrdoBZ5UdBIwSnysuor6hXYSa47s03du0epYmRqQCj53UdpVkRGLRetde7kECKSqYx8SIYnKu0IphrqLGuD5YBiilypanZhCAjSouahZtHxAyDY2MeWaUy5FwFhGL2pkf1rR6vcyJ3guFtaAtAy5q9IPZfiqVLTajxeBWIFjJsLnCqXkQ4sa4IOKVp+ANwE6yCnqNzqAY06dykWr/VUiYJy4irqPDE/9pDZ7fQWCn/ali1bZ+hWxNgYgvn5n3hpxQs+0LufQv8QQ9S035AR4lfhefkBwokmAYjkV9d6B8aH1Ss+DCDAKAFT+ohNiaxkGE7CO2ho7Am1l3sbtTsBmoq2xO4G2Mm/jdidgM9HW2J1AW5m3cbsTsJkoGvEqvVKkU2W/1h9rAZo/jW+i76GvVwFYZFMLAQBfReBd9G30pSIQIfu1EACgHwWg/mD/a4FOqe26CEwLfoEN/utyii8z/6Yp+aw3QYDZ/ob+CaCvfcCV0a2TQPRsuwjFJmDv9kkd2XYRiLKGp8579C3z2Izis6yTO/d03wCAiQcnAAAAAElFTkSuQmCC';

export default Filter = (props) => (
  <Image source={{uri: (props.colored ? IMAGE_COLORED : IMAGE), scale: 2}}
    style={{width: 24, height: 24}} />
);

Filter.propTypes = {
  colored: PropTypes.bool
};