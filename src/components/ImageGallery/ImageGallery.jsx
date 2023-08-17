import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import css from './ImageGallery.module.css';

function ImageGallery({ images, onClickImg }) {
  return (
    <ul className={css.container}>
      {images.map(img => {
        const { id, frontId, tags, webformatURL, largeImageURL } = img;
        return (
          <ImageGalleryItem
            key={frontId}
            id={id}
            tags={tags}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClickImg={onClickImg}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      ...ImageGalleryItem.propTypes,
    })
  ),
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGallery;
