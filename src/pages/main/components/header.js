import '../styles/header.css'
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, collection, setDoc, getDocs, deleteDoc, query, getDoc} from "firebase/firestore"; 
import { auth } from '../../../config/firestore';
import React, { useState, useEffect  } from 'react';
import { db } from '../../../config/firestore';
import { signOut, onAuthStateChanged  } from "firebase/auth";

function Header() {

  const [userName, setUserName] = useState("")

  const navigate = useNavigate();

  const handleSignOutClicked = async () => {

    try {
      await signOut(auth);  
      console.log("User signed out successfully.");
      navigate('/login');
     
    } catch (error) {
      console.error("Error signing out: ", error);
    }
   
    
  };

  useEffect(() => {
    getUserFirstName();
  }, [])

  const getUserFirstName = async ( )=> {

    let userID = auth.currentUser.uid;

    const userDocRef = doc(db, "users", userID);

    const userDocSnap = await getDoc(userDocRef);

    const currentUserFirstName = userDocSnap.data().firstName;

    setUserName(currentUserFirstName);

  }

    return (
      <div className="headerMainDiv">

        <h1 className="headerText">Hi {userName}!</h1>
        <h1  className="headerText">Money Wise</h1>
        <button  className="headerText" id="signOutButton" onClick={handleSignOutClicked}>Sign Out</button>
          
         
      </div>
    );
  }
  
  export default Header;