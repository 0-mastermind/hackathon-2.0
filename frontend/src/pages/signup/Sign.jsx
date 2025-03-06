import React from 'react'
import './Sign.css'
const Sign = () => {
  return (
    <>
    <div className="container">
    <a href='index.html' className='back-btn'>
        <i className='fas fa-arrow-left'></i>
        Back
    </a>

    <div classNameName='login-container'>
        <div className='login-header'>
            <i className='fas fa-user-circle'></i>
            <h1>Sign Up</h1>
            <p>Please enter your details</p>
        </div>

        <div className='form-group'>
            <input type='Name' id='Name' className='form-input' placeholder='Name'/>
            <i className='fas fa-envelope'></i>
        </div>

        <div className='form-group'>
            <input type='email' id='email' className='form-input' placeholder='Email address'/>
            <i className='fas fa-envelope'></i>
        </div>

        <div className='form-group'>
            <input type='password' id='password' className='form-input' placeholder='Password'/>
            <i className='fas fa-lock'></i>
        </div>
        <button className='login-btn' id='loginBtn' onclick='handleLogin()'>
            <i className='fas fa-sign-in-alt'></i>
            Sign Up
        </button>
    </div>
    </div>
    </>
  )
}

export default Sign