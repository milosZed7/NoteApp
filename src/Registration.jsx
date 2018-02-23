import React from 'react';

class Registration extends React.Component {
    redirectToRegistration = () => {
        this.props.history.push('/login');
    };
    render() {
        return (
            <div className="signup-login-wrapper">
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
                        <button className="signup-login-btn signup">Sign up</button>
                    </form>
                </div>

                <div className="sign-up-wrapper">
                    <span>Already have an account?</span>
                    <button className="signup-login-btn login" onClick={this.redirectToRegistration}>
                        Sign in
                    </button>
                </div>
            </div>
        );
    }
}

export default Registration;
