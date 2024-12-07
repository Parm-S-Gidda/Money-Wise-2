import '../styles/signup.css'
import React, { useState, useEffect  } from 'react';



function SignUp() {

 

 return (  

    <div className='loginMainDiv'>


        <div className='loginCentreDiv'>

            <div id='signInSideDiv'>

                <h1 className='signInTitle'>Sign Up</h1>

                <form id="signUpForm">

                    <div id="inputDiv">
                        <label for="nameSignupInput" className='labelTitles'>First Name*</label>
                        <input type="text" id="nameSignupInput" name="nameInput" required ></input>
                        
                        <label for="emailInputSignUp" className='labelTitles'>Email*</label>
                        <input type="email" id="emailInputSignUp" name="emailInput" required ></input>

                        <label for="passwordInputSignUp" className='labelTitles'>Password*</label>
                        <input type="password" id="passwordInputSignUp" name="passwordInput" required ></input>

                    </div>
                    
                   

                </form>

              

                <button id='signInButton'>SIGN UP</button>

            </div>

            <div id='createAccountDiv'>

                <h1 className='mainTitle'>Sign In</h1>
                <h2 className='subText'>Sign in if you already have an account </h2>

                <button id='signInButtonSignUp'>SIGN IN</button>

            </div>

        </div>

    </div>



 );}
  
  export default SignUp;