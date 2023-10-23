import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from 'js/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const loadingErrorMsg = 'Oops! Something went wrong! Try reloading the page!';
const imagesNotFoundMsg =
  'Sorry, there are no images matching your search query. Please try again.';
const endOfResultsMsg =
  "We're sorry, but you've reached the end of search results.";

const perPage = 12;

export default class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchQuery: '',
    currentPage: 1,
    loadMore: false,
    isOpenModal: false,
    modalData: null,
  };

  onSearchHandler = async searchQuery => {
    this.setState({ isLoading: true });
    try {
      const searchResults = await fetchImages(
        searchQuery,
        this.state.currentPage,
        perPage
      );

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

  openModal = imageData => {
    this.setState({
      isOpenModal: true,
      modalData: imageData,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const { images, isLoading, loadMore } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.onSearchHandler} />
        {images.length > 0 && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}
        {loadMore && !isLoading && (
          <Button name="Load more" onClickHandler={this.loadMoreHandler} />
        )}
        {isLoading && <Loader />}
        {this.state.isOpenModal && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
