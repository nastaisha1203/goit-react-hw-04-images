import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchImage } from '../../services/api';
import { Layout } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

export const App = () => {
  const [page, setPage] = useState(1);
  const [searchImage, setSearchImage] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchImage === '') {
      return;
    }
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const { totalHits, hits } = await fetchImage(searchImage, page);
        const normalizedImages = hits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })
        );
        if (!totalHits) {
          return toast.error(
            'Search result not successful. Enter the correct image name'
          );
        }
        setImages(prevImages => [...prevImages, ...normalizedImages]);
        setTotalHits(totalHits);
      } catch {
        toast.error('Something went wrong. Try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAPI();
  }, [page, searchImage]);

  const handleSubmit = searchImage => {
    setImages([]);
    setPage(1);
    setSearchImage(searchImage);
  };
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const totalPages = Math.ceil(totalHits / 12);
  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <p>{error}</p>}
      <ToastContainer position="top-left" />
      {images.length > 0 && <ImageGallery items={images} />}
      {images.length > 0 && totalPages > page && <Button onClick={loadMore} />}
    </Layout>
  );
};
