import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import './registration-login.css';
import './menu.css';
import './about-author.css';
import Notes from './Notes';
import Login from './Login';
import Registration from './Registration';
import AboutAuthor from './AboutAuthor';
import PrivateRoute from './PrivateRoute';

const fourOFour = () => <h1>404</h1>;

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <PrivateRoute exact path="/" component={Notes} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Registration} />
                    <PrivateRoute exact path="/author" component={AboutAuthor} />
                    <Redirect from="/about" to="/author" />
                    <Redirect from="/aboutAuthor" to="/author" />
                    <Redirect from="/home" to="/" />
                    <Redirect from="/notes" to="/" />
                    <Route component={fourOFour} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
