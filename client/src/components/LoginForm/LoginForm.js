import React from 'react';

const LoginForm = ({
    email,
    password,
    warning,
    response,
    setIsLogin,
    handleLogin,
    handleChange
}) => {
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin()}>
                <label htmlFor="email">
                    <div>Email</div>
                    <input 
                        type="email"
                        name="email"
                        value={email} 
                        onChange={handleChange('email')}
                        placeholder="email@example.com" 
                        required
                    />
                </label>
                <label htmlFor="password">
                    <div>Password</div>
                    <input 
                        type="password" 
                        name="password"
                        value={password} 
                        onChange={handleChange('password')}
                        placeholder="password" 
                        required
                    />
                </label>
                <div className={`login-login-failed ${warning}`}>
                    {response}
                </div>
                <div className="login-btn">
                    <button type="submit">Login</button>
                </div>
            </form>
            <p>
                Not a user?&nbsp;
                <span onClick={() => setIsLogin(false)}>
                    <strong>Join</strong>
                </span>
            </p>
        </div>
    )
}

export default LoginForm;