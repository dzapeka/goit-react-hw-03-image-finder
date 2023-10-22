import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { src, alt } = this.props;
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={src}
          alt={alt}
          heigth={260}
          loading={'lazy'}
        />
      </li>
    );
  }
}
