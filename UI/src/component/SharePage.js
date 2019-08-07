import React, { Component } from 'react';
import './style/sharePage.css'
export default class SharePage extends Component {

  render() {
    var url = encodeURI(this.props.domain + this.props.quizId);
    return (<div>
      <div id='share' contentEditable='true' className="shareDiv badgeC badge-bottom-right" onClick={this.copy.bind(this)}>{this.props.domain + this.props.quizId}</div>
      <div className="shareButtons">
        <a href={'whatsapp://send?text=' + url}>
          <img src="https://img.icons8.com/color/48/000000/whatsapp.png" alt="Whatsapp" /></a>
        <a href={"https://www.facebook.com/sharer/sharer.php?u=" + url} target="_blank" rel="noopener">
          <img src="https://img.icons8.com/color/48/000000/facebook-circled.png" alt="Share on Facebook" />
        </a>
      </div>
    </div >);
  }

  copy(e) {
    document.execCommand('selectAll');
    document.execCommand('copy');
  }
}
