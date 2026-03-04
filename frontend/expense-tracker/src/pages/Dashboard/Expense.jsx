import React, { useEffect, useState, useCallback } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/Modal";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false); // Prevents spamming buttons

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Memoized fetch function
  const fetchExpenseDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE,
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch expense data.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Enhanced Validations
    if (!category?.trim()) return toast.error("Category is required.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return toast.error("Invalid amount.");
    if (!date) return toast.error("Date is required.");

    setActionLoading(true);
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category: category.trim(),
        amount: Number(amount),
        date,
        icon: icon || "default-icon",
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully.");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding expense");
    } finally {
      setActionLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    setActionLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting expense");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Expense_Report_${new Date().getTime()}.xlsx`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading report.", error.message);
      toast.error("Failed to download report. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, [fetchExpenseDetails]);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto max-w-7xl px-4 md:px-0">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)} 
          />

          <ExpenseList
            transactions={expenseData}
            isLoading={loading}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        {/* Add Modal */}
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm
            onAddExpense={handleAddExpense}
            isLoading={actionLoading}
          />
        </Modal>

        {/* Delete Modal */}
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense detail?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            isLoading={actionLoading}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
