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
import WithMenu from './WithMenu';
import WithoutMenu from './WithoutMenu';
const fourOFour = () => <h1>404</h1>;

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={WithMenu(Notes)} />
                <Route exact path="/login" component={WithoutMenu(Login)} />
                <Route exact path="/register" component={WithoutMenu(Registration)} />
                <PrivateRoute exact path="/author" component={WithMenu(AboutAuthor)} />
                <Redirect from="/about" to="/author" />
                <Redirect from="/aboutAuthor" to="/author" />
                <Redirect from="/home" to="/" />
                <Redirect from="/notes" to="/" />
                <Route component={fourOFour} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
