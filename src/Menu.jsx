import React from 'react';
import { Link } from 'react-router-dom';

const Menu = props => {
    return (
        <div className="menu-wrapper">
            <div className="top-menu">
                <Link to="/">My Notes</Link>
                {props.isAdmin ? <Link to="users">Users</Link> : ''}
            </div>
            <div className="bottom-menu">
                <Link to="/about">About Ahthor</Link>
                <Link to="logout">Sign out</Link>
            </div>
        </div>
    );
};

export default Menu;
