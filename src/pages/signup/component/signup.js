import '../styles/signup.css'
import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../config/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../../../config/firestore';
import { getFirestore, doc, collection, setDoc, getDocs, deleteDoc, query, getDoc} from "firebase/firestore"; 

function SignUp() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });

    const navigate = useNavigate();

    const handleLogInClick = () => {
        navigate('/login');
    };

    const handleSignUpClicked = () => {
    

       console.log("from:", formData);

       if(formData.nameInput.length <= 0){
        alert("Please input a valid name")
        return;
       }

       if(formData.emailInput.length <= 0){
        alert("Please input a valid email")
        return;
       }

       if(formData.passwordInput.length < 6){
        alert("Password must be at least 6 characters")
        return;
       }

     

       signUp(formData.emailInput, formData.passwordInput, formData.nameInput)

    };

    async function signUp(email, password, name) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          console.log("User signed up:", user);

          await setDoc(doc(db, "users", user.uid), {
            firstName: name,
          });
            navigate('/');


        } catch (error) {
          console.error("Error signing up:", error.message);

          if(error.message == "Firebase: Error (auth/invalid-email)."){
            alert("Please input a valid email")
          }

          if(error.message == "Firebase: Error (auth/email-already-in-use)."){
            alert("Email already in use. Please try a different email")
          }
         
        }
      }
 

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

                <h1 className='signInTitle'>Sign Up</h1>

                <form id="signUpForm">

                    <div id="inputDiv">
                        <label for="nameSignupInput" className='labelTitles'>First Name*</label>
                        <input type="text" onChange={handleChange}  id="nameSignupInput" name="nameInput" required ></input>
                        
                        <label for="emailInputSignUp" className='labelTitles'>Email*</label>
                        <input type="email" onChange={handleChange}  id="emailInputSignUp" name="emailInput" required ></input>

                        <label for="passwordInputSignUp" className='labelTitles'>Password*</label>
                        <input type="password" onChange={handleChange}  id="passwordInputSignUp" name="passwordInput" required ></input>

                    </div>
                    
                   

                </form>

              

                <button id='signInButton' onClick={handleSignUpClicked}>SIGN UP</button>

            </div>

            <div id='createAccountDiv2'>

                <h1 className='mainTitle'>Log In</h1>
                <h2 className='subText'>Sign in if you already have an account </h2>

                <button id='signInButtonSignUp' onClick={handleLogInClick}>LOG IN</button>

            </div>

        </div>

    </div>



 );}
  
  export default SignUp;