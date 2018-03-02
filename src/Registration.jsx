import React from 'react';
import { Link } from 'react-router-dom';
import fire from './fire';
import notify from './NotificationManager';

class Registration extends React.Component {
    state = {
        password: '',
        email: '',
        passwordError: false,
        emailError: false
    };
    inputChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };
    register = () => {
        const { email, password } = this.state;
        const error = this.validate();
        if (error.passwordError || error.emailError) {
            this.setState({
                emailError: error.emailError,
                passwordError: error.passwordError
            });
            return;
        }

        fire
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(err => {
                this.setState({
                    emailError: false,
                    passwordError: false
                });
                notify('error', err.message, 5000);
            });

        //this.props.history.push('/login');
    };

    validate = () => {
        const { email, password } = this.state;
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const passwordError = !password.trim() || password.length < 6;
        const emailError = !email.match(emailRegex);
        return { passwordError, emailError };
    };
    render() {
        return (
            <React.Fragment>
                <div className="signup-login-wrapper">
                    <h1 className="signup-login-title">Join Note App</h1>
                    <div className="signup-login-form-wrapper">
                        <form>
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
                            {this.state.emailError ? <div className="signup-login-error">Email is invalid</div> : ''}

                            <label htmlFor="password" className="signup-login-label">
                                Password
                            </label>
                            <input
                                placeholder="Create a password"
                                name="password"
                                type="password"
                                className="signup-login-input"
                                onChange={evt => {
                                    this.inputChange(evt.target.name, evt.target.value);
                                }}
                            />
                            {this.state.passwordError ? (
                                <div className="signup-login-error">Password should be at least 6 characters</div>
                            ) : (
                                ''
                            )}

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
