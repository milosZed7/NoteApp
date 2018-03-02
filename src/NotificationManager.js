import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './Notification';

const notify = (type, description, time = 3000) => {
    const notification = <Notification type={type} description={description} />;
    let container = document.querySelector('[data-type=notification-container]');
    if (!container) {
        container = document.createElement('div');
        container.setAttribute('data-type', 'notification-container');
        document.body.appendChild(container);
    }
    ReactDOM.render(notification, container);
    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(container);
    }, time);
};

export default notify;
