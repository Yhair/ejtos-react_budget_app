import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AllocationForm = (props) => {
   const { dispatch, remaining, currency } = useContext(AppContext);
   const [name, setName] = useState("");
   const [cost, setCost] = useState("");
   const [action, setAction] = useState("");

   const submitEvent = () => {
      if (cost === "" || isNaN(cost) || isNaN(parseInt(cost))) {
         alert("Please enter a valid number!");
         setCost("");
         return;
      }
      const costValue = parseInt(cost);
      const expense = {
         name: name,
         cost: costValue,
      };
      if (action === "Reduce") {
         if (-1*costValue > remaining) {
            alert("The value cannot exceed remaining funds " + currency + " " + remaining);
            setCost("");
            return;
         }
         dispatch({
            type: "RED_EXPENSE",
            payload: expense,
         });
      } else {
         if (costValue > remaining) {
            alert("The value cannot exceed remaining funds " + currency + " " + remaining);
            setCost("");
            return;
         }
         dispatch({
            type: "ADD_EXPENSE",
            payload: expense,
         });
      }
   };

   const handleChangeBudget = (event) => {
      if (event.target.value === "" || isNaN(event.target.value) || isNaN(parseInt(event.target.value))) {
         setCost("");
         return;
      }
      setCost(event.target.value);
   }

   return (
      <div>
         <div className="row">
            <div className="input-group mb-3" style={{ marginLeft: "2rem" }}>
               <div className="input-group-prepend">
                  <label
                     className="input-group-text"
                     htmlFor="inputGroupSelect01"
                  >
                     Department
                  </label>
               </div>
               <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  onChange={(event) => setName(event.target.value)}
               >
                  <option defaultValue>Choose...</option>
                  <option value="Marketing" name="marketing">Marketing</option>
                  <option value="Sales" name="sales">Sales</option>
                  <option value="Finance" name="finance">Finance</option>
                  <option value="Human Resource" name="humanresource">Human Resource</option>
                  <option value="IT" name="it">IT</option>
                  <option value="Admin" name="admin">Admin</option>
               </select>
               <div
                  className="input-group-prepend"
                  style={{ marginLeft: "2rem" }}
               >
                  <label
                     className="input-group-text"
                     htmlFor="inputGroupSelect02"
                  >
                     Allocation
                  </label>
               </div>
               <select
                  className="custom-select"
                  id="inputGroupSelect02"
                  onChange={(event) => setAction(event.target.value)}
               >
                  <option defaultValue value="Add" name="Add">
                     Add
                  </option>
                  <option value="Reduce" name="Reduce">
                     Reduce
                  </option>
               </select>
               <label className="m-2" htmlFor="cost">{currency}</label>
               <input 
                  required="required"
                  type="number"
                  id="cost"
                  value={cost}
                  style={{ marginLeft: "0.5rem", size: 10 }}
                  onChange={handleChangeBudget}
               ></input>
               <button
                  className="btn btn-primary"
                  onClick={submitEvent}
                  style={{ marginLeft: "2rem" }}
               >
                  Save
               </button>
            </div>
         </div>
      </div>
   );
};
export default AllocationForm;
