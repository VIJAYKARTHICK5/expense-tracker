import { useState, useEffect } from "react";
import Header from "./components/Header";
import ExpenseList from "./components/ExpenseList";
import AddExpenseForm from "./components/AddExpenseForm";
import MonthFilter from "./components/MonthFilter";
import { db } from "./db";
import ExpenseCharts from "./components/ExpenseCharts";
import ExportButtons from "./components/ExportButtons";
import './App.css';


function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // ✅ Load expenses from IndexedDB on first mount
  useEffect(() => {
    const loadExpenses = async () => {
      const allExpenses = await db.expenses.toArray();
      setExpenses(allExpenses.map((exp) => ({
        ...exp,
        date: new Date(exp.date),
      })));
    };
    loadExpenses();
  }, []);

  // ✅ Add to Dexie DB and React state
  const handleAddExpense = async (expense) => {
    const id = await db.expenses.add(expense);
    setExpenses([{ ...expense, id }, ...expenses]);
  };

  // ✅ Delete from Dexie DB and React state
  const handleDeleteExpense = async (id) => {
    await db.expenses.delete(id);
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const handleFilterChange = (type, value) => {
    if (type === "month") setSelectedMonth(value);
    if (type === "year") setSelectedYear(value);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    return (
      date.getMonth() === selectedMonth &&
      date.getFullYear() === selectedYear
    );
  });

  const totalThisMonth = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
  <div className="container">
    <Header />
    <AddExpenseForm onAdd={handleAddExpense} />
    <MonthFilter
      selectedMonth={selectedMonth}
      selectedYear={selectedYear}
      onChange={handleFilterChange}
    />
    <h2>
      💰 Total for {selectedMonth + 1}/{selectedYear}: ${totalThisMonth.toFixed(2)}
    </h2>
    <ExportButtons expenses={filteredExpenses} />
    <ExpenseList expenses={filteredExpenses} onDelete={handleDeleteExpense} />
    <ExpenseCharts expenses={filteredExpenses} />
  </div>
);

}

export default App;
