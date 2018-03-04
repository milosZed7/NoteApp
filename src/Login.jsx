import React from 'react';
import { Link } from 'react-router-dom';
import notify from './NotificationManager';
import fire from './fire';
import { getUserUid, saveUserUid } from './LocalStorageApi';

class Login extends React.Component {
    state = {
        password: '',
        email: ''
    };
    inputChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };
    componentWillMount() {
        const user = getUserUid();
        user && this.props.history.push('/');
    }
    login = () => {
        const { email, password } = this.state;
        fire
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                saveUserUid(value.uid);
                this.props.history.push('/');
            })
            .catch(() => {
                notify('error', 'Login failed wrong user credentials', 5000);
            });
    };

    componentDidMount() {
        (this.props.location.state || {}).notification &&
            notify('success', 'You have successfully registered to Note App', 5000);
    }
    render() {
        return (
            <div className="signup-login-wrapper">
                <h1 className="signup-login-title">Sign in to Note App</h1>
                <div className="signup-login-form-wrapper">
                    <form>
                        <label htmlFor="email" className="signup-login-label">
                            Email
                        </label>
                        <input
                            name="email"
                            type="text"
                            className="signup-login-input"
                            onChange={evt => {
                                this.inputChange(evt.target.name, evt.target.value);
                            }}
                        />
                        <label htmlFor="password" className="signup-login-label">
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className="signup-login-input"
                            onChange={evt => {
                                this.inputChange(evt.target.name, evt.target.value);
                            }}
                        />
                        <button
                            className="signup-login-btn"
                            onClick={evt => {
                                evt.preventDefault();
                                this.login();
                            }}>
                            Sign in
                        </button>
                    </form>
                </div>

                <div className="sign-up-wrapper">
                    <span>New to Note App?</span>
                    <Link className="signup-login-btn signup" to="/register">
                        Sign up
                    </Link>
                </div>
            </div>
        );
    }
}

export default Login;
