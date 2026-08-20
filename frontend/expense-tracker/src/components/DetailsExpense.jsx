import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { detailsexpense } from "./redux/expenseSlicer";
import { useSelector } from "react-redux";

const DetailsExpense = () => {
  const params=useParams()
   const ex=useSelector(state=>state.expense.items.find(item=>item.expenseId==params.id))
  return (
    <div>
      <form action="">
        <input type="text" value={ex.amount} />
        <input type="text" value={ex.description} />
        <input type="text" value={ex.categoryId} />
      </form>
    </div>
  );
};
export default DetailsExpense;
