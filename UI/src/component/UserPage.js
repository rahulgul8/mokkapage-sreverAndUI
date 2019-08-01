import React, { Component } from 'react';
import Page from './Page'
import * as Constant from '../constants'
export default class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      questions: []
    };
  }
  render() {
    return <Page questions={this.state.questions} type="user" updateState={this.updateState} ></Page>;
  }

  navigate() {
    this.props.history.push("/result/" + this.props.match.params.id, { response: 'response' })
  }

  componentDidMount() {
    fetch(Constant.HOST + '/player/response/get?id=' + this.props.match.params.id)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        debugger;
        this.setState({ questions: data.quiz, name: data.name });
        Constant.loadImages(data.quiz);
      })
      .catch(console.log)
  }

  updateState = (e) => {
    console.log(e)
    let page = e.page;

    switch (page) {
      case 'end':
        Constant.updateServer(Constant.HOST + '/player/result/update', 'POST', { name: localStorage.getItem("name"), id: this.props.match.params.id, score: e.score })
          .then(resp => {
            console.log(resp);
            return resp.json();
          })
          .then((response) => {
            console.log(response);
            debugger
            this.props.history.push("/result/" + this.props.match.params.id, { response: response })
          });
        ; break;
      default: throw new Error();
    }
  };
}
