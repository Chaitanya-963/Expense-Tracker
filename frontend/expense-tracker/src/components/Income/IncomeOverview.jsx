import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  // ADD THIS GUARD (similar to your Expense component)
  if (!transactions || transactions.length === 0) {
    return (
      <div className="card text-center p-10 text-gray-400">
        No income data available.
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-xs text-slate-400">Track your income sources</p>
        </div>

        <button
          className="add-btn flex items-center gap-2"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          Add Income
        </button>
      </div>
      <div className="mt-8">
        <CustomBarChart data={chartData} xAxisKey="date" />
      </div>
    </div>
  );
};

export default IncomeOverview;
