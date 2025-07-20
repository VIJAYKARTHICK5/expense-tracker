// src/components/ExpenseCharts.jsx
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#FF6F91"];

const ExpenseCharts = ({ expenses }) => {
  // ✅ Pie chart data by category
  const categoryData = expenses.reduce((acc, expense) => {
    const category = expense.description || "Other";
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.value += expense.amount;
    } else {
      acc.push({ name: category, value: expense.amount });
    }
    return acc;
  }, []);

  // ✅ Bar chart data by month
  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "short" }),
    total: 0,
  }));

  expenses.forEach((expense) => {
    const monthIndex = new Date(expense.date).getMonth();
    monthlyData[monthIndex].total += expense.amount;
  });

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🧁 Expense Breakdown by Category</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: "2rem" }}>📅 Monthly Expense Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseCharts;
