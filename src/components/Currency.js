import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import "bootstrap/dist/css/bootstrap.min.css";

const Currency = () => {
   const { dispatch, currency } = useContext(AppContext);

   const submitEvent = (currCode) => {
      dispatch({
         type: "CHG_CURRENCY",
         payload: currCode
      });
   }

   return (
      <div className='alert alert-secondary'>
      <select
         className="custom-select form-control list-currencies"
         id="inputGroupSelect04"
         onChange={(event) => submitEvent(event.target.value)}
      >
         <option value="$" name="dollar">
         $ Dollar
         </option>
         <option value="£" name="pound">
         £ Pound
         </option>
         <option value="€" name="euro">
         € Euro
         </option>
         <option value="₹" name="rupee">
         ₹ Rupee
         </option>
      </select>
      </div>
  );
}
export default Currency;
