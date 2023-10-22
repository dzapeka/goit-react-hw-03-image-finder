import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import fetchImages from 'js/pixabay-api';
import { Button } from './Button';
import Loader from './Loader';

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchQuery: '',
    currentPage: 1,
    currentHits: 0,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const response = await fetchImages('cats');
      this.setState({ images: response.hits, isLoading: false });
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  onSearchHandler(searchQuery) {
    console.log(searchQuery);
  }

  render() {
    const { images, isLoading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchHandler} />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ImageGallery images={images} />
            {images.length > 0 && (
              <Button
                name="Load more"
                onClickHandler={() => console.log('load more...')}
              />
            )}
          </>
        )}
      </div>
    );
  }
}
