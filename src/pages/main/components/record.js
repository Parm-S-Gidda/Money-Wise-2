import '../styles/record.css';
import { useState, useEffect } from 'react';

function Record({record, removeRecord, index, removeFromTotal}) {
  const [value, setValue] = useState(""); 

  useEffect(() => {
   
      if (record.amount >= 0) {
        setValue("+$" + record.amount.toFixed(2));
      } else {
        setValue("-$" + Math.abs(record.amount).toFixed(2));
      }

  }, [record.amount]);

  const removeIndex = () => {

    console.log("remove at: " + index)
    removeRecord(index, record.timeAdded)
    removeFromTotal(record.amount)
  }

  return (
    <div className="recordMainDiv">
      <div className="deleteButtonDiv">
        <button className="deleteButton" onClick={removeIndex}>X</button>
      </div>
      <div className="valueDiv">{value}</div>
      <div className="descriptionDiv">{record.description}</div>
    </div>
  );
}

export default Record;