import React from 'react';
import { Link } from 'react-router-dom';

class Registration extends React.Component {
    render() {
        return (
            <div className="signup-login-wrapper">
                <h1 className="signup-login-title">Join Note App</h1>
                <div className="signup-login-form-wrapper">
                    <form>
                        <label htmlFor="username" className="signup-login-label">
                            Username
                        </label>
                        <input placeholder="Pick a username" name="username" type="text" className="signup-login-input" />
                        <label htmlFor="email" className="signup-login-label">
                            Username
                        </label>
                        <input placeholder="you@example.com" name="email" type="text" className="signup-login-input" />
                        <label htmlFor="password" className="signup-login-label">
                            Password
                        </label>
                        <input
                            placeholder="Create a password"
                            name="password"
                            type="password"
                            className="signup-login-input"
                        />
                        <button className="signup-login-btn">Sign up</button>
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
