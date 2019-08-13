import React, { Component } from 'react';
import Page from './Page'
import * as Constant from '../constants'
import EnterName from './EnterName'
import Wait from './Wait'
import Result from './Result'

export default class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      playerName: null,
      questions: [],
      page: 'wait'
    };
  }

  render() {
    return <div>
      {this.getPage(this.state.page)}
    </div>;
  }

  getName(e) {
    this.setState({ playerName: e.name, page: 'quiz' });
  }

  getPage(page) {
    switch (page) {
      case 'quiz': return (<div>How well do you know about <strong>{this.state.name}?</strong>
        <Page questions={this.state.questions} type="user" updateState={this.updateState} ></Page>
      </div>);
      case 'start': return (<div><strong>{this.state.name} </strong>has challenged you for a frienship Quiz. <br />
        <strong>Enter your name and answer a quiz about {this.state.name}</strong>
        <EnterName buttonText="Continue ->" clickAction={this.getName.bind(this)}></EnterName>
        <Result responses={this.state.responses} showCreate={false}></Result>
      </div>);
      case 'end': return (<div><button className="btn btn-primary carrot createYourOwn" 
      onClick={this.redirect.bind(this)}><span role='img' aria-label='img'>&#128073;</span> 
      Create your own quiz <span role='img' aria-label='img'>&#128072;</span></button>
        <br />
        Who knows <strong>{this.state.name}</strong> best?<Result responses={this.state.responses} history={this.props.history}></Result></div>);
      default: return <Wait></Wait>;
    }
  }

  redirect() {
    this.props.history.push('/')
  }

  componentDidMount() {
    fetch(Constant.HOST + '/player/response/get?id=' + this.props.match.params.id)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        var alreadyCompleted = sessionStorage.getItem(this.props.match.params.id);
        var page = 'start';
        if (alreadyCompleted === 'true') {
          page = 'end';
        }
        this.setState({
          questions: data.quiz.map(q => {
            q.question = q.question.replace('you', data.name)
            q.question = q.question.replace('do', 'does')
            return q;
          }), name: data.name, page: page, responses: data.responses
        });
        return data.quiz;
      }).then(quiz => Constant.loadImages(quiz))
      .catch(console.log)
    console.log(this.state.questions);
  }

  updateState = (e) => {
    console.log(e)
    let page = e.page;

    switch (page) {
      case 'end':
        this.setState({ page: 'wait' });
        Constant.updateServer(Constant.HOST + '/player/result/update', 'POST', { name: this.state.playerName, id: this.props.match.params.id, score: e.score })
          .then(resp => {
            console.log(resp);
            return resp.json();
          })
          .then((response) => {
            console.log(response);
            this.setState({ page: 'end', responses: response })
            sessionStorage.setItem(this.props.match.params.id, 'true');
          });
        ; break;
      default: throw new Error();
    }
  };
}
