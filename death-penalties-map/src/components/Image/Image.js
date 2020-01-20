import React from 'react';
import PropTypes from 'prop-types';
import imageUrlBuilder from '@sanity/image-url';
import sanity from '../../lib/sanity';
import style from './Image.module.scss';

const builder = imageUrlBuilder(sanity);

function Image({ node }) {
  const { alt, asset } = node;
  if (!asset) {
    return undefined;
  }
  return (
    <img
      src={builder
        .image(asset)
        .auto('format')
        .width(1000)
        .fit('clip')
        .url()}
      alt={alt}
      className={style.image}
    />
  );
}

Image.propTypes = {
  node: PropTypes.shape({
    alt: PropTypes.string,
    caption: PropTypes.string,
    asset: PropTypes.shape({
      _ref: PropTypes.string
    })
  })
};
export default Image;
