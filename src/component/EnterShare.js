import React, { Component } from 'react';
import './style.css';

class EnterShare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      domain: '',
      url: this.props.domain,
    };
  }

  handleChange(event, key) {
    let encoded = encodeURI(event.target.value);
    let url = this.props.domain + encoded;
    this.setState({ [key]: url });
  }


  render() {
    return <div className="container">
      <input className="input" type="text" placeholder="Enter your name" onChange={event => this.handleChange(event, 'url')}></input>
      <br />
      <div className="share" type="text" placeholder="Enter your name">{this.state.url}</div>
    </div>;
  }
}

export default EnterShare;