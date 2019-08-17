import React, { Component } from 'react';
import './style/sharePage.css'
export default class SharePage extends Component {

  render() {
    var url = encodeURI(this.props.domain + this.props.quizId);
    var title = encodeURI(this.props.title + " ");
    return (<div><h5>Your Quiz is ready!! <br />Share this URL with your friends and see who knows you best.</h5>
      <div id="shareUrl" contentEditable='true' className="shareDiv" onClick={this.copy.bind(this)}><strong>{this.props.domain + this.props.quizId}</strong></div>
      <button className="whatsappStatus btn btn-primary">Whatsapp Status</button>
      <div id='share'>
        <a className="whatsapp" href={'https://api.whatsapp.com/send?text=' + title + url}><i className="fa fa-whatsapp"></i></a>

        <a className="facebook" href={"https://www.facebook.com/share.php?u=" + url + "&title=" + title} target="blank"><i className="fa fa-facebook"></i></a>

        {/* <a className="facebook-messenger" href={"fb-messenger://share/?link=" + url + "&app_id=123456789"}><i className="fab fa-facebook-messenger"></i></a> */}

        <a className="twitter" href={"https://twitter.com/intent/tweet?status=" + title + " +" + url} target="blank"><i className="fa fa-twitter"></i></a>

        <a className="linkedin" href={"https://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title} target="blank"><i className="fa fa-linkedin"></i></a>

        <button className="copy" onClick={this.copy.bind(this)}><i className="fa fa-copy"></i></button>
      </div>
    </div >);
  }

  copy() {
    var copyText = document.getElementById("shareUrl");
    setTimeout(function () {
      copyText.focus();
      document.execCommand('selectAll');
      document.execCommand("copy");
    }, 0);
  }
}
