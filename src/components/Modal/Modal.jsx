import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

function Modal({ onKeyDownEsc, src, alt }) {
  const onKeyDown = useCallback(
    e => {
      if (e.key !== 'Escape') return;
      onKeyDownEsc();
    },
    [onKeyDownEsc]
  );

  const onClickOverlay = useCallback(
    ({ target, currentTarget }) => {
      if (target !== currentTarget) return;
      onKeyDownEsc();
    },
    [onKeyDownEsc]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className={css.overlay} onClick={onClickOverlay}>
      <div className={css.modal}>
        <img className={css.modalImg} src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onKeyDownEsc: PropTypes.func.isRequired,
};

export default Modal;
