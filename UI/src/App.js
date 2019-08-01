import React, { Component } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

import CreatorPage from './component/CreatorPage'
import StartPage from './component/StartPage'
import SharePage from './component/SharePage'
import UserPage from './component/UserPage'
import Result from './component/Result'
import Constant from './constants'


export default class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      questions: [],
      page: 'start'
    };
  }

  locahost = "http://localhost:5000/mokkapage/us-central1/app";
  host = "https://us-central1-mokkapage.cloudfunctions.net/app";

  componentDidMount() {
    var url = '/getquestions';
    if (this.props.param) {
      url = '/player/response/get?id=' + this.props.param;
      this.setState({ page: 'user' });
    }
    fetch(this.host + url)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        debugger;
        this.setState({ questions: data.quiz });
        this.loadImages(data.quiz);
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
      Constant.updateServer('/player/response/add', 'POST', { name: localStorage.getItem("name"), quiz: e.selectedQuestions })
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
      case 'start': return <StartPage name={this.state.name} updateState={this.updateState}></StartPage>;
      case 'quiz': return <CreatorPage name={this.state.name} updateState={this.updateState} questions={this.state.questions}></CreatorPage>;
      case 'end': return <SharePage domain={Constant.HOST + "http://oorga.co/fancywish?name="} quizId={this.getKey()} name={this.state.name} updateState={this.updateState} ></SharePage >;
      case 'user':
        return <UserPage questions={this.state.questions} updateState={this.updateState}></UserPage>;
      case 'result': return <Result></Result>;
      default: throw new Error();
    }
  }

  getKey() {
    return this.state.quizId;
  }

  render() {
    return <div className="jumbotron start">{this.getPage(this.state.page)}</div>;
  }



}
