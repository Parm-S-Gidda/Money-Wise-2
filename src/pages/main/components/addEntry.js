import '../styles/addEntry.css'
import React, { useState } from 'react';

function AddEntry({ onAddRecord,  addToTotal}) {
    const [activeButton, setActiveButton] = useState('expense');
    const [amount, setAmount] = useState(""); 
    const [description, setDescription] = useState("");

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    const addClicked = (e) => {
        e.preventDefault();

        let parsedAmount = parseFloat(parseFloat(amount).toFixed(2));
        const timeAdded = Math.floor(new Date().getTime() / 1000);

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert("Please input an amount greater than $0.00");
            setAmount(""); 
            return;
        }

        if (description.trim() === "") {
            alert("Please add a description");
            return;
        }

        if(activeButton === "expense"){
            parsedAmount *= -1
        }

       
 

        const newRecord = {
            amount: parsedAmount, 
            description, 
            timeAdded
        };

        onAddRecord(newRecord, timeAdded);
        addToTotal(parsedAmount)

     
        setAmount("");
        setDescription("");
       
    };

    return (
        <div className="addEntryMain">
            <div className="linebreak"></div>
            <form id="form">
                <div className="inputsDiv">
                    <div id="amountInputDiv">
                        <label htmlFor="amountInput" id="amountLabel">Amount</label>
                        <input
                            type="number"
                            id="amountInput"
                            name="amountInput"
                            min="0"
                            step="0.01"
                            required
                            placeholder="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)} 
                        />
                    </div>
                    <div id="descriptionInputDiv">
                        <label htmlFor="descriptionInput" id="descriptionLabel">Description</label>
                        <input
                            type="text"
                            id="descriptionInput"
                            name="descriptionInput"
                            required
                            placeholder='e.g. "pizza"'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div id="expenseIncomeButtonDiv">
                    <button
                        id="incomeButton"
                        className={activeButton === 'income' ? 'active' : 'inactive'}
                        type="button"
                        onClick={() => handleButtonClick('income')}
                    >
                        Income
                    </button>
                    <button
                        id="expenseButton"
                        className={activeButton === 'expense' ? 'active' : 'inactive'}
                        type="button"
                        onClick={() => handleButtonClick('expense')}
                    >
                        Expense
                    </button>
                </div>
                <div id="addButtonDiv">
                    <button id="addButton" type="button" onClick={addClicked}>
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddEntry;