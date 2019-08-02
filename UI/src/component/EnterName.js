import React, { Component } from 'react';


export default class EnterName extends Component {

    constructor() {
        super();
        this.state = {
            error: '',
            name: ''
        };
    }

    updateState = (e) => {
        if (this.state.name) {
            e.name = this.state.name;
            this.props.clickAction(e);
        } else {
            this.setState({ error: 'Please enter your name' });
        }
    }

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    }

    render() {
        return <div><span className="error">{this.state.error}</span>
            <input type="text" value={this.state.name} onChange={this.handleChange} className="form-control text" placeholder="Enter your name" aria-label="Username" aria-describedby="basic-addon1" />
            <button className="btn btn-primary" onClick={this.updateState}>{this.props.buttonText}</button></div>;
    }
}
