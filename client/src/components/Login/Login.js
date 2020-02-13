import React, { useState } from 'react';
import { serverAxios } from '../../axios';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

const Login = () => {
    serverAxios.defaults.headers['Authorization'] = '';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warning, setWarning] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isHidden, setIsHidden] = useState(true);
    const [response, setResponse] = useState('Please check your Email or Password');

    const handleLogin = () => e => {
        e.preventDefault();

        serverAxios.post(`/api/user/login/`, { username: email, password })
        .then(results => {
            const token = results.data.token;
            window.sessionStorage.setItem('token', token);
            window.location.pathname = '/';
        }).catch(err => {
            console.log('Error with getting user :', err);
            setWarning('warning');
        });
    }

    const handleJoin = () => e => {
        e.preventDefault();

        serverAxios.post(`/api/user/register/`, { username: email, email, password })
        .then(results => {
            if(results.data.response) {
                setWarning('warning');
                setResponse(results.data.response);
            } else {
                const token = results.data.token;
                window.sessionStorage.setItem('token', token);
                window.location.pathname = '/';
            }
        }).catch(err => {
            console.log('Error with getting user :', err);
            setWarning('warning');
            setResponse('Please check your Email or Password');
        });
    }

    const handleChange = name => e => {
        switch (name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleClickTogglePassword = () => e => {
        e.preventDefault();
        setIsHidden(!isHidden);
    }

    return (
        <div className="login-container">
            {
                isLogin === true ?
                <LoginForm 
                    handleLogin={handleLogin}
                    handleChange={handleChange}
                    setIsLogin={setIsLogin}
                    email={email}
                    password={password}
                    response={response}
                    warning={warning}
                /> :
                <RegisterForm
                    handleChange={handleChange}
                    handleJoin={handleJoin}
                    isHidden={isHidden}
                    handleClickTogglePassword={handleClickTogglePassword}
                    setIsLogin={setIsLogin}
                    email={email}
                    password={password}
                    response={response}
                    warning={warning}
                />
            }
        </div>
    )
}

export default Login;