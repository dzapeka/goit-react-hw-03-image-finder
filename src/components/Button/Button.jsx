import { Component } from 'react';
import styles from './Button.module.css';

export default class Button extends Component {
  render() {
    const { name, onClickHandler } = this.props;
    return (
      <button type="button" className={styles.Button} onClick={onClickHandler}>
        {name}
      </button>
    );
  }
}
