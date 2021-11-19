import React, { Component } from 'react';
import DefaultButton from 'react-bootstrap/Button';
import './button.css';

class Button extends Component {
    render() {
        return (
            <DefaultButton block style={{ background: `url(${this.props.imgPath})` }} variant="outline-primary"
                className={`text-white ${this.props.classes}`} id={this.props.id} onClick={this.props.onBtnClick}>{this.props.value}</DefaultButton>
        );
    }
}

export default Button;