import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { detailsexpense } from "./redux/expenseSlicer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DetailsExpense = () => {
  const params = useParams();
  const ex = useSelector((state) =>
    state.expense.items.find((item) => item.expenseId == params.id),
  );
  return (
    <div>
      <table border={1}>
        <tr>
          <th>Amount</th>
          <th>Description</th>
          <th>Category</th>
        </tr>
        <tr>
          <td>{ex.amount}</td>
          <td>{ex.description}</td>
          <td>{ex.categoryId}</td>
        </tr>
      </table>
      <Link to={`/`}>Back</Link>
    </div>
  );
};
export default DetailsExpense;
