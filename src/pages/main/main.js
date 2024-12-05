import './styles/main.css';
import Day from './components/day'
import Header from './components/header';
import DayTitle from './components/dayTitle';
import Months from './components/months';
import React, { useState, useEffect  } from 'react';
import AddInfo from './components/addInfo';
import { getFirestore, doc, collection, setDoc, getDocs, deleteDoc, query, getDoc, where, documentId} from "firebase/firestore"; 
import { db } from '../../config/firestore';
import loadingImg from '../../images/loading.gif'

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];

function Main() {

 

  const todayDate = new Date();
  const todayDay = todayDate.getDate();
  const todayMonth = todayDate.getMonth();
  const todayYear = todayDate.getFullYear();

  const [displayedYear, setDisplayedYear] = useState(todayYear);
  const [displayedMonth, setDisplayedMonth] = useState(todayMonth);
  const [displayedFullMonth, setDisplayedFullMonth] = useState([]);
  const [isFlex, setIsFlex] = useState(false);
  const [clickedDayKey, setClickedDayKey] = useState(1);
  const [dayBalanceHash, setDayBalanceHash] = useState( new Map());
  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {

    
  
    const firstDay = new Date(months[displayedMonth] + ' 1, ' + displayedYear).getDay();
    const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
    let startEpoch = Math.floor(Date.UTC(displayedYear, displayedMonth, 1, 0, 0, 0) / 1000);
    let newFullMonth = [];

 


    for (let i = 1; i <= firstDay + daysInMonth; i++) {

      if (i <= firstDay) {
        newFullMonth.push(<Day key={i} dayType={"PlaceHolder"} />);
      } 
      else {
        const realDayVal = i - firstDay;
     

        const handleDayClick = () => {
 
          setIsFlex((prevIsFlex) => !prevIsFlex);
          setClickedDayKey(realDayVal)
        };

          let dayBalance = dayBalanceHash.get(startEpoch) || 0;

          if(dayBalance >= 0){
            
        
            newFullMonth.push(<Day key={i} dayType={"RealDay"} date={realDayVal} todayDay={todayDay} todayMonth={todayMonth} todayYear={todayYear} currentMonth={displayedMonth} currentYear={displayedYear} posNeg={""} balance={dayBalance} onClick={() => handleDayClick()}/>);
          }
          else{
            newFullMonth.push(<Day key={i} dayType={"RealDay"} date={realDayVal} todayDay={todayDay} todayMonth={todayMonth} todayYear={todayYear} currentMonth={displayedMonth} currentYear={displayedYear} posNeg={"Negative"} balance={dayBalance} onClick={() => handleDayClick()}/>);
          }

          startEpoch += 86400;
      
  
      }
    }

 
    setIsLoading(false);
    setDisplayedFullMonth(newFullMonth)
   

    
  }, [dayBalanceHash]);

  useEffect(() => {
  
    getAllDays();
  }, []);

  useEffect(() => {
  
    getAllDays();
  }, [displayedMonth]);


  async function getAllDays(){

  setIsLoading(true);

  const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();
  const startEpoch = Math.floor(Date.UTC(displayedYear, displayedMonth, 1, 0, 0, 0) / 1000);
  const endEpoch = Math.floor(Date.UTC(displayedYear, displayedMonth, daysInMonth, 0, 0, 0) / 1000);

  console.log("start: " + startEpoch)
  console.log("end: " + endEpoch)

    const datesCollection = collection(db, "users", "YhdHXK0HiGPw0ClC1Ste", "dates");

    const dateQuery = query(
      datesCollection,
      where(documentId(), ">=", startEpoch.toString()),
      where(documentId(), "<=", endEpoch.toString())
    );

    const monthQuery = await getDocs(dateQuery);



    let currentEpochDay = startEpoch

    const dateBalanceMap = new Map();

    monthQuery.forEach(doc => {

      const data = doc.data();

      if (data.entriesSum) {

        console.log("id: " + doc.id + " bal: " + data.entriesSum)
        

        dateBalanceMap.set(parseInt(doc.id), data.entriesSum);
     
      }

      currentEpochDay += 86400;
    });

    setDayBalanceHash(dateBalanceMap);



  }



  const handleDayClick = () => {
 
    setIsFlex((prevIsFlex) => !prevIsFlex);
  };

  const handleCancledClicked = () => {
    setIsFlex(false);

    getAllDays();
  };

  //go to next month
  const increaseMonth = () => {

    setDisplayedMonth((prevMonth) => {
      if (prevMonth === 11) {
        setDisplayedYear((prevYear) => prevYear + 1);
        return 0;
      }

      
      return prevMonth + 1;
    });

    
  };


  //go to previous month
  const decreaseMonth = () => {

    setDisplayedMonth((prevMonth) => {
      if (prevMonth === 0) {
        setDisplayedYear((prevYear) => prevYear - 1); 
        return 11; 
      }

      return prevMonth - 1;
    });

    
  };



  return (
    <div className="mainDiv">

        <Header/>
        <Months previousMonth={decreaseMonth} nextMonth={increaseMonth} displayedMonth={displayedMonth} displayedYear={displayedYear}/>
        <DayTitle />

        {isLoading ? (


          <div className='monthLoadingDiv'>
                <h1>Loading...</h1>
          </div>


        ) : (

        <div className="allDays">{displayedFullMonth}</div>

        )}

        <div className='background' style={{ display: isFlex ? 'flex' : 'none' }} onClick={() => {if (!isFlex) handleDayClick(); }}>

          <AddInfo displayedDay={clickedDayKey} displayedMonth={displayedMonth} displayedYear={displayedYear} isFlex={isFlex} cancleClicked={handleCancledClicked} />
        </div>

        

    </div>

    
  );
}

export default Main;