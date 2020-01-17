import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../../lib/sanity';

const builder = imageUrlBuilder(sanity);

function Figure({ node }) {
  const { alt, asset } = node;
  if (!asset) {
    return undefined;
  }
  return (
    <img
      src={builder
        .image(asset)
        .auto('format')
        .width(2000)
        .url()}
      alt={alt}
    />
  );
}

Figure.propTypes = {
  node: PropTypes.shape({
    alt: PropTypes.string,
    caption: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string
    })
  })
};
export default Figure;
