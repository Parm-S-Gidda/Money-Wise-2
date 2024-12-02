import '../styles/record.css'

const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];

function Record() {

    return (
      <div className="recordMainDiv">

        <div className='deleteButtonDiv'>
            <button className='deleteButton'>X</button>
        </div>

        <div className='valueDiv'>+$500</div>

        <div className='discription'>Pizza Party</div>

     

      
      </div>
    );
  }
  
  export default Record;