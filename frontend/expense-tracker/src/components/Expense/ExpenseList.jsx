import React, { useMemo } from "react";
import { LuDownload, LuInbox } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions = [], onDelete, onDownload }) => {
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
  }, [transactions]);

  const hasData = sortedTransactions.length > 0;

  return (
    <div className="card p-4 md:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h5 className="text-lg font-bold text-gray-800 leading-tight">
            All Expenses
          </h5>
          <p className="text-xs text-gray-500 font-medium">
            {hasData
              ? `Showing ${sortedTransactions.length} expenses`
              : "No records found"}
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-150 overflow-y-auto pr-1 custom-scrollbar">
          {sortedTransactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category} // Note: Expense usually uses 'category'
              icon={expense.icon}
              date={moment(expense.date).format("DD MMM YYYY")}
              amount={expense.amount}
              type="expense" // Pass type so card can style red vs green
              onDelete={() => onDelete(expense._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <div className="p-4 bg-gray-50 rounded-full mb-4">
            <LuInbox className="text-4xl opacity-50" />
          </div>
          <p className="text-sm font-semibold text-gray-600">
            No expenses recorded yet
          </p>
          <p className="text-xs mt-1 text-gray-400">
            Add your first expense to see it here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
