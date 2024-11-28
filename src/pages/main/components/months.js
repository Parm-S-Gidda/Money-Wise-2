import '../styles/months.css'

function Months() {
    return (
      <div className="monthsTitleDiv">

        <div className="months">
            <h1 className="monthsYear">November</h1>
            <h1 className="monthsYear">2024</h1>
        </div>
        <div className="forwardBack">
            <button id="back" className="forwardBackButton">{"<"} </button>
            <button id="forward" className="forwardBackButton">{">"}</button>  
      </div>
        
        
          
         
      </div>
    );
  }
  
  export default Months;