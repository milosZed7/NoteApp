import React from 'react';
import './notification.css';

class Notification extends React.Component {
    state = {
        leaveAnimation: ''
    };
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                leaveAnimation: 'notification-wrapper-fade-out'
            });
        }, this.props.time);
    }
    render() {
        const background = this.props.type === 'success' ? 'notification-wrapper-success' : 'notification-wrapper-error';
        return (
            <div className={`notification-wrapper ${background} ${this.state.leaveAnimation}`}>
                <div>{this.props.description}</div>
            </div>
        );
    }
}

export default Notification;
