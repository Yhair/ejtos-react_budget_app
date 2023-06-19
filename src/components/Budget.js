import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
   const { dispatch, budget, currency } = useContext(AppContext);
   const [value, setValue] = useState(budget);

   const { expenses } = useContext(AppContext);
   const totalExpenses = expenses.reduce((total, item) => {
      return (total += item.cost);
   }, 0);

   const submitEvent = (value) => {
      if (value === "" || isNaN(value) || isNaN(parseInt(value))) {
         alert("Please enter a valid number!");
         setValue(budget);
         return;
      }
      const budgetValue = parseInt(value);
      if (budgetValue < totalExpenses) {
         alert("The budget cannot be less than amount spent £" + totalExpenses);
         setValue(budget);
         return;
      }
      if (budgetValue > 20000) {
         alert("The budget cannot be greater than £ 20,000 ");
         setValue(budget);
         return;
      }
      dispatch({
         type: "SET_BUDGET",
         payload: budgetValue,
      });
   };

   const handleBlur = () => {
      submitEvent(value);
   };

   return (
      <div className="alert alert-secondary">
         <span>Budget: {currency}</span>
         <input
            required="required"
            type="number"
            step={10}
            id="budget"
            value={value}
            style={{ marginLeft: "0.5rem", size: 10, width: "120px" }}
            onChange={(event) => setValue(event.target.value)}
            onBlur={handleBlur}
         ></input>
      </div>
   );
};
export default Budget;
