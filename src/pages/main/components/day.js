import '../styles/day.css'
import Balance from './balance';

function Day({dayType, date, todayDay, todayMonth, todayYear, currentMonth, currentYear, posNeg, onClick, balance, hasEntries}) {

  let currentDay;

  

  
    //Add place holder day to grid
    if(dayType === "PlaceHolder"){

      return (<div className="placeHolderDay"> </div>);
      
    }

    //Add Actual day of week to grid
    else if(dayType === "RealDay"){

    
    

      if(todayDay === date && todayMonth === currentMonth && todayYear === currentYear){

        if(posNeg === "Positive"){

          currentDay = <div className="masterDivPositive"> <div className="numberDivTodayPositive">{date}</div> <Balance posNeg={posNeg} balance={balance} hasEntries={hasEntries}/> </div>
        }
        else if(posNeg === "Negative"){
          currentDay = <div className="masterDivNegative"> <div className="numberDivTodayNegative">{date}</div> <Balance hasEntries={hasEntries} posNeg={posNeg} balance={balance} /></div>

        }
        else{
          currentDay = <div className="masterDiv"> <div className="numberDivToday">{date}</div> <Balance hasEntries={hasEntries}  posNeg={posNeg} balance={balance}/></div>
        }
      
      }
      else{

       

        if(posNeg === "Positive"){

   

          currentDay = <div className="masterDivPositive"> <div className="numberDivRegular">{date}</div><Balance hasEntries={hasEntries} posNeg={posNeg} balance={balance}/>  </div>

        }
        else if(posNeg === "Negative"){

          currentDay = <div className="masterDivNegative"> <div className="numberDivRegular">{date}</div> <Balance hasEntries={hasEntries}  posNeg={posNeg} balance={balance}/> </div>

        }
        else{
          currentDay = <div className="masterDiv"> <div className="numberDivRegular">{date}</div> <Balance hasEntries={hasEntries}  posNeg={posNeg} balance={balance}/> </div>
        }
        
      
      }

      return (
        
  
        <div className="main" onClick={onClick}>{currentDay}</div>
            
           
       
      );
      
    }

  }
  
  export default Day;