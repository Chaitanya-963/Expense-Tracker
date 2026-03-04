import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// const CustomBarChart = ({ data }) => {
//   // Function to alternate colors
//   const getBarColor = (index) => {
//     return index % 2 === 0 ? "#06b6d4" : "#a5f3fc";
//   };
//   const CustomTooltip = ({ active, payload }) => {
//     if (!active || !payload?.length) return null;

//     const { category, amount } = payload[0].payload;
//     return (
//       <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
//         <p className="text-xs font-semibold text-cyan-800 mb-1">{category}</p>
//         <p className="text-xs text-gray-600">
//           Amount:{" "}
//           <span className="text-sm font-medium text-gray-900">₹{amount}</span>
//         </p>
//       </div>
//     );
//   };
//   return (
//     <div className="bg-white mt-6">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={data}>
//           <CartesianGrid stroke="none" />

//           <XAxis
//             dataKey="month"
//             tick={{ fontSize: 12, fill: "#555" }}
//             stroke="none"
//           />
//           <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

//           <Tooltip content={CustomTooltip} />

//           <Bar
//             dataKey="amount"
//             fill="#FF8042"
//             radius={[10, 10, 0, 0]}
//             activeBar={{ fill: "#0891b2" }}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={getBarColor(index)} />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };




const CustomBarChart = ({ data, xAxisKey = "category" }) => { // Default to category
  const getBarColor = (index) => (index % 2 === 0 ? "#06b6d4" : "#a5f3fc");

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    // Use the dynamic key from the data object
    const label = payload[0].payload[xAxisKey]; 
    const amount = payload[0].payload.amount;

    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-cyan-800 mb-1">{label}</p>
        <p className="text-xs text-gray-600">
          Amount: <span className="text-sm font-medium text-gray-900">₹{amount}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey={xAxisKey} // DYNAMIC KEY
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#555" }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip content={CustomTooltip} cursor={{fill: '#f5f5f5'}} />
          <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;