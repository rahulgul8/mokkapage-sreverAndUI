import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Result from './component/Result'
import UserPage from './component/UserPage'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ContactUs from './ContactUs';

ReactDOM.render(
      <div style={{ height: '100%', width: '100%' }}>
        <div className="stickyHeader"><img alt="funcarrot logo" className="logo" src="/carrot_logo.png"></img><h2 className="title"><strong>FunCarrot.com</strong></h2></div>
        <div className="start">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/result/:id" component={Result} />
                    <Route exact path="/quiz/:id" component={UserPage} />
                    <Route exact path="/privacypolicy" render={() => { window.location.href = "privacyPolicy.html" }} />
                    <Route exact path="/disclaimer" render={() => { window.location.href = "disclaimer.html" }} />
                    <Route exact path="/contactus" component={ContactUs} />
                </Switch>
            </BrowserRouter>
        </div>
        <div className="description">Enter your Name to Create your Quiz. Share it with your friends on Facebook or Whatsapp. Once your friends attempt the quiz you will see the results on leaderboard.</div>
        <div className="stickyFooter"><a href="/privacypolicy">Privacy Policy</a> <a href="/contactus">Contact us</a><a href="/disclaimer">Disclaimer</a></div>
    </div>,
    document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWArender={(props) => <Result param={props.match.params.id}
serviceWorker.unregister();
