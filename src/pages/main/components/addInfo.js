import '../styles/addinfo.css'
import AddEntry from './addEntry';
import Record from './record';
import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firestore';
import { getFirestore, doc, collection, setDoc, getDoc, addDoc } from "firebase/firestore"; 

const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];



function AddInfo({displayedDay, displayedMonth, displayedYear, cancleClicked}) {

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(displayedYear, displayedMonth, displayedDay);
  const dayIndex = date.getDay();    
  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [removeList, setRemoveList] = useState([]);
  const [addList, setAddList] = useState([]);

  const addRecord = (newRecord, time) => {
    setRecords((prevRecords) => [...prevRecords, newRecord]);

    setAddList((prevList) => [...prevList, time]);
    console.log("Add at time: " + time)
  };

  const removeRecord = (indexToRemove, time) => {
    setRecords((prevRecords) =>
      prevRecords.filter((_, index) => index !== indexToRemove)
    );

    setRemoveList((prevList) => [...prevList, time]);
    console.log("remove at time: " + time)
  };

  const addToTotal = (newAmount) => {

    setTotal(prevTotal => prevTotal + newAmount);
  };

  const removeFromTotal = (newAmount) => {

    setTotal(prevTotal => prevTotal - newAmount);
   
  };

  const savePressed = () => {

    saveEntriesToDB()
  };

  async function saveEntriesToDB() {
    const entriesRef = collection(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates", "5", "entries");
  
    
    for (const timeAdded of addList) {

      const entryRef = doc(entriesRef); 
  
      await setDoc(entryRef, {
        timeAdded: timeAdded, 
        value: 500,
        description: "Pizza"
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
  }

   
    

    return (
      <div className="addInfoMainDiv">

        <div className='addInfoDiv'>

          <h1 id="addInfoDate">{daysOfWeek[dayIndex]} {months[displayedMonth]} {displayedDay}, {displayedYear}</h1>

          <AddEntry onAddRecord={addRecord} addToTotal={addToTotal}/>

          <div id="entryTitleDiv">
            <h1 id='valueEntry'>Value</h1>
            <h1 id='descriptionEntry'>Description</h1>

          </div>

            <div className='recordList'>
                {records.map((record, index) => (
                  <Record key={index} record={record} removeRecord={removeRecord} index={index} removeFromTotal={removeFromTotal}/>))}
            </div>

          <div id="newDailyBalanceDiv">
            <h1 id="newTotalBalance">Total: {total >= 0 ? "+$" + total.toFixed(2): "-$" + Math.abs(total).toFixed(2)}</h1>
            <h1 id="newDailyBalance">New Daily Balance: $45</h1>

          </div>

          <div className='allButtonsDiv'>

              <div className='saveCancelButtons'>
                <button id='saveButton' className='addInfoButtons' onClick={savePressed}>Save</button>
                <button id='cancelButton' className='addInfoButtons' onClick={cancleClicked}>Cancel</button>
              </div>
             
              

          </div> 

       

        </div>

      

  
        
        
          
         
      </div>
    );
  }
  
  export default AddInfo;