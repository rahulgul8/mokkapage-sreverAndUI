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
    let rows = this.state.rows;
    return this.getTable(rows);
  }

  

  componentDidMount() {
    if (this.props.id) {
      fetch(Constant.HOST + '/player/result/get?id=' + this.props.id)
        .then(res => res.json())
        .then((data) => {
          data.sort((a, b) => b.score - a.score);
          this.setState({ rows: data });
        })
        .catch(console.log)
    } else {
      this.props.responses.sort((a, b) => b.score - a.score);
      this.setState({ rows: this.props.responses });
    }
  }

  getTable(rows) {
    var count = 0;
    return (<div className="result">
      <div className="tablediv"><table className="table table-striped">
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
