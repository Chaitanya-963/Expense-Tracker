import React, { useMemo } from "react";
import { LuDownload, LuInbox } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions]);

  const hasData = sortedTransactions.length > 0;

  return (
    <div className="card p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h5 className="text-lg font-bold text-gray-800 leading-tight">Income Sources</h5>
          <p className="text-xs text-gray-500 font-medium">
            Showing {sortedTransactions.length} entries
          </p>
        </div>
        
        {hasData && (
          <button 
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-primary bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg transition-all active:scale-95" 
            onClick={onDownload}
          >
            <LuDownload className="text-base" /> Download
          </button>
        )}
      </div>

      {hasData ? (
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-150 overflow-y-auto pr-1 scrollbar-thin">
          {sortedTransactions.map((income) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("DD MMM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))}
        </div>
      ) : (
        // User-friendly empty state
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <div className="p-3 bg-gray-50 rounded-full mb-3">
            <LuInbox className="text-3xl" />
          </div>
          <p className="text-sm font-medium">No income records found</p>
          <p className="text-xs">Try adding your first income source above.</p>
        </div>
      )}
    </div>
  );
};

export default IncomeList;
