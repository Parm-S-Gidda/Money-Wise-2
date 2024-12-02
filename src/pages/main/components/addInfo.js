import '../styles/addinfo.css'
import AddEntry from './addEntry';
import Record from './record';

const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];

function AddInfo({displayedDay, displayedMonth, displayedYear}) {

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(displayedYear, displayedMonth, displayedDay);
  const dayIndex = date.getDay();    
   
    

    return (
      <div className="addInfoMainDiv">

        <div className='addInfoDiv'>

          <h1 id="addInfoDate">{daysOfWeek[dayIndex]} {months[displayedMonth]} {displayedDay}, {displayedYear}</h1>

          <AddEntry/>
          <div className='recordList'>

            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />
            <Record />

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