import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

import CreatorPage from './component/CreatorPage'
import StartPage from './component/StartPage'
import SharePage from './component/SharePage'
import * as Constant from './constants'
import Wait from './component/Wait'


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      questions: [],
      page: 'start'
    };
  }


  componentDidMount() {
    fetch(Constant.HOST + '/getquestions')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ questions: data.quiz });
        Constant.loadImages(data.quiz);
      })
      .catch(console.log)
  }

  updateState = (e) => {
    console.log(e)
    let page = e.page;

    switch (page) {
      case 'start': this.setState({ page: "quiz", name: e.name }); break;
      case 'end':
        this.setState({ page: "wait", name: e.name })
        Constant.updateServer(Constant.HOST + '/player/response/add', 'POST', { name: this.state.name, quiz: e.selectedQuestions })
          .then(resp => {
            console.log(resp);
            return resp.json();
          })
          .then((response) => {
            this.setState({ quizId: response.id, page: "end" });
            console.log(response.id);
          });
        ; break;
      default: throw new Error();
    }
  };



  getPage(page) {
    switch (page) {
      case 'start': return <StartPage name={this.state.name} updateState={this.updateState} message="Enter your name and share your quiz with your friends"></StartPage>;
      case 'quiz': return <CreatorPage name={this.state.name} updateState={this.updateState} questions={this.state.questions}></CreatorPage>;
      case 'end': return <SharePage domain={Constant.APP_HOST + "/quiz/"} quizId={this.state.quizId} name={this.state.name} updateState={this.updateState} ></SharePage >;
      case 'wait': return <Wait></Wait>
      default: throw new Error();
    }
  }

  render() {
    return this.getPage(this.state.page)
  }



}
