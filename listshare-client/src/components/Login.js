import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const username = useRef("");
    const password = useRef("");

    const login = (e) => {
        e.preventDefault();
        
        var axios = require('axios');
        var data = JSON.stringify({
            "username": username.current.value,
            "password": password.current.value
        });

        var config = {
        method: 'post',
        url: 'http://localhost:3000/users/login',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.localStorage.setItem('token', JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });

    }

  return (
    <div className='login-container'>
        <h1>ListShare</h1>
        <form className='login-form' onSubmit={login}>
            <label>Username</label><input type="text" placeholder='Username' ref={username} onChange={ (e) => username.current.value = e.target.value }></input><br/>
            <label>Password</label><input type="text" placeholder='Password' ref={password} onChange={ (e) => password.current.value = e.target.value }></input><br/>
            <button type='submit'>Log in</button>
        </form>
        <p>Not registered? <Link to='/register'>Register here!</Link></p>
    </div>
  );
};

export default Login;
