import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div className="signup-login-wrapper">
                <h1 className="signup-login-title">Sign in to Note App</h1>
                <div className="signup-login-form-wrapper">
                    <form>
                        <label htmlFor="username" className="signup-login-label">
                            Username or email
                        </label>
                        <input name="username" type="text" className="signup-login-input" />
                        <label htmlFor="password" className="signup-login-label">
                            Password
                        </label>
                        <input name="password" type="password" className="signup-login-input" />
                        <button className="signup-login-btn">Sign in</button>
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
