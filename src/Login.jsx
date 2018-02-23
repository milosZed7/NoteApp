import React from 'react';

class Login extends React.Component {
    redirectToLogin = () => {
        this.props.history.push('/register');
    };

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
                        <button className="signup-login-btn login">Sign in</button>
                    </form>
                </div>

                <div className="sign-up-wrapper">
                    <span>New to Note App?</span>
                    <button className="signup-login-btn signup" onClick={this.redirectToLogin}>
                        Sign up
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;
