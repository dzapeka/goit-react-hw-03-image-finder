import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, largeImageURL, openModal } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          heigth={260}
          loading={'lazy'}
          onClick={() => openModal({ largeImageURL, tags })}
        />
      </li>
    );
  }
}
