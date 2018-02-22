import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import './login.css';
import './register.css';
import Notes from './Notes';
import Login from './Login';
import Registration from './Registration';

const fourOFour = () => <h1>404</h1>;

const App = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Notes} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Registration} />
                    <Redirect from="/home" to="/" />
                    <Redirect from="/notes" to="/" />
                    <Route component={fourOFour} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;
