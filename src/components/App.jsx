import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from 'components/Loader';
import Button from './Button';
import getData from '../API';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import '../styles.css';

export class App extends Component {
  state = {
    searchName: '',
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    const prevName = prevState.searchName;
    const currentName = this.state.searchName;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (currentName !== prevName || currentPage !== prevPage) {
      try {
        this.setState({ status: 'pending' });
        const res = await getData(currentName, currentPage);
        if (res.total === 0) {
          toast.error(`Нет картинки с именем ${currentName}, введите другое`);
          this.setState({ status: 'idle' });
          return;
        }
        this.setState({ status: 'resolved' });
        this.setState(prevState => ({
          images: [...prevState.images, ...res.hits],
        }));
        return;
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName, images: [], page: 1 });
  };

  render() {
    const { status, images, error } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'reject' && <h1>{error.message}</h1>}
        {images.length > 0 && status !== 'reject' && (
          <ImageGallery images={images} />
        )}
        {status === 'pending' && <Loader />}
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        {images.length !== 0 && status === 'resolved' && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
