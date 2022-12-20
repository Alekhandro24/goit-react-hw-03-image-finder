import PropTypes from 'prop-types';
import {
  GalleryItem,
  GalleryImage,
} from 'components/ImageGalleryItem/ImageGalleryItem.styled';

const ImageGalleryItem = ({ img, onClick }) => {
  const { webformatURL, largeImageURL, tags } = img;

  const handleClick = () => onClick(largeImageURL);

  return (
    <GalleryItem>
      <GalleryImage
        onClick={handleClick}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

