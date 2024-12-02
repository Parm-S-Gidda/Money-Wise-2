import '../styles/balance.css'
import React, { useState, useEffect  } from 'react';



function Balance({posNeg, balance, hasEntries}) {

    const [displayBalance, setDisplayBalance] = useState("+$0");

    useEffect(() => {
        if (posNeg === "Negative") {
            setDisplayBalance("-$" + Math.abs(balance));
        } else {
            setDisplayBalance("+$" + Math.abs(balance));
        }
    }, [posNeg, balance]);
    

    if(hasEntries){

        return (
            <div className="balacneMain">
                {posNeg === "Negative" ? (
                    <div className="balanceRealNegative">
                        <h1>{displayBalance}</h1>
                    </div>
                ) : (
                    <div className="balanceRealPositive">
                        <h1>{displayBalance}</h1>
                    </div>
                )}
            </div>
        );

    }
    else{
        
        return (
            <div className="balacneMain">
                {posNeg === "Negative" ? (
                    <div className="balanceReal">
                        <h1>{displayBalance}</h1>
                    </div>
                ) : (
                    <div className="balanceReal">
                        <h1>{displayBalance}</h1>
                    </div>
                )}
            </div>
        );
    }

  


  }
  
  export default Balance;