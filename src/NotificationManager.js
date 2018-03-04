import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

const TIME_NOTIFICATION_LEAVE_ANIMATION = 500;

const notify = (type, description, time = 3000) => {
    const sumTime = time + TIME_NOTIFICATION_LEAVE_ANIMATION;
    const notification = < Notification type = { type }
    description = { description }
    time = { time }
    />;
    let container = document.querySelector('[data-type=notification-container]');
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('data-type', 'notification-container');
        document.body.appendChild(container);
    }
    ReactDOM.render(notification, container);
    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(container);
    }, sumTime);
};

export default notify;