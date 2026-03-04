import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center">
          <div
            className="rounded-full"
            style={{ 
              backgroundColor: entry.color, 
              width: "10px", 
              height: "10px" 
            }}
          ></div>

          <span
            style={{
              color: "#64748b",
              fontSize: "15px",
              fontWeight: "500",
              paddingLeft: "5px",
            }}
          >
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
