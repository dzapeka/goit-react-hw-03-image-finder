import { Component } from 'react';
import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            name="searchQuery"
            value={searchQuery}
            onChange={this.handleChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
