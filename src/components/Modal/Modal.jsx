import React, { Component } from 'react';
import styles from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'auto';
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOverayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalData;

    return (
      <div className={styles.Overlay} onClick={this.handleOverayClick}>
        <div className={styles.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}
