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
        {this.props.message}
        <br />
        <EnterName buttonText="Create quick Quiz -> " clickAction={this.updateState.bind(this)}></EnterName>
      </div>)
  }

}
