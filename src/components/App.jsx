import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from 'js/pixabay-api';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import Loader from './Loader';

const loadingErrorMsg = 'Oops! Something went wrong! Try reloading the page!';
const imagesNotFoundMsg =
  'Sorry, there are no images matching your search query. Please try again.';
const endOfResultsMsg =
  "We're sorry, but you've reached the end of search results.";

const perPage = 12;

// bats cats -- 8 images
// fly cats - 11 image
// fly castle - 28 images

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
          searchQuery,
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
      const { searchQuery, currentPage } = this.state;
      const nextPage = currentPage + 1;
      const searchResults = await fetchImages(searchQuery, nextPage, perPage);
      const loadMore = nextPage < Math.ceil(searchResults.totalHits / 12);

      if (!loadMore) {
        Notify.info(endOfResultsMsg);
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...searchResults.hits],
        currentPage: nextPage,
        loadMore,
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
