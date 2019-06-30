import React, { Component } from 'react';
import './style.css';

export default class Options extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      test: 'hi'
    };
  }
  render() {
    let options = this.props.options;
    let div = options.map(option => (
      <label className="optionLabel" key={option.value}>
        <input type="radio" name="radio-button-group" {...option} onClick={this.handleChange} />
        <img src={option.url} />
        <br />
        {option.value}
      </label>
    ));

    return (<div>{div}</div>);
  }

  handleChange = (event) => {
    if (this.props.type == "user") {
      this.handleUserChange(event);
    }
    if (this.props.type == "creator") {
      this.handleCreatorChange(event);
    }
  }

  handleUserChange(e) {
    var className = "";
    if (this.props.value === e.target.value) {
      className = "right";
      e.result = true;
    } else {
      className = "wrong";
      e.result = false;
    }
    e.img = e.target.nextElementSibling;
    e.img.classList.add(className);

    setTimeout((e) => {
      e.img.classList.remove(className);
      this.props.onChange(e);
    }, 500, e)
  }

  handleCreatorChange(event) {
    this.props.onChange(event);
  }

}

