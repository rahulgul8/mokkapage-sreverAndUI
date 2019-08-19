import React, { Component } from 'react';
import Question from './Question';
import './style/pagestyle.css';
import * as Constant from '../constants';
export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 1,
      selectedIndex: 1,
      correctAnswer: 0
    };
  }

  count = Constant.count;

  render() {
    let label = [];

    for (let i = 1; i <= this.count; i++) {
      label.push(<label className={(i === this.state.currentQuestion ? 'highNumberLabel' : 'numberLabel') + ' questionLabel'} key={i} >{i}</label>);
    }
    let currentQ = this.getQuestion();
    let questionHTML;
    if (currentQ) {
      questionHTML = <Question type={this.props.type} answer={currentQ.answer} question={currentQ.question} options={currentQ.options} handleChange={(event) => this.handleChange(event)}></Question>;
    }
    return (
      <div>
        {label}
        <br />
        {this.props.type === "creator" && <button type="button" className="skipButton btn btn-primary carrot" onClick={() => { this.incrementSkippedQuestion() }}>Skip this question </button>}
        <div className="questionAlign">{questionHTML}</div>
      </div>);
  }

  getQuestion() {
    return this.props.questions[this.state.selectedIndex - 1];
  }

  handleChange(event) {
    window.reloadAds();
    if (this.props.type === "user") {
      this.handleUserChange(event);
    }
    if (this.props.type === "creator") {
      this.handleCreatorChange(event);
    }
  }

  handleUserChange(event) {
    this.calculateUserResult(event);
    this.incrementQuestion();
    this.incrementSkippedQuestion();
  }

  handleCreatorChange(event) {
    this.updateSelectedQuestion(event);
    this.incrementQuestion();
  }

  updateSelectedQuestion(event) {
    let currentQ = this.getQuestion();
    var index = this.props.questions.indexOf(currentQ);
    this.props.questions.splice(index, 1);
    currentQ.answer = event.answer;
    this.props.selectedQuestions.push(currentQ);
  }

  incrementQuestion() {
    if (this.count > this.state.currentQuestion) {
      this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    }
    else {
      this.props.updateState({ page: 'end', score: this.state.correctAnswer });
    }
  }


  incrementSkippedQuestion() {
    if (this.props.questions.length > this.state.selectedIndex)
      this.setState({ selectedIndex: this.state.selectedIndex + 1 });
    else {
      this.setState({ selectedIndex: 1 });
    }
  }

  calculateUserResult(event) {
    if (event.result) {
      this.setState({ correctAnswer: this.state.correctAnswer + 1 });
    }
  }
}

