import React, { Component } from 'react';
import Page from './Page'

export default class CreatorPage extends Component {



  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      selectedQuestions: []
    };
  }

  updateState = (e) => {
    console.log(this.state.selectedQuestions);
    e.selectedQuestions = this.state.selectedQuestions;
    this.props.updateState(e);
  }
  render() {
    return (
      <div>{this.props.name}
        <Page questions={this.props.questions} selectedQuestions={this.state.selectedQuestions} updateState={this.updateState} type="creator"></Page>
      </div>);
  }
}