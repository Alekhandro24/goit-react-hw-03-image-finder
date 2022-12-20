import PropTypes from 'prop-types';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(item => (
        <ImageGalleryItem key={item.id} img={item} onClick={onClick} />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
