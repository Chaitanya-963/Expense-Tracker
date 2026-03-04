import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete, 
}) => {
  // Simplified styling logic
  const isIncome = type === "income";
  const amountColorClass = isIncome 
    ? "bg-green-50 text-green-600" 
    : "bg-red-50 text-red-600";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl transition-all hover:bg-gray-50 border border-transparent hover:border-gray-100">
      {/* Icon Container */}
      <div className="w-11 h-11 flex shrink-0  items-center justify-center text-xl text-gray-600 bg-gray-100 rounded-full overflow-hidden">
        {icon ? (
          <img src={icon} alt={title} className="w-full h-full object-cover" />
        ) : (
          <LuUtensils size={20} />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="truncate">
          <p className="text-sm text-gray-800 font-semibold truncate">{title}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{date}</p>
        </div>

        <div className="flex items-center gap-3">
          {!hideDeleteBtn && (
            <button
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
              onClick={onDelete} // Now correctly references the prop
              title="Delete Transaction"
            >
              <LuTrash2 size={16} />
            </button>
          )}

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${amountColorClass}`}>
            <span className="text-xs font-bold">
              {isIncome ? "+" : "-"} ₹{amount}
            </span>
            {isIncome ? <LuTrendingUp size={14} /> : <LuTrendingDown size={14} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
