import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem';

export default class ImageGallery extends Component {
  render() {
    const { images } = this.props;
    return (
      <>
        {images.length > 0 && (
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem key={id} src={webformatURL} alt={tags} />
            ))}
          </ul>
        )}
      </>
    );
  }
}
