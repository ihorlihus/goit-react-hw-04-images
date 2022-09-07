import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image, onSelect }) => {
  return (
    <img
      className="ImageGalleryItem-image"
      src={image.webformatURL}
      alt={image.tags}
      width="240"
      onClick={() => {
        onSelect(image.largeImageURL);
      }}
    />
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
