import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({
  onClickImg,
  largeImageURL,
  tags,
  id,
  webformatURL,
}) {
  const handleClickImg = () => onClickImg({ largeImageURL, tags });

  return (
    <li className={css.container}>
      <img
        className={css.image}
        src={webformatURL}
        alt={tags}
        data-key={id}
        onClick={handleClickImg}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  onClickImg: PropTypes.func,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
