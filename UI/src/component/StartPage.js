import React, { Component } from 'react';
import './style/startPage.css'
import EnterName from './EnterName'

export default class StartPage extends Component {

  constructor(props) {
    super(props);
    var name = localStorage.getItem("name");
    this.state = {
      name: name,
    };
  }

  updateState = (e) => {
    e.page = 'start';
    this.props.updateState(e);
  }

  render() {
    return (
      <div>
        <h3><strong>&#128075; 2019 Friendship Dare!!!</strong></h3>
        {this.props.message}
        <br />
        <EnterName buttonText="&#9996; Start &#9996;" clickAction={this.updateState.bind(this)}></EnterName>
      </div>)
  }

}
