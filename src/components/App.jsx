import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import fetchImages from 'js/pixabay-api';
import { Button } from './Button';
import Loader from './Loader';

const loadingErrorMsg = 'Oops! Something went wrong! Try reloading the page!';
const imagesNotFoundMsg =
  'Sorry, there are no images matching your search query. Please try again.';
const endOfResultsMsg =
  "We're sorry, but you've reached the end of search results.";

const perPage = 12;

// bats cats
// fly cats
// fly castle

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchQuery: '',
    currentPage: 1,
    loadMore: false,
  };

  onSearchHandler = async searchQuery => {
    this.setState({ isLoading: true });
    try {
      const searchResults = await fetchImages(
        searchQuery,
        this.state.currentPage,
        perPage
      );
      console.log('searchResults', searchResults);
      if (searchResults.total === 0) {
        Notify.failure(imagesNotFoundMsg);
      } else {
        Notify.success(`Hooray! We found ${searchResults.totalHits} images.`);
        this.setState({
          images: searchResults.hits,
          currentPage: 1,
          loadMore: searchResults.totalHits > perPage,
        });
      }
    } catch (error) {
      Notify.failure(loadingErrorMsg);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreHandler = async () => {
    this.setState({ isLoading: true });
    try {
      const page = this.state.currentPage + 1;
      const searchResults = await fetchImages(
        this.state.searchQuery,
        page,
        perPage
      );
      console.log('Load more - searchResults', searchResults);
      console.log('currentPage', this.state.currentPage);
      this.setState(prevState => ({
        images: [...prevState.images, ...searchResults.hits],
        currentPage: prevState.currentPage + 1,
        loadMore:
          this.state.currentPage < Math.ceil(searchResults.totalHits / 12),
      }));
    } catch (error) {
      Notify.failure(loadingErrorMsg);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, loadMore } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchHandler} />
        {images.length > 0 && <ImageGallery images={images} />}
        {loadMore && !isLoading && (
          <Button name="Load more" onClickHandler={this.loadMoreHandler} />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
