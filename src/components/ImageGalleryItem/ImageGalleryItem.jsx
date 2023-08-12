import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ img, alt, id }) => {
  return (
    <li key={id} className={css.imageGalleryItem}>
      <img src={img} alt={alt} width={320} />
    </li>
  );
};
