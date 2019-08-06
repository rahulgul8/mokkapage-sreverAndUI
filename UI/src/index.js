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
    <div>
        <div className="stickyHeader carrot"><img className="logo" src="/carrot_logo.png"></img><h2 className="title"><strong>FunCarrot.com</strong></h2></div>
        <div className="jumbotron start">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/result/:id" component={Result} />
                    <Route exact path="/quiz/:id" component={UserPage} />
                </Switch>
            </BrowserRouter>
        </div>
    </div>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWArender={(props) => <Result param={props.match.params.id}
serviceWorker.unregister();
