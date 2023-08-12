import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ img, alt, onClick, bigImg }) => {
  const handelClick = () => {
    onClick(bigImg);
  };
  return (
    <li className={css.imageGalleryItem} onClick={handelClick}>
      <img
        className={css.imageGalleryItemImage}
        src={img}
        alt={alt}
        width={320}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
