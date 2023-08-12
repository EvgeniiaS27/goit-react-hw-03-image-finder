import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getImages } from '../../services/getImages';

export class ImageGallery extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
    isOpenModal: false,
    activeImage: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const page = this.state.page;

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true, images: [], error: null });

      getImages(nextQuery, page)
        .then(res => {
          // console.log(res);
          if (res.status !== 200) {
            return Promise.reject(new Error(`Oops, something went wrong...`));
          } else return res.json();
        })
        .then(images => {
          if (images.hits.length !== 0) {
            return this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
            }));
          } else
            return Promise.reject(
              new Error(
                `OSorry, there are no images matching your search query. Please try again`
              )
            );
        })

        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }

    if (prevState.page !== page) {
      this.setState({ loading: true, error: null });

      getImages(nextQuery, page)
        .then(res => {
          if (res.status !== 200) {
            return Promise.reject(
              new Error(
                `Sorry, there are no images matching your search query. Please try again`
              )
            );
          } else return res.json();
        })
        .then(images => {
          if (images.hits.length !== 0) {
            return this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
            }));
          } else
            return Promise.reject(new Error(`Oops, something went wrong...`));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleButtonClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = activeImage => {
    this.setState({ activeImage, isOpenModal: true });
  };

  handelImageMogalClose = () => {
    this.setState({ activeImage: '', isOpenModal: false });
  };

  render() {
    const { error, loading, images, isOpenModal, activeImage } = this.state;
    return (
      <>
        {error && <h1>{error.massege}</h1>}
        {loading && <Loader />}
        {isOpenModal && (
          <Modal
            image={activeImage}
            onCloseModal={this.handelImageMogalClose}
          />
        )}

        <ul className={css.imageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                img={webformatURL}
                alt={tags}
                onClick={this.handleImageClick}
                bigImg={largeImageURL}
              />
            );
          })}
        </ul>
        {images.length !== 0 && (
          <Button onClick={this.handleButtonClick}>Load More</Button>
        )}
      </>
    );
  }
}
