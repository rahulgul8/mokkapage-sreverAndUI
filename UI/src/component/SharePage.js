import React, { Component } from 'react';

export default class SharePage extends Component {

  render() {
    return (<div>
      <textarea className="form-control" defaultValue={this.props.domain + this.props.quizId}></textarea>
      <a className="whatsapp" href={'whatsapp://send?text=' + encodeURI(this.props.domain + this.props.quizId)}>
        <i className="fa fa-whatsapp whatsappButton"></i></a>
    </div >);
  }
}