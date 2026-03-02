import React, { useMemo } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const chartData = useMemo(() => {
    return data ? prepareExpenseBarChartData(data) : [];
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="card col-span-1 p-10 text-center text-gray-400">
        No expense data available for the last 30 days.
      </div>
    );
  }

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
