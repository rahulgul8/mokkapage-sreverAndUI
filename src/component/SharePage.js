import React, { Component } from 'react';

export default class SharePage extends Component {

  render() {
    return (<div>
      <h3>{this.props.domain + this.props.quizId}</h3>
      <a href={'whatsapp://send?text=' + encodeURI(this.props.domain + this.props.quizId)}>Share to WhatsApp</a>
    </div >);
  }
}