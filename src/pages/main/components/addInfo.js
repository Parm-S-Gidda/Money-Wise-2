import '../styles/addinfo.css'
import AddEntry from './addEntry';
import Record from './record';
import React, { useState, useEffect } from 'react';
import { db } from '../../../config/firestore';
import { getFirestore, doc, collection, setDoc, getDocs, deleteDoc, query, getDoc} from "firebase/firestore"; 
import loadingImg from '../../../images/loading.gif'

const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];



function AddInfo({displayedDay, displayedMonth, displayedYear, cancleClicked, isFlex}) {

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(displayedYear, displayedMonth, displayedDay);
  const dayIndex = date.getDay();    
  const [records, setRecords] = useState([])
  const [total, setTotal] = useState(0)
  const [removeList, setRemoveList] = useState([]);
  const [addList, setAddList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let epochDate = Math.floor(Date.UTC(displayedYear, displayedMonth, displayedDay, 0, 0, 0) / 1000);

  useEffect(() => {

    if(isFlex){
      getEntries();
      console.log("Fetching Entries")
    }

  }, [displayedDay, isFlex]);

  async function getEntries(){

    const entriesRef = collection(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates", epochDate.toString(), "entries");
    const dateRef = doc(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates", epochDate.toString());

    const date = await getDoc(dateRef);

    if(date.exists()){

      setTotal(date.data().entriesSum);
    }

    const q = query(entriesRef);

    try {
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map(doc => doc.data()); 

      setRecords(entries);
      console.log(entries); 
      setIsLoading(false)
  
      
   
    } catch (error) {
      console.error("Error fetching entries: ", error);
    }

  }
  
 

  const addRecord = (newRecord) => {
    setRecords((prevRecords) => [...prevRecords, newRecord]);

    setAddList((prevList) => [...prevList, newRecord]);
  
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
    removeEntriesFromDB()

    setAddList([]);
    setRemoveList([]);

    cancleClicked()


   setTotal(0);
   setRecords([]);
   setIsLoading(true)

  };

  const cancelPressed = () => {

    setAddList([]);
    setRemoveList([]);
   setTotal(0);
    setRecords([]);
    setIsLoading(true)
    cancleClicked();
    

  }

  async function saveEntriesToDB() {
    const entriesRef = collection(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates", epochDate.toString(), "entries");
  
    //add the sum of all the entries to the date
    const dateRef = doc(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates", epochDate.toString());
    await setDoc(dateRef, {
      entriesSum: total,  
    }, { merge: true }) 
    .catch((error) => {
      console.error("Error adding Entry Sum document: ", error);
    });
    
    //Add entries to the date
    for (const record of addList) {

      const entryRef = doc(entriesRef, record.timeAdded.toString()); 
  
      await setDoc(entryRef, {
        amount: record.amount,
       description: record.description, 
       timeAdded: record.timeAdded,
       date: displayedYear + " " + displayedMonth + ", " + displayedDay
      }).catch((error) => {
        console.error("Error adding document: ", error);
      });
    }
      
  }

  async function removeEntriesFromDB() {

    //add the sum of all the entries to the date 
    const dateRef = doc(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates", epochDate.toString());

    await setDoc(dateRef, {
      entriesSum: total,  
    }, { merge: true }) 
    .catch((error) => {
      console.error("Error adding Entry Sum document: ", error);
    });
    
  
    //remove the entries from the date
    for (const timeAdded of removeList) {

      let entryRef = doc(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates", epochDate.toString(), "entries", timeAdded.toString());
      console.log("Imd deleting on this Day: " + epochDate + " at thsi time: " + timeAdded )
      
      try {
        await deleteDoc(entryRef);
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
        
      
    }
  }

   
    

    return (

      <>

        {isLoading ? (
          
          <div id="infoLoadingDiv">
                <img id='infoLoadingGif' src={loadingImg}></img>
          </div>
          
        
        
        
        
        ) :
        
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
                  <button id='cancelButton' className='addInfoButtons' onClick={cancelPressed}>Cancel</button>
                </div>
              
                

            </div> 

        

          </div>

        

    
          
          
            
          
        </div>
        
        
        }
      
        

      </>
    );
  }
  
  export default AddInfo;