import React, { Component } from 'react';
import Page from './Page'

export default class UserPage extends Component {

  render() {
    return <Page questions={this.props.questions} type="user" updateState={this.props.updateState} ></Page>
  }
}