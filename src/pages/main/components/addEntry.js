import '../styles/addEntry.css'

function AddEntry() {
    return (

      <div className="addEntryMain">

        <div className='linebreak'></div>

      

        <form id="form">


            <div className='inputsDiv'>

                <div id="amountInputDiv">
                            <label for="amountInput" id="amountLabel">Amount</label>
                            <input type="number" id="amountInput" name="amountInput" min="0" step="0.01" required placeholder="amount"></input>
                </div>

                <div id="descriptionInputDiv">
                    <label for="descriptionInput" id="descriptionLabel">Description </label>
                    <input type="text" id="descriptionInput" name="descriptionInput" required placeholder="e.g. &quot;pizza&quot;"></input>
                </div>

      
            </div>

            <div id="expenseIncomeButtonDiv">

                
                <button id="incomeButton" class="inactive" type="button">Income</button>
                <button id="expenseButton" class="active" type="button">Expense</button>


               
            </div>
            
            <div id="addButtonDiv">
                <button id="addButton" type="submit">Add</button>
            </div>

            
        </form>

        
        
        
          
         
      </div>
    );
  }
  
  export default AddEntry;

  /*
  
              <div id="writtenDiv">
                        <div id="amountInputDiv">
                            <label for="amountInput" id="amountLabel">Amount</label><br>
                            <input type="number" id="amountInput" name="amountInput" min="0" step="0.01" required placeholder="amount"><br>
                        </div>
                    
                        
                        <div id="descriptionInputDiv">
                            <label for="descriptionInput" id="descriptionLabel">Description </label><br>
                            <input type="text" id="descriptionInput" name="descriptionInput" required placeholder="e.g. &quot;pizza&quot;"><br>
                        </div>
                </div>

                <div id="expenseIncomeButtonDiv">

                        <button id="incomeButton" class="inactive" type="button">Income</button>
                        <button id="expenseButton" class="active" type="button">Expense</button>
                        <button id="addButton" type="submit">Add</button>

                    </div>
  */