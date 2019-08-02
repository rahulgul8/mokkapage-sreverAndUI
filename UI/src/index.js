import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Result from './component/Result'
import UserPage from './component/UserPage'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
    <div className="jumbotron start">
        <h6><strong>2019 Friendship Dare!!!</strong></h6>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/result/:id" component={Result} />
                <Route exact path="/quiz/:id" component={UserPage} />
            </Switch>
        </BrowserRouter></div>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWArender={(props) => <Result param={props.match.params.id}
serviceWorker.unregister();
