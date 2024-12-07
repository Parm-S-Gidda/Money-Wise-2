import '../styles/login.css'
import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";



function Login() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });

    const navigate = useNavigate();



    const handleLogInClick = () => {

       tryLogIn(formData.emailInput, formData.passwordInput) 
       
    };

    async function tryLogIn(email, password) {
        
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    navigate('/');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    alert("Incorrect email or password")
  });
    }

    const handleSignUpClicked = () => {
        navigate('/signup');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    

 

 return (  

    <div className='loginMainDiv'>


        <div className='loginCentreDiv'>

            <div id='signInSideDiv'>

                <h1 className='signInTitle'>Log In</h1>

                <form id="signInForm">
                    
                    <input type="email" onChange={handleChange} id="emailInputSignIn" name="emailInput" required placeholder="Email"></input>

                    <input type="password" onChange={handleChange} id="passwordInputSignIn" name="passwordInput" required placeholder="Password"></input>

                </form>

                <h2 id='forgotPassword'>Forgot your password?</h2>

                <button id='signInButton' onClick={handleLogInClick}>LOG IN</button>

            </div>

            <div id='createAccountDiv'>

                <h1 className='mainTitle'>Create,</h1>
                <h1 className='mainTitle'>Account!</h1>
                <h2 className='subText'>Sign up if you don't have an account </h2>

                <button id='signUpButton' onClick={handleSignUpClicked}>SIGN UP</button>

            </div>

        </div>

    </div>



 );}
  
  export default Login;