import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import pixabayApi from '../../services/pixabayApi';

export const useSearch = search => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  const searchRef = useRef(search);
  const pageRef = useRef(page);

  const addIdToCollection = images => {
    return images.map(it => ({ ...it, frontId: nanoid(10) }));
  };

  useEffect(() => {
    if (search === ' ') return;

    if (searchRef.current === search && pageRef.current === page) {
      return;
    }

    if (searchRef.current !== search) {
      setPage(1);
      setLoadMoreClicked(false);
      window.scroll(0, 0);
      setImages([]);
    }

    if (!loadMoreClicked && !error) {
      toast.success('All found images');
    }

    setIsLoading(true);

    pixabayApi
      .getSearchImages({ value: search, page })
      .then(({ hits, totalHits }) => {
        const uniqueHits = addIdToCollection(hits);

        setImages(p =>
          searchRef.current === search ? [...p, ...uniqueHits] : uniqueHits
        );
        setTotalHits(totalHits);
        searchRef.current = search;
      })
      .catch(e => {
        toast.error(`Incorrect entry!`);
        setError(e.message);
        setImages([]);
      })
      .finally(() => setIsLoading(false));
    return () => {};
  }, [search, page, error, loadMoreClicked]);

  return {
    images,
    page,
    setPage,
    totalHits,
    error,
    setError,
    isLoading,
    setLoadMoreClicked,
  };
};
