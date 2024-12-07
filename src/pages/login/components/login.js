import '../styles/login.css'
import React, { useState, useEffect  } from 'react';



function Login() {

 

 return (  

    <div className='loginMainDiv'>


        <div className='loginCentreDiv'>

            <div id='signInSideDiv'>

                <h1 className='signInTitle'>Sign In</h1>

                <form id="signInForm">
                    
                    <input type="email" id="emailInputSignIn" name="emailInput" required placeholder="Email"></input>

                    <input type="password" id="passwordInputSignIn" name="passwordInput" required placeholder="Password"></input>

                </form>

                <h2 id='forgotPassword'>Forgot your password?</h2>

                <button id='signInButton'>SIGN UP</button>

            </div>

            <div id='createAccountDiv'>

                <h1 className='mainTitle'>Create,</h1>
                <h1 className='mainTitle'>Account!</h1>
                <h2 className='subText'>Sign up if you don't have an account </h2>

                <button id='signUpButton'>SIGN UP</button>

            </div>

        </div>

    </div>



 );}
  
  export default Login;