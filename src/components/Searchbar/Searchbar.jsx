import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleChangeSearchName = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      toast.error('Введите запрос');
      return;
    }
    this.props.onSubmit(this.state.searchName, this.state.page);
    this.setState({ searchName: '', page: 1 });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button className="SearchForm-button" type="submit">
            <AiOutlineSearch className="SearchForm-button-icon" />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchName}
            onChange={this.handleChangeSearchName}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
