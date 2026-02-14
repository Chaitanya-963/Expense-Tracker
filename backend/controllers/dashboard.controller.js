const Income = require("../models/Income.js");
const Expense = require("../models/Expense.js");
const { isValidObjectId, Types } = require("mongoose");

// Add Expense

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income and expense
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("totalIncome", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Get income transaction in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income for last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    // Get expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total expenses for last 30 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );

    // Fetch last 5 transactions (income + expenses)

    // ✅ DO THIS INSTEAD
    const last5Incomes = await Income.find({ userId })
      .sort({ date: -1 })
      .limit(5);
    const last5Expenses = await Expense.find({ userId })
      .sort({ date: -1 })
      .limit(5);

    const lastTransactions = [
      ...last5Incomes.map((txn) => ({ ...txn.toObject(), type: "income" })),
      ...last5Expenses.map((txn) => ({ ...txn.toObject(), type: "expense" })),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5); // Take the top 5 of the combined list

    // Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
