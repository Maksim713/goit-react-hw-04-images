import { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGalleryStatus from './ImageGalleryStatus';
import Modal from './Modal';
import Container from './Container';
import css from './App.module.css';

const initialModalImg = {
  largeImageURL: '',
  tags: '',
};

function App() {
  const [search, setSearch] = useState('');
  const [modalImg, setModalImg] = useState(initialModalImg);
  const [showedModal, setShowedModal] = useState(false);

  const getSearchValue = value => setSearch(value);

  const getModalImg = modalImg => {
    setModalImg(modalImg);
    toggleModal();
  };

  const handleKeyDownEscModal = () => {
    toggleModal();
    setModalImg(initialModalImg);
  };

  const toggleModal = () => setShowedModal(p => !p);

  const { largeImageURL, tags } = modalImg;

  return (
    <div className={css.container}>
      <Searchbar onSubmit={getSearchValue} />
      <Container>
        <ImageGalleryStatus search={search} onClickImg={getModalImg} />
      </Container>
      {showedModal && (
        <Modal
          src={largeImageURL}
          alt={tags}
          onKeyDownEsc={handleKeyDownEscModal}
        />
      )}
    </div>
  );
}

export default App;
