import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const email = useRef("");
    const username = useRef("");
    const password = useRef("");
    const confirmPassword = useRef("");

    const registerUser = () => {
        if(password.current.value !== confirmPassword.current.value)
            return console.log("Passwords don't match!");

        var axios = require('axios');
        var data = JSON.stringify({
            "email": email.current.value,
            "username": username.current.value,
            "password": password.current.value
        });

        var config = {
        method: 'post',
        url: 'http://localhost:3000/users/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });

    }

  return (
    <div className='login-container'>
        <h1>ListShare</h1>
        <form className='login-form' onSubmit={registerUser}>
            <label>Email</label><input type="text" placeholder='email@email.com' ref={email} onChange={ (e) => email.current.value = e.target.value}></input><br/>
            <label>Username</label><input type="text" placeholder='Username' ref={username} onChange={ (e) => username.current.value = e.target.value}></input><br/>
            <label>Password</label><input type="text" placeholder='Password' ref={password} onChange={ (e) => password.current.value = e.target.value}></input><br/>
            <label>Confirm Password</label><input type="text" placeholder='Confirm Password' ref={confirmPassword} onChange={ (e) => confirmPassword.current.value = e.target.value}></input><br/>
            <button type='submit'>Register</button>
        </form>
        <p>Already registered? <Link to='/login'>Log in here!</Link></p>
    </div>);
};

export default Register;
