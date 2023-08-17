import PropTypes from 'prop-types';
import { ITEMS_PER_PAGE } from '../../services/pixabayApi';
import { useSearch } from 'components/Searchbar/useSearch';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from '../Button';
import Loader from '../Loader';
import css from './ImageGalleryStatus.module.css';

function ImageGalleryStatus({ search, onClickImg }) {
  const {
    images,
    page,
    setPage,
    totalHits,
    error,
    isLoading,
    setLoadMoreClicked,
  } = useSearch(search);

  const handleMoreBtnClick = () => {
    document.body.style.overflow = 'hidden';
    setPage(p => p + 1);
    setLoadMoreClicked(true);
  };

  const pages = Math.ceil(totalHits / ITEMS_PER_PAGE);

  if (isLoading) {
    return <Loader />;
  }

  if (images.length === 0 && !error) {
    return <div className={css.message}>No images found.</div>;
  }

  if (error && !isLoading) {
    return <p className={css.container}>{error}</p>;
  }

  if (!error && images.length > 0) {
    return (
      <>
        <ImageGallery images={images} onClickImg={onClickImg} />
        {pages > page && !isLoading && (
          <Button page={page} pages={pages} onClick={handleMoreBtnClick} />
        )}
      </>
    );
  }
}

ImageGalleryStatus.propTypes = {
  search: PropTypes.string.isRequired,
  onClickImg: PropTypes.func.isRequired,
};

export default ImageGalleryStatus;
