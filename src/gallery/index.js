import React, { Component } from 'react'
import Image from '../image';
import './gallery.css';
export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="galleryBox">
                {this.props.images.map((img, idx) => {
                    return <Image key={idx} image={img} />
                })
                }
            </div>
        )
    }
}
