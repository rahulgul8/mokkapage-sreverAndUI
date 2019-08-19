import React, { Component } from 'react';
import './style/style.css';

export default class Options extends Component {

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
        <img id={option.value === this.props.value ? 'answer' : undefined} className="options" src={option.url} alt={"option " + option.value} width="200" height="200" />
        <br />
        <strong>{option.value}</strong>
      </label>
    ));

    return (<div>{div}</div>);
  }

  handleChange = (event) => {
    if (this.props.type === "user") {
      this.handleUserChange(event);
    }
    if (this.props.type === "creator") {
      this.handleCreatorChange(event);
    }
  }

  handleUserChange(e) {
    var className = "";
    var answer = document.getElementById('answer');
    if (this.props.value === e.target.value) {
      className = "right";
      e.result = true;
    } else {
      className = "wrong";
      e.result = false;
    }
    if(!e.result){
      answer.classList.add('right');
    }
    e.img = e.target.nextElementSibling;
    e.img.classList.add(className);

    setTimeout((e) => {
      e.img.classList.remove(className);
      answer.classList.remove('right');
      this.props.onChange(e);
    }, 800, e)
  }

  handleCreatorChange(event) {
    this.props.onChange(event);
  }

}

