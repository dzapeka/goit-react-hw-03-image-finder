import { Component } from 'react';
import styles from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, largeImageURL, openModal } = this.props;
    return (
      <li className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItemImage}
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
