import React, { useMemo } from 'react'; // Swap useEffect/useState for useMemo
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#06b6d4", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  // Directly derive the data. No setState = No warning!
  const chartData = useMemo(() => {
    return data?.map((item) => ({
      name: item?.source || "Unknown",
      amount: Number(item?.amount) || 0,
    })) || [];
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>
      
      {chartData.length > 0 ? (
        <CustomPieChart 
          data={chartData} 
          label="Total Income"
          totalAmount={`₹${totalIncome}`}
          showTextAnchor 
          colors={COLORS} 
        />
      ) : (
        <div className="p-10 text-center text-gray-400">No data found</div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
