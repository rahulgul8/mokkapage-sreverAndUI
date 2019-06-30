import React, { Component } from 'react';
import './startPage.css'

export default class StartPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  }

  updateState = (e) => {
    if (this.state.name) {
      e.name = this.state.name;
      e.page = 'start';
      this.props.updateState(e);
    } else {
      this.setState({ error: 'Please enter your name' });
    }
  }

  render() {
    return (
      <div>
        <h6><strong>2019 Friendship Dare!!!</strong></h6>
        <br />
        Enter your name and share your quiz with your friends
        <br />
        <span className="error">{this.state.error}</span>
        <input type="text" value={this.state.name} onChange={this.handleChange} className="form-control text" placeholder="Enter your name" aria-label="Username" aria-describedby="basic-addon1" />
        <button className="btn btn-primary" onClick={this.updateState}>Create quick quiz-></button>
      </div>)
  }

}