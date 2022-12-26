import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalleryItem, ItemImage } from './ImageCleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setshowModal] = useState(false);

  const toggleModal = () => {
    setshowModal(!showModal);
  };

  return (
    <>
      <GalleryItem>
        <ItemImage
          src={webformatURL}
          alt={webformatURL}
          onClick={toggleModal}
          aria-label="Open image"
        />
      </GalleryItem>
      {showModal && <Modal onClose={toggleModal} url={largeImageURL} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
