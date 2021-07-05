import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      link: '',
      loading: true,
    };

    this.fetchDogImages = this.fetchDogImages.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
    console.log('Estou no constructor');
  }

  componentDidMount() {
    console.log('montou');
    this.fetchDogImages();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.link.includes('terrier')) {
      return false;
    }
    return true;
  }

  async fetchDogImages() {
    this.setState(
      { loading: true },
      async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        const result = await response.json();
        this.setState({
          loading: false,
          link: result.message,
        });
      },
    );
  }

  renderPhoto() {
    const { link } = this.state;
    return (
      <img src={ link } alt="" />
    );
  }

  render() {
    const loadingElement = <span>Loading...</span>;
    const { renderPhoto, fetchDogImages } = this;
    const { loading } = this.state;

    console.log('renderizou');
    return (
      <div>
        <button type="button" onClick={ () => fetchDogImages() }> New Dog </button>
        <div>
          { loading ? loadingElement : renderPhoto() }
        </div>
      </div>
    );
  }
}

export default App;
