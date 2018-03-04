import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUserUid } from './LocalStorageApi';

class PrivateRoute extends React.Component {
    render() {
        if (!getUserUid()) {
            return <Redirect to="/login" />;
        }
        return <Route {...this.props} />;
    }
}

export default PrivateRoute;
