import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'components/Loader';
import Button from './Button';
import getData from '../API';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import '../styles.css';

export const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchImages() {
      try {
        setStatus('pending');
        const res = await getData(searchName, page);
        if (res.total === 0) {
          toast.error(`Нет картинки с именем ${searchName}, введите другое`);
          setStatus('idle');
          return;
        }
        setStatus('resolved');
        setImages(state => [...state, ...res.hits]);

        return;
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }
    if (searchName !== '') {
      fetchImages();
    }
  }, [searchName, page]);

  const handleLoadMore = () => {
    setPage(state => state + 1);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const handleFormSubmit = data => {
    setSearchName(data);
    setImages([]);
    setPage(1);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'reject' && <h1>{error.message}</h1>}
      {images.length > 0 && status !== 'reject' && (
        <ImageGallery images={images} />
      )}
      {status === 'pending' && <Loader />}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      {images.length !== 0 && status === 'resolved' && (
        <Button onClick={handleLoadMore} />
      )}
    </div>
  );
};
