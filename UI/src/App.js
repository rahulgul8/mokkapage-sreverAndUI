import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

import CreatorPage from './component/CreatorPage'
import StartPage from './component/StartPage'
import SharePage from './component/SharePage'
import * as Constant from './constants'
import Wait from './component/Wait'
import Result from './component/Result';

export default class App extends Component {

  constructor() {
    super();
    var page = sessionStorage.getItem('quizId') ? 'end' : 'start';
    this.state = {
      name: '',
      questions: [],
      page: page,
      quizId: sessionStorage.getItem('quizId')
    };
  }


  componentDidMount() {
    if (!sessionStorage.getItem('quizId')) {
      fetch(Constant.HOST + '/getquestions')
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          Constant.shuffleArray(data.quiz);
          this.setState({ questions: data.quiz });
          Constant.loadImages(data.quiz);
        })
        .catch(console.log)
    }
  }

  updateState = (e) => {
    console.log(e)
    let page = e.page;

    switch (page) {
      case 'start':
        this.setState({ page: "quiz", name: e.name });
        sessionStorage.setItem('name', e.name);
        break;
      case 'end':
        this.setState({ page: "wait", name: e.name })
        Constant.updateServer(Constant.HOST + '/player/response/add', 'POST', { name: this.state.name, quiz: e.selectedQuestions })
          .then(resp => {
            console.log(resp);
            return resp.json();
          })
          .then((response) => {
            this.setState({ quizId: response.id, page: "end" });
            sessionStorage.setItem('quizId', response.id);
            console.log(response.id);
          });
        ; break;
      default: throw new Error();
    }
  };



  getPage(page) {
    switch (page) {
      case 'start': return <StartPage name={this.state.name} updateState={this.updateState} message="Enter your name to Start"></StartPage>;
      case 'quiz': return <CreatorPage name={this.state.name} updateState={this.updateState} questions={this.state.questions}></CreatorPage>;
      case 'end':
        var title = sessionStorage.getItem('name') + " has challenged you with a Friendship Dare. Try this challenge now!";
        return (<div>
          <SharePage domain={Constant.APP_HOST + "/quiz/"} quizId={this.state.quizId} name={this.state.name} updateState={this.updateState} title={title}></SharePage >
          <br />
          Who knows <strong>{sessionStorage.getItem('name')}</strong> best?
        <Result id={this.state.quizId}></Result>
        </div>);
      case 'wait': return <Wait></Wait>
      default: throw new Error();
    }
  }

  render() {
    return this.getPage(this.state.page)
  }



}
