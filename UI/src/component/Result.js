import React, { Component } from 'react';
import './ResultPage.css'
export default class Result extends Component {

  render() {
    console.log(this.props.location.state);
    let rows = this.props.location.state.response;
    return this.getTable(rows);
  }

  getTable(rows) {
    return (<div className="tablediv"><table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(row => {
          return (<tr>
            <td>{row.name}</td>
            <td>{row.score}</td>
          </tr>);
        })}
      </tbody>
    </table></div>);
  }

}
