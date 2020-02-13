import React from 'react';

const RegisterForm = ({
    email,
    password,
    warning,
    response,
    setIsLogin,
    isHidden,
    handleChange,
    handleClickTogglePassword,
    handleJoin
}) => {
    return (
        <div>
            <h1>Join</h1>
            <form onSubmit={handleJoin()}>
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
                    <div className="password-container">
                        <input 
                            type={isHidden ? 'password' : 'text'}
                            name="password"
                            value={password} 
                            onChange={handleChange('password')}
                            placeholder="password" 
                            required
                        />
                        <button 
                            className="password-toggle"
                            onClick={handleClickTogglePassword()}
                            type="button"
                        >
                            {isHidden ? 'show' : 'hide'}
                        </button>
                    </div>
                </label>
                <div className={`login-login-failed ${warning}`}>
                    {response}
                </div>
                <div className="login-btn">
                    <button type="submit">Join</button>
                </div>
            </form>
            <p>
                Already on MyMovie?&nbsp;
                <span onClick={() => setIsLogin(true)}>
                    <strong>Login</strong>
                </span>
            </p>
        </div>
    )
}

export default RegisterForm;