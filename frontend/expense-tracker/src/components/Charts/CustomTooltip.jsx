import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    // The "fill" property is automatically passed from the Pie's Cell colors
    const color = payload[0].payload.fill || "#875CF5"; 

    return (
      <div className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100 min-w-35">
        {/* Top colored indicator bar */}
        <div style={{ backgroundColor: color }} className="h-1 w-full" />
        
        <div className="p-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {payload[0].name}
          </p>
          <p className="text-sm font-semibold text-gray-900">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
