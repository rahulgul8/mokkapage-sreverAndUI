import React, { Component } from 'react';

export default class SharePage extends Component {

  render() {
    return (<div>
      <div contentEditable='true' className="shareDiv">{this.props.domain + this.props.quizId}</div>
      <a href={'whatsapp://send?text=' + encodeURI(this.props.domain + this.props.quizId)}>
      <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="Whatsapp"/></a>
    </div >);
  }
}