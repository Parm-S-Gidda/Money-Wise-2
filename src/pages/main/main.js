import './styles/main.css';
import Day from './components/day'
import Header from './components/header';
import DayTitle from './components/dayTitle';
import Months from './components/months';
import React, { useState, useEffect  } from 'react';
import AddInfo from './components/addInfo';

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

  useEffect(() => {

 
    const firstDay = new Date(months[displayedMonth] + ' 1, ' + displayedYear).getDay();
    const daysInMonth = new Date(displayedYear, displayedMonth + 1, 0).getDate();

    let newFullMonth = [];

    const handleDayClick = () => {
 
      setIsFlex((prevIsFlex) => !prevIsFlex);
    };


    for (let i = 1; i <= firstDay + daysInMonth; i++) {
      if (i <= firstDay) {
        newFullMonth.push(<Day key={i} dayType={"PlaceHolder"} />);
      } else {
        const realDayVal = i - firstDay;

        if(realDayVal % 3 == 0){
          newFullMonth.push(<Day key={i} dayType={"RealDay"} date={realDayVal} todayDay={todayDay} todayMonth={todayMonth} todayYear={todayYear} currentMonth={displayedMonth} currentYear={displayedYear} posNeg={"Positive"} onClick={() => handleDayClick()}/>);
        }
        else if(realDayVal % 2 == 0){
          newFullMonth.push(<Day key={i} dayType={"RealDay"} date={realDayVal} todayDay={todayDay} todayMonth={todayMonth} todayYear={todayYear} currentMonth={displayedMonth} currentYear={displayedYear} posNeg={"Negative"} onClick={() => handleDayClick()}/>);
        }
        else{
          newFullMonth.push(<Day key={i} dayType={"RealDay"} date={realDayVal} todayDay={todayDay} todayMonth={todayMonth} todayYear={todayYear} currentMonth={displayedMonth} currentYear={displayedYear} posNeg={""} onClick={() => handleDayClick()}/>);
        }
        
      }
    }

    setDisplayedFullMonth(newFullMonth)

    
  }, [displayedMonth, displayedYear]);

  const handleDayClick = () => {
 
    setIsFlex((prevIsFlex) => !prevIsFlex);
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


        <div className="allDays">{displayedFullMonth}</div>

        <div className='background' style={{ display: isFlex ? 'flex' : 'none' }} onClick={handleDayClick}>

          <AddInfo></AddInfo>
        </div>

        

    </div>

    
  );
}

export default Main;