import React, { Component } from 'react'
import Header from './header';
import Gallery from './gallery';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      numberItem: 5,
      images: [],
      isUpdate: false
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleOnScroll)
    const images = localStorage.getItem('images');
    if (images) {
      this.setState({ images: JSON.parse(images).splice(0, this.state.numberItem) });
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  componentDidUpdate() {
    if (this.state.isUpdate) {
      const images = localStorage.getItem('images');
      this.setState({ images: JSON.parse(images).splice(0, this.state.numberItem), isUpdate: false });
    }
  }

  handleUpdate = () => {
    this.setState({ isUpdate: true });
  }

  handleOnScroll = () => {
    const isScrollToBottom = document.body.scrollTop || document.documentElement.scrollTop + window.innerHeight === document.body.scrollHeight;
    if (isScrollToBottom) {
      if (this.state.isLoading) return;
      this.setState({ isLoading: true });
      this.handleLoadImages(() => {
        this.setState({ isLoading: false });
      })
    }
  }

  handleLoadImages = () => {
    const images = localStorage.getItem('images');
    if (images) {
      this.setState({ numberItem: this.state.numberItem + 5 }, () => {
        this.setState({ images: JSON.parse(images).splice(0, this.state.numberItem) });
      });
    }
  }

  render() {
    return (
      <div style={{padding: "0 20%", display: 'flex', flexDirection: "column", alignItems: 'center'}}>
        <h1>PHOTO GALLERY</h1>
        <Header handleUpdate={this.handleUpdate} />
        <Gallery images={this.state.images} />
      </div>
    )
  }
}
