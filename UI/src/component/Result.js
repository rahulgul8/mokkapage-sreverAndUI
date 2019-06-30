import React, { Component } from 'react';
import './ResultPage.css'
export default class Result extends Component {

  render() {
    let rows = [{ name: 'rahul', score: 10 }, { name: 'Naisini', score: 10 }];
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