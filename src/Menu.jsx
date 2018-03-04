import React from 'react';
import { Link } from 'react-router-dom';
import fire from './fire';
import { removeUserUid } from './LocalStorageApi';

const Menu = props => {
    const signOut = () => {
        fire
            .auth()
            .signOut()
            .then(() => {
                removeUserUid();
                props.history.push('/login');
            });
    };
    return (
        <div className="menu-wrapper">
            <div className="top-menu">
                <Link to="/">My Notes</Link>
                {props.isAdmin ? <Link to="users">Users</Link> : ''}
            </div>
            <div className="bottom-menu">
                <Link to="/author">About Ahthor</Link>
                <div onClick={signOut}>Sign out</div>
            </div>
        </div>
    );
};

export default Menu;
