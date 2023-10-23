import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
    return (
      <>
        {images.length > 0 && (
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                openModal={openModal}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}
