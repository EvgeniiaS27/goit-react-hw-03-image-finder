import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Component } from 'react';

export class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
