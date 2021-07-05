import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('Estou no constructor');

    this.state = {
      link: '',
      name: '',
      dogsList: [],
      loading: true,
    };

    this.fetchDogImages = this.fetchDogImages.bind(this);
    this.renderPhoto = this.renderPhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.newDog = this.newDog(this);
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

  componentDidUpdate() {
    console.log('atualizou');
    const { link, dogsList } = this.state;
    localStorage.setItem('link', link);
    localStorage.setItem('dogsList', dogsList);
    // const dog = link.split('/')[4];
    // alert(`Raça: ${dog}`); // o alerta dispara toda vez que digita uma letra
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleSubmit(event) {
    const { name } = this.state;
    alert(`O nome dado foi ${name}`);
    event.preventDefault();
  }

  newDog(dogsList) {
    this.setState((prevState) => ({
      ...prevState,
      dogsList: [...prevState.dogsList, dogsList],
    }));
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
    console.log('renderizou');
    console.log('-----------------');
    const loadingElement = <span>Loading...</span>;
    const { renderPhoto, fetchDogImages, handleChange, handleSubmit } = this;
    const { loading, name } = this.state;

    return (
      <div>
        <button type="button" onClick={ () => fetchDogImages() }> New Dog </button>
        <form onSubmit={ handleSubmit }>
          <label htmlFor="dog-name">
            Nome do seu dog =&gt;
            <input
              id="dog-name"
              type="text"
              value={ name }
              placeholder="Dê um nome a este dog!"
              onChange={ handleChange }
            />
          </label>
          <input type="submit" value="enviar" />
        </form>
        <div>
          { loading ? loadingElement : renderPhoto() }
        </div>
      </div>
    );
  }
}

export default App;
