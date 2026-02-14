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
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          paddingAngle={0.5}
          isAnimationActive={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          content={CustomTooltip}
          cursor={{ fill: "transparent" }}
          // contentStyle={{
          //   backgroundColor: "#fff",
          //   borderRadius: "8px",
          //   border: "none",
          //   boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          // }}
          // itemStyle={{ color: "#333", fontSize: "14px" }}
          // labelStyle={{ fontWeight: "bold", color: "#875CF5" }}
          // cursor={{ fill: "transparent" }}
        />
        <Legend
        content={CustomLegend}
        />
        {showTextAnchor && (
          <g>
            <text
              x="50%"
              y="50%"
              dy={-20}
              textAnchor="middle"
              fill="#666"
              style={{ fontSize: "14px", pointerEvents: "none" }}
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              style={{
                fontSize: "24px",
                fontWeight: "600",
                pointerEvents: "none",
              }}
            >
              {totalAmount}
            </text>
          </g>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
