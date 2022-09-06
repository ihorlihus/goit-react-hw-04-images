import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';

const ImageGallery = ({ images } = this.props.images) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} />
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImageGallery;
