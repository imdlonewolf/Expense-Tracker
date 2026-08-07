import axios from "axios";
import { useEffect, useState } from "react";
import AddExpense from "./AddExpense";
import { Link } from "react-router-dom";
const ExpenseList = () => {
  let [Expense, SetExpense] = useState([]);
  let [Loading, SetLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://localhost:7273/Expense/GetAllExpenses/2")
      .then((response) => {
        console.log(response.data);
        SetExpense(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {Expense.length ? (
        <table border={1}>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {Expense.map((x) => {
              return (
                <tr key={x.expenseId}>
                  <td>{x.amount}</td>
                  <td>{x.description}</td>
                  <td>{x.categoryId}</td>
                  <td>
                    <Link to={`details/${x.expenseId}`}>Details</Link>
                  </td>
                  <td>
                    <Link to={`update/${x.expenseId}`}>Update</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      ) : (
        "No expenses Found"
      )}
      <Link to={`add`}>Add New Expense</Link>
      
    </div>
  );
};
export default ExpenseList;
