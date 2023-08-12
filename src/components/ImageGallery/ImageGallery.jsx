import { Component } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { getImages } from '../../services/getImages';

export class ImageGallery extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    page: 1,
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
          console.log(images);
          if (images.hits.length !== 0) {
            return this.setState(prevState => ({
              images: [...prevState.images, images.hits],
            }));
          } else
            return Promise.reject(new Error(`Oops, something went wrong...`));
        })

        // getImages(nextQuery, page)
        //   .then(images => this.setState({ images: images.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleButtonClick = () => {
    const { page } = this.state.page;

    this.setState(prevState => ({
      page: prevState[page] + 1,
    }));
  };

  render() {
    const { error, loading, images } = this.state;
    return (
      <>
        {error && <h1>{error.massege}</h1>}
        {loading && <Loader />}
        <ul className={css.imageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => {
            return <ImageGalleryItem key={id} img={webformatURL} alt={tags} />;
          })}
        </ul>
        {images.length !== 0 && (
          <Button onClick={this.handleButtonClick}>Load More</Button>
        )}
      </>
    );
  }
}
