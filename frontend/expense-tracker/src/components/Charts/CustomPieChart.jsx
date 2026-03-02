import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100} 
            innerRadius={80}
            paddingAngle={2}
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
          
          <Legend content={<CustomLegend />} verticalAlign="bottom" />

          {showTextAnchor && (
            <g>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle" 
              >
                <tspan 
                  x="50%" 
                  dy="-1.2em" 
                  fill="#6b7280" 
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  {label}
                </tspan>
                <tspan 
                  x="50%" 
                  dy="1.5em" 
                  fill="#111827" 
                  style={{ fontSize: "20px", fontWeight: "700" }}
                >
                  {totalAmount}
                </tspan>
              </text>
            </g>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
