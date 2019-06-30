import React, { Component } from 'react';
import Question from './Question';
import './pagestyle.css';
export default class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 1,
      selectedIndex: 1,
      correctAnswer: 0
    };
  }

  count = 5;

  render() {
    let label = [];

    for (let i = 1; i <= this.count; i++) {
      label.push(<label className={i === this.state.currentQuestion ? 'highNumberLabel' : 'numberLabel'} key={i} >{i}</label>);
    }
    let currentQ = this.getQuestion();
    let questionHTML;
    if (currentQ) {
      console.log('answer for' + this.state.currentQuestion + currentQ.answer);
      questionHTML = <Question type={this.props.type} answer={currentQ.answer} question={currentQ.question} options={currentQ.options} handleChange={(event) => this.handleChange(event)}></Question>;
    }
    return (
      <div>
        {label}
        <br />
        <button type="button" className="btn btn-primary" onClick={() => { this.incrementSkippedQuestion() }}>Skip this question </button>
        {questionHTML}
      </div>);
  }

  getQuestion() {
    return this.props.questions[this.state.selectedIndex - 1];
  }

  handleChange(event) {
    if (this.props.type == "user") {
      this.handleUserChange(event);
    }
    if (this.props.type == "creator") {
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
      this.setState({ currentQuestion: ++this.state.currentQuestion });
    }
    else {
      this.props.updateState({ page: 'end' });
    }
  }


  incrementSkippedQuestion() {
    if (this.props.questions.length > this.state.selectedIndex)
      this.setState({ selectedIndex: ++this.state.selectedIndex });
    else {
      this.setState({ selectedIndex: 1 });
    }
  }

  calculateUserResult(event) {
    if (event.result) {
      this.setState({ correctAnswer: ++this.state.correctAnswer });
    }
  }
}

