import { useState } from 'react';
import Modal from '../Modal';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  // const [modalImage, setModalImage] = useState(null);
  // const [modalAlt, setModalAlt] = useState(null);

  // handleImageShow = (modalImage, modalAlt) => {
  //   this.setState({ modalImage, modalAlt });
  // };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  return images.map(image => (
    <li className="ImageGalleryItem" key={image.id}>
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.tags}
        width="240"
        onClick={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </Modal>
      )}
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGalleryItem;
