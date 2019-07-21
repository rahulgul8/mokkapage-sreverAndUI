import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

import CreatorPage from './component/CreatorPage'
import StartPage from './component/StartPage'
import SharePage from './component/SharePage'
import UserPage from './component/UserPage'
import Result from './component/Result'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      questions: [],
      page: "result"
    };
  }

  locahost = "http://localhost:5001/mokkapage/us-central1/app";
  host = "https://us-central1-mokkapage.cloudfunctions.net/app";

  componentDidMount() {
    fetch(this.locahost + '/getquestions')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({ questions: data });
        this.loadImages(data);
      })
      .catch(console.log)
  }

  loadImages(questions) {
    questions.map((q) => {
      return q.options.map(o => o.url);
    }).reduce((a, b) => a.concat(b), []).forEach((q) => {
      console.log(q)
      new Image().src = q;
    }
    );
  }


  updateState = (e) => {
    console.log(e)
    let page = e.page;

    switch (page) {
      case 'quiz': break;
      case 'start': this.setState({ page: "quiz", name: e.name }); break;
      case 'end':
        this.setState({ page: "end" });
        console.log(e.selectedQuestions)
          ; break;
      default: throw new Error();
    }
  };

  getPage(page) {
    switch (page) {
      case 'start': return <StartPage name={this.state.name} updateState={this.updateState}></StartPage>;
      case 'quiz': return <CreatorPage name={this.state.name} updateState={this.updateState} questions={this.state.questions}></CreatorPage>;
      case 'end': return <SharePage domain="http://oorga.co/fancywish?name=" quizId={this.getKey()} name={this.state.name} updateState={this.updateState}></SharePage>;
      case 'user':
        var quustions = this.state.questions.map(q => {
          q.answer = 'text1';
          return q;
        });
        this.setState({ questions: quustions });
        return <UserPage questions={this.state.questions} updateState={this.updateState}></UserPage>;
      case 'result': return <Result></Result>;
      default: throw new Error();
    }
  }

  getKey() {
    return 123;
  }

  render() {
    return <div className="jumbotron start">{this.getPage(this.state.page)}</div>;
  }
}
