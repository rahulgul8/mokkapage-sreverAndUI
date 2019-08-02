import React, { Component } from 'react';
import './style/ResultPage.css';
import * as Constant from '../constants'
export default class Result extends Component {

  constructor() {
    super();
    this.state = {
      rows: []
    };
  }

  render() {
    console.log(this.props.location.state);
    let rows = this.state.rows;
    return this.getTable(rows);
  }

  redirect() {
    this.props.history.push('/')
  }

  componentDidMount() {
    if (!this.props.location.state || !this.props.location.state.response) {
      fetch(Constant.HOST + '/player/result/get?id=' + this.props.match.params.id)
        .then(res => res.json())
        .then((data) => {
          data.sort((a, b) => b.score - a.score);
          this.setState({ rows: data });
        })
        .catch(console.log)
    } else {
      this.props.location.state.response.sort((a, b) => b.score - a.score);
      this.setState({ rows: this.props.location.state.response });
    }
  }

  getTable(rows) {
    var count = 0;
    return (<div><button className="btn btn-primary carrot" onClick={this.redirect.bind(this)}>Create your own quiz-></button><div className="tablediv"><table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          return (<tr key={count++}>
            <td>{row.name}</td>
            <td>{row.score}</td>
          </tr>);
        })}
      </tbody>
    </table></div></div>);
  }

}
