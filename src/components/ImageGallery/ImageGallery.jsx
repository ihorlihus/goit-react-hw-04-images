import ImageGalleryItem from '../ImageGalleryItem';
import { useState } from 'react';
import Modal from '../Modal';
import PropTypes from 'prop-types';

const ImageGallery = ({ images } = this.props.images) => {
  const [showModal, setShowModal] = useState(false);
  const [imageModal, setImageModal] = useState(null);

  const toggleModal = imageMod => {
    setShowModal(state => !state);
    setImageModal(imageMod);
  };

  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <li className="ImageGalleryItem" key={image.id}>
          <ImageGalleryItem image={image} onSelect={toggleModal} />
        </li>
      ))}
      {showModal && (
        <Modal onClose={toggleModal} imageModal={imageModal}></Modal>
      )}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
