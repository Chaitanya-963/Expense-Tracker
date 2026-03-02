import React, { useMemo } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

// Map colors to represent status: Purple for Balance, Red for Expense, Orange for Income
const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  // useMemo prevents recalculation on every parent re-render
  const balanceData = useMemo(() => {
    return [
      { name: "Total Balance", amount: Number(totalBalance) || 0 },
      { name: "Total Expenses", amount: Number(totalExpense) || 0 },
      { name: "Total Income", amount: Number(totalIncome) || 0 },
    ].filter((item) => item.amount > 0);
  }, [totalBalance, totalIncome, totalExpense]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      {balanceData.length > 0 ? (
        <CustomPieChart
          data={balanceData}
          label="Balance"
          totalAmount={`₹${totalBalance}`}
          colors={COLORS}
          showTextAnchor
        />
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No financial data to display
        </div>
      )}
    </div>
  );
};

export default FinanceOverview;
