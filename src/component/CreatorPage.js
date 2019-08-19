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
    e.selectedQuestions = this.state.selectedQuestions;
    this.props.updateState(e);
  }
  render() {
    return (
            <div>Welcome <strong>{this.props.name} </strong>&#128075;
        <Page questions={this.props.questions} selectedQuestions={this.state.selectedQuestions} updateState={this.updateState} type="creator"></Page>
      </div>);
  }
}