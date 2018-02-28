import React from 'react';
import './notification.css';

const Notification = props => {
    const background = props.type === 'success' ? 'notification-wrapper-success' : 'notification-wrapper-error';
    return (
        <div className={`notification-wrapper ${background}`}>
            <div>{props.description}</div>
        </div>
    );
};

export default Notification;
