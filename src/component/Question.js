import React, { Component } from 'react';

import Options from './Options';

class Question extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRadio: null,
    };
    console.log('question console called');
  }

  handleChange = (event) => {
    if (this.props.type == "user") {
      this.handleUserChange(event);
    }
    if (this.props.type == "creator") {
      this.handleCreatorChange(event);
    }
  }

  handleUserChange(event) {
    this.props.handleChange(event);
  }

  handleCreatorChange(event) {
    debugger
    event.answer = event.target.value;
    this.props.handleChange(event);
  }


  render() {
    const items = [];
    return (
      <form>
        <div>
          <div>{this.props.question}</div>
          <Options type={this.props.type}
            value={this.props.answer}
            onChange={this.handleChange}
            options={this.props.options}
          />
        </div>
      </form>
    )
  }

}

export default Question;