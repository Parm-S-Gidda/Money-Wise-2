import '../styles/months.css'

const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];

function Months({previousMonth, nextMonth, displayedMonth, displayedYear}) {
    

    return (
      <div className="monthsTitleDiv">

        <div className="months">
            <h1 className="monthsYear">{months[displayedMonth]}</h1>
            <h1 className="monthsYear">{displayedYear}</h1>
        </div>
        <div className="forwardBack">
            <button id="back" className="forwardBackButton" onClick={previousMonth}>{"<"} </button>
            <button id="forward" className="forwardBackButton" onClick={nextMonth}>{">"}</button>  
      </div>
        
        
          
         
      </div>
    );
  }
  
  export default Months;