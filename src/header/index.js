import React, { Component } from 'react';
import './header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
    }

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    handleImageUpload = (event) => {
        let reader = new FileReader();
        reader.onload = (event) => {
            this.setState({ path: event.target.result });     
        }
        reader.readAsDataURL(event.target.files[0]);
    }

    handleSaveImage = () => {
        const images = localStorage.getItem('images');
        if (images) {
            let arrImages = JSON.parse(images);
            arrImages.push(this.state);
            localStorage.setItem('images', JSON.stringify(arrImages));
        } else {
            let arr = [];
            arr.push(this.state);
            localStorage.setItem('images', JSON.stringify(arr));
        }
        this.props.handleUpdate();
        this.resetState();
    }

    resetState = () => {
        this.setState({
            name: '',
            description: '',
        });
        this.fileInput.value = "";
    }

    render() {
        return (
            <div className="headerbox">
                <div className="headeritem">
                    <label>Name:</label>
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                </div>
                <div className="headeritem">
                    <label>Description: </label>
                    <textarea value={this.state.description} name="description" onChange={this.handleChange} />
                </div>
                <input type="file" onChange={this.handleImageUpload} ref={ref => this.fileInput = ref} />
                <div style={{ alignSelf: "center" }}>
                    <button onClick={this.handleSaveImage}>Save</button>
                </div>
            </div>
        );
    }
}