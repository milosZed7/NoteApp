import React from 'react';
import { Link } from 'react-router-dom';
import fire from './fire';

class Registration extends React.Component {
    state = {
        username: '',
        password: '',
        email: ''
    };
    inputChange = (name, value) => {
        this.setState({
            [name]: value
        });
    };
    register = () => {
        fire
            .database()
            .ref('users')
            .push(this.state);
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
        this.props.history.push('/login');
    };
    render() {
        return (
            <div className="signup-login-wrapper">
                <h1 className="signup-login-title">Join Note App</h1>
                <div className="signup-login-form-wrapper">
                    <form>
                        <label htmlFor="username" className="signup-login-label">
                            Username
                        </label>
                        <input
                            placeholder="Pick a username"
                            name="username"
                            type="text"
                            className="signup-login-input"
                            onChange={evt => {
                                this.inputChange(evt.target.name, evt.target.value);
                            }}
                        />
                        <label htmlFor="email" className="signup-login-label">
                            Username
                        </label>
                        <input
                            placeholder="you@example.com"
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
                            placeholder="Create a password"
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
        );
    }
}

export default Registration;
