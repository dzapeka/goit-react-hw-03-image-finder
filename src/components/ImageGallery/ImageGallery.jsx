import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  render() {
    const { images, openModal } = this.props;
    return (
      <>
        {images.length > 0 && (
          <ul className={styles.ImageGallery}>
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
