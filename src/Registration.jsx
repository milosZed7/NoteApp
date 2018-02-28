import React from 'react';
import { Link } from 'react-router-dom';
import fire from './fire';
import Notification from './Notification';

class Registration extends React.Component {
    state = {
        username: '',
        password: '',
        email: '',
        usernameError: false,
        passwordError: false,
        emailError: false,
        registerError: false
    };
    inputChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };
    register = () => {
        const { username, email, password } = this.state;
        fire
            .auth()
            .signInWithCredential()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(({ uid }) => {
                fire
                    .database()
                    .ref(`users/${uid}`)
                    .set({ username, email, password });
            })
            .catch(err => {
                console.log(err);
            });

        this.validate();
        //this.props.history.push('/login');
    };

    validate = () => {
        const { username, email, password } = this.state;
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const usernameError = !username.trim() || username.length < 8;
        const passwordError = !password.trim() || password.length < 8;
        const emailError = !email.match(emailRegex);
        const registerError = username || passwordError || emailError;
        this.setState({
            emailError,
            usernameError,
            passwordError,
            registerError
        });
    };
    render() {
        return (
            <React.Fragment>
                <Notification type="error" description="There were problems creating your account." time={1000} />
                <div className="signup-login-wrapper">
                    <h1 className="signup-login-title">Join Note App</h1>
                    <div className="signup-login-form-wrapper">
                        <form>
                            <label htmlFor="username" className="signup-login-label">
                                Username
                            </label>
                            <input
                                placeholder="Pick a username (at least 8 charater long)"
                                name="username"
                                type="text"
                                className="signup-login-input"
                                onChange={evt => {
                                    this.inputChange(evt.target.name, evt.target.value);
                                }}
                            />
                            {this.state.usernameError ? (
                                <div className="signup-login-error">Username is invalid or already taken</div>
                            ) : (
                                ''
                            )}

                            <label htmlFor="email" className="signup-login-label">
                                Email
                            </label>
                            <input
                                placeholder="you@example.com"
                                name="email"
                                type="email"
                                className="signup-login-input"
                                onChange={evt => {
                                    this.inputChange(evt.target.name, evt.target.value);
                                }}
                            />
                            {this.state.emailError ? (
                                <div className="signup-login-error">Email is invalid or already taken</div>
                            ) : (
                                ''
                            )}

                            <label htmlFor="password" className="signup-login-label">
                                Password
                            </label>
                            <input
                                placeholder="Create a password (at least 8 charater long)"
                                name="password"
                                type="password"
                                className="signup-login-input"
                                onChange={evt => {
                                    this.inputChange(evt.target.name, evt.target.value);
                                }}
                            />
                            {this.state.passwordError ? <div className="signup-login-error">Password is invalid</div> : ''}

                            <button
                                className="signup-login-btn"
                                onClick={evt => {
                                    evt.preventDefault();
                                    this.register();
                                }}>
                                Sign up
                            </button>
                        </form>
                    </div>

                    <div className="sign-up-wrapper">
                        <span>Already have an account?</span>
                        <Link className="signup-login-btn login" to="/login">
                            Sign in
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Registration;
