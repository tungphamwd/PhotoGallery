import React, { Component } from 'react'
import './image.css'

export default class Image extends Component {
    render() {
        const img = this.props.image;
        return (
            <div className="imgcard">
                <img src={img.path} />
                {img.name && <div style={{ padding: 10 }}>
                    <p>{img.name}</p>
                </div>
                }
                {img.description && <div className="description">
                    <div>{img.description}</div>
                </div>
                }
            </div>
        )
    }
}
