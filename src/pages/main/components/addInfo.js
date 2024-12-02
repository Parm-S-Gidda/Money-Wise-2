import '../styles/addinfo.css'
import AddEntry from './addEntry';
import Record from './record';
import React, { useState, useEffect } from 'react';

const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];



function AddInfo({displayedDay, displayedMonth, displayedYear}) {

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(displayedYear, displayedMonth, displayedDay);
  const dayIndex = date.getDay();    
  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)

  const addRecord = (newRecord) => {
    setRecords((prevRecords) => [...prevRecords, newRecord]);
  };

  const removeRecord = (indexToRemove) => {
    setRecords((prevRecords) =>
      prevRecords.filter((_, index) => index !== indexToRemove)
    );
  };

  const addToTotal = (newAmount) => {

    setTotal(prevTotal => prevTotal + newAmount);
  };

  const removeFromTotal = (newAmount) => {

    setTotal(prevTotal => prevTotal - newAmount);
  };

   
    

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
                <button id='saveButton' className='addInfoButtons'>Save</button>
                <button id='cancelButton' className='addInfoButtons'>Cancel</button>
              </div>
             
              

          </div> 

       

        </div>

      

  
        
        
          
         
      </div>
    );
  }
  
  export default AddInfo;