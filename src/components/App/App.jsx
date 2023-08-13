// import PropTypes from 'prop-types';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Component } from 'react';
import css from './App.module.css';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { getImages } from '../../services/getImages';

export class App extends Component {
  state = {
    query: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    isOpenModal: false,
    activeImage: '',
    lastPage: true,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    const page = this.state.page;

    if (prevQuery !== nextQuery || prevState.page !== page) {
      this.setState({ loading: true, error: null });

      getImages(nextQuery, page)
        .then(res => {
          if (res.status !== 200) {
            return Promise.reject(new Error(`Oops, something went wrong...`));
          } else return res.json();
        })
        .then(images => {
          if (images.hits.length !== 0) {
            return this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              lastPage: page < Math.ceil(images.totalHits / 12),
            }));
          } else
            return Promise.reject(
              new Error(
                `Sorry, there are no images matching your search query. Please try again`
              )
            );
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

  handleFormSubmit = query => {
    this.setState({
      query,
      images: [],
      loading: false,
      error: null,
      page: 1,
      isOpenModal: false,
      activeImage: '',
    });
  };

  render() {
    const { error, loading, images, isOpenModal, activeImage, lastPage } =
      this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <h1>{error.massege}</h1>}
        {isOpenModal && (
          <Modal
            image={activeImage}
            onCloseModal={this.handelImageMogalClose}
          />
        )}

        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {loading && <Loader />}

        {images.length !== 0 && lastPage && (
          <Button onClick={this.handleButtonClick}>Load More</Button>
        )}
      </div>
    );
  }
}
