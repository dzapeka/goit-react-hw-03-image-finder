import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from 'js/pixabay-api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const successMessage = totalHits => `Hooray! We found ${totalHits} images.`;
const errorMessage = 'Oops! Something went wrong! Try reloading the page!';
const noImagesMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const endOfResultsMessage =
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

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, currentPage, images } = this.state;
    const searchQueryChanged = prevState.searchQuery !== searchQuery;
    const currentPageChanged = prevState.currentPage !== currentPage;
    // Checking if it is a new search with the same searchQuery
    const imagesClearedAndNewSearch =
      prevState.images !== images && images.length === 0;

    if (searchQueryChanged || currentPageChanged || imagesClearedAndNewSearch) {
      this.setState({ isLoading: true });
      fetchImages(searchQuery, currentPage, perPage)
        .then(searchResults => {
          if (searchResults.total === 0) {
            Notify.failure(noImagesMessage);
          } else {
            if (currentPage === 1) {
              Notify.success(successMessage(searchResults.totalHits));
            }

            const loadMore =
              currentPage < Math.ceil(searchResults.totalHits / perPage);

            if (!loadMore) {
              Notify.info(endOfResultsMessage);
            }

            this.setState(prevState => ({
              images: [...prevState.images, ...searchResults.hits],
              loadMore,
            }));
          }
        })
        .catch(error => {
          Notify.failure(errorMessage);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  onSearchHandler = async searchQuery => {
    this.setState({ searchQuery, images: [], currentPage: 1 });
  };

  loadMoreHandler = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
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
    const { images, isLoading, loadMore, isOpenModal, modalData } = this.state;

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
        {isOpenModal && (
          <Modal closeModal={this.closeModal} modalData={modalData} />
        )}
      </div>
    );
  }
}
